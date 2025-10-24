# 🔍 Debugging Guide - Auto-Fill Not Working

## ✅ I've Fixed the Message Passing Issue!

The extension now has:
- ✅ Fixed communication between popup and content script
- ✅ Extensive console logging for debugging
- ✅ Better error reporting
- ✅ Field verification after filling

---

## 🔄 Update the Extension

### Step 1: Reload the Extension

1. Go to `edge://extensions/`
2. Find **TTD Booking Auto-Fill**
3. Click the **🔄 Reload** button (or toggle off/on)
4. Ensure it shows "No errors"

### Step 2: Refresh the Booking Page

1. Go to the TTD booking page
2. Press `Ctrl + Shift + R` (hard refresh)
3. This ensures the updated content script is loaded

---

## 🐛 Check Console Logs for Debugging

### How to Open Developer Console:

1. On the **booking page**, press `F12` (or `Ctrl + Shift + I`)
2. Click the **Console** tab
3. Keep this open while testing

### What to Look For:

#### ✅ Good Signs (Extension Working):
```
TTD Auto-Fill Extension: Content script loaded
TTD Auto-Fill: Received auto-fill request
TTD Auto-Fill: Starting auto-fill...
Pilgrim 1: Starting fill with data: {name: "...", age: "..."}
Pilgrim 1: Filling name...
Setting fname[0] = "..."
✓ fname[0] filled successfully
Pilgrim 1: Filling age...
✓ age[0] filled successfully
...
TTD Auto-Fill: Completed 6 pilgrim(s) in XXms
```

#### ❌ Problem Signs:
```
Field fname[0] not found in DOM           → Fields don't exist yet
Dropdown gender[0] not found              → Page structure changed
Option "Male" not found in dropdown       → Dropdown not opening
No dropdown items found                   → Dropdown timing issue
```

---

## 🔧 Common Issues & Solutions

### Issue 1: "Content script loaded" doesn't appear
**Problem**: Extension not injected into page  
**Solution**:
- Reload extension at `edge://extensions/`
- Hard refresh booking page (`Ctrl + Shift + R`)
- Check if URL matches: `ttdevasthanams.ap.gov.in/spat/pilgrim-details`

### Issue 2: "Field not found in DOM"
**Problem**: Form not loaded yet or page structure changed  
**Solution**:
- Wait for page to fully load before clicking Auto-Fill
- Scroll down to ensure form is rendered
- Check if page HTML structure changed (inspect elements)

### Issue 3: "No dropdown items found"
**Problem**: Dropdown not opening or wrong timing  
**Solution**:
- Try manually clicking a dropdown first to test
- Check if dropdown class name changed (should be `floatingDropdown_listItem__tU_5x`)
- Inspect dropdown `<li>` elements to verify class name

### Issue 4: Fields fill but immediately clear
**Problem**: Framework/React resetting values  
**Solution**: This is handled by triggering `input`, `change`, and `blur` events

### Issue 5: Extension says "Could not fill form"
**Problem**: Error during filling  
**Solution**:
- Check console for specific error message
- Share the error with developer

---

## 🧪 Manual Testing Steps

### Test 1: Verify Extension is Loaded
1. Open booking page
2. Press `F12` → Console tab
3. Type: `console.log('test')`
4. Look for: `TTD Auto-Fill Extension: Content script loaded`
5. ✅ If you see it, extension is loaded
6. ❌ If not, reload extension and refresh page

### Test 2: Verify Fields Exist
1. On booking page, press `F12` → Console
2. Paste this code:
```javascript
console.log('Name field:', document.querySelector('input[name="fname"][id="0"]'));
console.log('Age field:', document.querySelector('input[name="age"][id="0"]'));
console.log('Gender field:', document.querySelector('input[name="gender"][id="0"]'));
```
3. ✅ Should show the HTML elements
4. ❌ If `null`, fields don't exist or page changed

### Test 3: Test Dropdown Click
1. Manually click a dropdown (Gender or Photo ID Proof)
2. Does the menu appear?
3. Press `F12` → Elements tab
4. Find the `<li>` elements
5. Check their class name (should be `floatingDropdown_listItem__tU_5x`)
6. If class is different, we need to update content.js

### Test 4: Test Auto-Fill with Console Open
1. Open Console (`F12`)
2. Click extension icon → Auto-Fill Form
3. Watch console logs in real-time
4. Look for errors or warnings
5. Share screenshot if issues persist

---

## 📊 What the Logs Tell You

| Log Message | Meaning | Action |
|-------------|---------|--------|
| `Content script loaded` | ✅ Extension injected | Good to go |
| `Received auto-fill request` | ✅ Message received | Communication working |
| `Starting fill with data` | ✅ Processing pilgrim | Filling started |
| `✓ fname[0] filled successfully` | ✅ Field filled | Working! |
| `Field not found in DOM` | ❌ Field missing | Wait for page load |
| `No dropdown items found` | ❌ Dropdown issue | Check timing/class name |
| `Option "..." not found` | ❌ Value mismatch | Check saved values |

---

## 🆘 Still Not Working?

### Share Debug Information:

1. Open Console on booking page
2. Click Auto-Fill
3. **Take screenshot of Console tab**
4. Share the screenshot

Also helpful:
- Right-click on Name field → Inspect
- **Share screenshot of HTML inspector** showing the field's attributes
- Check if any attributes changed from what we documented

---

## 🎯 Quick Checklist

Before seeking help, verify:
- [ ] Extension reloaded at `edge://extensions/`
- [ ] Booking page hard refreshed (`Ctrl + Shift + R`)
- [ ] On correct URL: `ttdevasthanams.ap.gov.in/spat/pilgrim-details`
- [ ] Console shows "Content script loaded"
- [ ] Pilgrim data is saved (check in extension popup)
- [ ] Page is fully loaded before clicking Auto-Fill
- [ ] Console shows detailed logs when Auto-Fill clicked

---

**The updated extension now has much better debugging. Check the console logs and let me know what you see!** 🔍


