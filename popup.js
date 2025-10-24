// Popup script for TTD Booking Auto-Fill Extension

const PILGRIM_COUNT = 6;

// Initialize popup
document.addEventListener('DOMContentLoaded', () => {
    initializePilgrimForms();
    loadSavedData();
    attachEventListeners();
});

// Create 6 pilgrim forms
function initializePilgrimForms() {
    const container = document.querySelector('.pilgrims-container');
    
    for (let i = 0; i < PILGRIM_COUNT; i++) {
        const pilgrimCard = createPilgrimCard(i);
        container.appendChild(pilgrimCard);
    }
}

// Create individual pilgrim card
function createPilgrimCard(index) {
    const card = document.createElement('div');
    card.className = 'pilgrim-card';
    card.innerHTML = `
        <div class="pilgrim-header">
            <span class="pilgrim-title">👤 Pilgrim ${index + 1}</span>
            <button class="clear-btn" data-pilgrim="${index}">Clear</button>
        </div>
        
        <div class="form-row">
            <div class="form-group">
                <label for="name_${index}">Name *</label>
                <input type="text" id="name_${index}" placeholder="Enter name" maxlength="80">
            </div>
            <div class="form-group">
                <label for="age_${index}">Age *</label>
                <input type="number" id="age_${index}" placeholder="Age" min="1" max="120">
            </div>
        </div>
        
        <div class="form-row">
            <div class="form-group">
                <label for="gender_${index}">Gender *</label>
                <select id="gender_${index}">
                    <option value="">Select Gender</option>
                    <option value="Male">Male</option>
                    <option value="Female">Female</option>
                    <option value="Transgender">Transgender</option>
                </select>
            </div>
            <div class="form-group">
                <label for="idType_${index}">Photo ID Proof *</label>
                <select id="idType_${index}">
                    <option value="">Select ID Type</option>
                    <option value="Aadhaar Card">Aadhaar Card</option>
                    <option value="Passport">Passport</option>
                </select>
            </div>
        </div>
        
        <div class="form-row full">
            <div class="form-group">
                <label for="idNumber_${index}">Photo ID Number *</label>
                <input type="text" id="idNumber_${index}" placeholder="Enter ID number" maxlength="12">
            </div>
        </div>
    `;
    return card;
}

// Attach event listeners
function attachEventListeners() {
    // Save button
    document.getElementById('saveBtn').addEventListener('click', saveData);
    
    // Auto-fill button
    document.getElementById('autoFillBtn').addEventListener('click', triggerAutoFill);
    
    // Clear buttons
    document.querySelectorAll('.clear-btn').forEach(btn => {
        btn.addEventListener('click', (e) => {
            const index = parseInt(e.target.dataset.pilgrim);
            clearPilgrim(index);
        });
    });
}

// Save data to Chrome storage
async function saveData() {
    const pilgrims = [];
    
    for (let i = 0; i < PILGRIM_COUNT; i++) {
        const pilgrim = {
            name: document.getElementById(`name_${i}`).value.trim(),
            age: document.getElementById(`age_${i}`).value.trim(),
            gender: document.getElementById(`gender_${i}`).value,
            idType: document.getElementById(`idType_${i}`).value,
            idNumber: document.getElementById(`idNumber_${i}`).value.trim()
        };
        
        // Only save if at least name is filled
        if (pilgrim.name) {
            pilgrims.push(pilgrim);
        } else {
            pilgrims.push(null); // Maintain index
        }
    }
    
    try {
        await chrome.storage.local.set({ pilgrims: pilgrims });
        showStatus('✅ Details saved successfully!', 'success');
    } catch (error) {
        showStatus('❌ Error saving data: ' + error.message, 'error');
    }
}

// Load saved data
async function loadSavedData() {
    try {
        const result = await chrome.storage.local.get('pilgrims');
        const pilgrims = result.pilgrims || [];
        
        for (let i = 0; i < PILGRIM_COUNT; i++) {
            if (pilgrims[i]) {
                document.getElementById(`name_${i}`).value = pilgrims[i].name || '';
                document.getElementById(`age_${i}`).value = pilgrims[i].age || '';
                document.getElementById(`gender_${i}`).value = pilgrims[i].gender || '';
                document.getElementById(`idType_${i}`).value = pilgrims[i].idType || '';
                document.getElementById(`idNumber_${i}`).value = pilgrims[i].idNumber || '';
            }
        }
    } catch (error) {
        showStatus('⚠️ Error loading data: ' + error.message, 'error');
    }
}

// Clear a specific pilgrim's data
function clearPilgrim(index) {
    document.getElementById(`name_${index}`).value = '';
    document.getElementById(`age_${index}`).value = '';
    document.getElementById(`gender_${index}`).value = '';
    document.getElementById(`idType_${index}`).value = '';
    document.getElementById(`idNumber_${index}`).value = '';
    showStatus(`🗑️ Pilgrim ${index + 1} cleared`, 'info');
}

// Trigger auto-fill on active tab
async function triggerAutoFill() {
    try {
        // Get saved data
        const result = await chrome.storage.local.get('pilgrims');
        const pilgrims = result.pilgrims || [];
        
        // Check if any data exists
        const hasData = pilgrims.some(p => p && p.name);
        if (!hasData) {
            showStatus('⚠️ No pilgrim data saved. Please save details first.', 'error');
            return;
        }
        
        // Get active tab
        const [tab] = await chrome.tabs.query({ active: true, currentWindow: true });
        
        // Check if on correct page
        if (!tab.url.includes('ttdevasthanams.ap.gov.in/spat/pilgrim-details')) {
            showStatus('⚠️ Please navigate to the booking page first!', 'error');
            return;
        }
        
        showStatus('⚡ Filling form...', 'info');
        
        // Send message to content script
        const response = await chrome.tabs.sendMessage(tab.id, {
            action: 'autoFill',
            pilgrims: pilgrims
        });
        
        if (response && response.success) {
            showStatus(`✅ Filled ${response.count} pilgrim(s) successfully!`, 'success');
        } else {
            showStatus('⚠️ ' + (response?.error || 'Could not fill form'), 'error');
        }
        
    } catch (error) {
        showStatus('❌ Error: ' + error.message, 'error');
        console.error('Auto-fill error:', error);
    }
}

// Show status message
function showStatus(message, type = '') {
    const statusDiv = document.getElementById('statusMessage');
    statusDiv.textContent = message;
    statusDiv.className = `status ${type}`;
    
    // Clear after 5 seconds (longer for better visibility)
    setTimeout(() => {
        statusDiv.textContent = '';
        statusDiv.className = 'status';
    }, 5000);
}

