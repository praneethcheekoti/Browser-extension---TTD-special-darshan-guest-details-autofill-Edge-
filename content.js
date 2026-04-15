// Content script for ULTRA-FAST auto-fill
// Target: < 500ms execution time

console.log('TTD Auto-Fill Extension: Content script loaded');

// Main auto-fill function - OPTIMIZED FOR SPEED
async function fillAllPilgrims(pilgrims) {
    const startTime = performance.now();
    console.log('TTD Auto-Fill: Starting auto-fill...');
    
    // Pre-filter valid pilgrims
    const validPilgrims = pilgrims
        .map((p, idx) => ({ ...p, originalIndex: idx }))
        .filter(p => p && p.name);
    
    if (validPilgrims.length === 0) {
        console.warn('No valid pilgrim data to fill');
        return { success: false, error: 'No valid pilgrim data', count: 0 };
    }
    
    try {
        // Fill all pilgrims in parallel for maximum speed
        const fillPromises = validPilgrims.map(pilgrim => 
            fillSinglePilgrim(pilgrim.originalIndex, pilgrim)
        );
        
        await Promise.all(fillPromises);
        
        const endTime = performance.now();
        const duration = (endTime - startTime).toFixed(2);
        console.log(`TTD Auto-Fill: Completed ${validPilgrims.length} pilgrim(s) in ${duration}ms`);
        
        return { success: true, count: validPilgrims.length, duration: duration };
    } catch (error) {
        console.error('TTD Auto-Fill: Error during fill', error);
        return { success: false, error: error.message, count: 0 };
    }
}

// Fill a single pilgrim's data
async function fillSinglePilgrim(index, pilgrim) {
    console.log(`Pilgrim ${index + 1}: Starting fill with data:`, pilgrim);
    
    // Check if fields exist for this index
    const nameInput = document.querySelector(`input[name="fname"][id="${index}"]`);
    if (!nameInput) {
        console.warn(`Pilgrim ${index + 1}: Name field not found on page, skipping`);
        return;
    }
    
    try {
        // Fill text inputs (fast - direct assignment)
        console.log(`Pilgrim ${index + 1}: Filling name...`);
        await fillTextField(index, 'fname', pilgrim.name);
        
        console.log(`Pilgrim ${index + 1}: Filling age...`);
        await fillTextField(index, 'age', pilgrim.age);
        
        // Fill custom dropdowns (requires interaction)
        if (pilgrim.gender) {
            console.log(`Pilgrim ${index + 1}: Filling gender dropdown...`);
            await fillCustomDropdown(index, 'gender', pilgrim.gender);
        }
        
        if (pilgrim.idType) {
            console.log(`Pilgrim ${index + 1}: Filling ID type dropdown...`);
            await fillCustomDropdown(index, 'photoIdType', pilgrim.idType);
            await sleep(20); // Extra wait for ID field to enable
        }
        
        // Fill ID number last (it may be disabled until ID type is selected)
        if (pilgrim.idNumber) {
            console.log(`Pilgrim ${index + 1}: Filling ID number...`);
            await fillTextField(index, 'idProofNumber', pilgrim.idNumber);
        }
        
        console.log(`Pilgrim ${index + 1}: ✓ Successfully filled all fields`);
    } catch (error) {
        console.error(`Pilgrim ${index + 1}: Error -`, error);
        throw error;
    }
}

// Fill text/number input field
async function fillTextField(index, fieldName, value) {
    if (!value) {
        console.warn(`No value provided for ${fieldName}[${index}]`);
        return;
    }
    
    const input = document.querySelector(`input[name="${fieldName}"][id="${index}"]`);
    if (!input) {
        console.error(`Field ${fieldName}[${index}] not found in DOM`);
        return;
    }
    
    console.log(`Setting ${fieldName}[${index}] = "${value}"`);
    
    // Remove disabled attribute if present
    if (input.disabled) {
        input.removeAttribute('disabled');
        console.log(`Removed disabled attribute from ${fieldName}[${index}]`);
    }
    
    // Clear existing value first
    input.value = '';
    
    // Set value directly
    input.value = value;
    
    // Trigger events for validation and React/framework updates
    input.dispatchEvent(new Event('input', { bubbles: true, cancelable: true }));
    input.dispatchEvent(new Event('change', { bubbles: true, cancelable: true }));
    input.dispatchEvent(new Event('blur', { bubbles: true, cancelable: true }));
    
    // Verify value was set
    if (input.value !== value) {
        console.warn(`Value verification failed for ${fieldName}[${index}]. Expected: "${value}", Got: "${input.value}"`);
    } else {
        console.log(`✓ ${fieldName}[${index}] filled successfully`);
    }
}

// Fill custom dropdown (readonly input with li-based menu)
async function fillCustomDropdown(index, fieldName, value) {
    if (!value) {
        console.warn(`No value provided for dropdown ${fieldName}[${index}]`);
        return;
    }
    
    const input = document.querySelector(`input[name="${fieldName}"][id="${index}"]`);
    if (!input) {
        console.error(`Dropdown ${fieldName}[${index}] not found in DOM`);
        return;
    }
    
    console.log(`Opening dropdown ${fieldName}[${index}]...`);
    
    // Click to open dropdown
    input.click();
    input.focus();
    
    // Wait for dropdown to render
    await sleep(50);
    
    // Find and click the option
    // Look for <li> elements with the matching text
    const listItems = document.querySelectorAll('li.floatingDropdown_listItem__tU_5x');
    console.log(`Found ${listItems.length} dropdown items`);
    
    if (listItems.length === 0) {
        console.error(`No dropdown items found for ${fieldName}[${index}]`);
        return;
    }
    
    // Log all available options for debugging
    const availableOptions = Array.from(listItems).map(li => li.textContent.trim());
    console.log(`Available options:`, availableOptions);
    
    for (const item of listItems) {
        const itemText = item.textContent.trim();
        if (itemText === value) {
            console.log(`Clicking option "${value}" in ${fieldName}[${index}]`);
            item.click();
            await sleep(20); // Wait for selection to register
            
            // Verify selection
            if (input.value === value) {
                console.log(`✓ ${fieldName}[${index}] = "${value}" selected successfully`);
            } else {
                console.warn(`Selection may have failed. Input value is: "${input.value}"`);
            }
            return;
        }
    }
    
    console.error(`Option "${value}" not found in dropdown ${fieldName}[${index}]. Available: ${availableOptions.join(', ')}`);
}

// Minimal sleep helper
function sleep(ms) {
    return new Promise(resolve => setTimeout(resolve, ms));
}

// Listen for messages from popup
chrome.runtime.onMessage.addListener((request, sender, sendResponse) => {
    if (request.action === 'autoFill') {
        console.log('TTD Auto-Fill: Received auto-fill request');
        fillAllPilgrims(request.pilgrims)
            .then(result => {
                console.log('TTD Auto-Fill: Result', result);
                sendResponse(result);
            })
            .catch(error => {
                console.error('TTD Auto-Fill: Error', error);
                sendResponse({ success: false, error: error.message, count: 0 });
            });
        return true; // Keep message channel open for async response
    }
});

