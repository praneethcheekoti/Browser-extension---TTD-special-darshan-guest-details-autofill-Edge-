# 🕉️ TTD Booking Auto-Fill Extension

**Lightning-fast browser extension for Tirumala Tirupati Devasthanams (TTD) temple booking automation.**

Get your bookings done in under 1 second! Pre-save pilgrim details and auto-fill the booking form with a single click.

---

## ✨ Features

- ⚡ **Ultra-Fast**: Fills all 6 pilgrims in < 500ms
- 💾 **Persistent Storage**: Save details once, use forever
- 🎯 **Smart Fill**: Automatically adapts to available fields
- 🔒 **Secure**: All data stored locally on your device
- 🎨 **Beautiful UI**: Modern, intuitive interface
- 🚀 **One-Click**: Single button to fill entire form

---

## 📋 Requirements

- **Browser**: Microsoft Edge (or any Chromium-based browser)
- **Website**: https://ttdevasthanams.ap.gov.in/spat/pilgrim-details

---

## 🚀 Installation

### Step 1: Download the Extension

1. Download or clone this repository to your computer
2. Extract the files to a folder (e.g., `C:\TTD-Extension`)

### Step 2: Enable Developer Mode in Edge

1. Open Microsoft Edge
2. Click the **menu (⋯)** → **Extensions**
3. Turn on **Developer mode** (toggle in bottom-left)

### Step 3: Load the Extension

1. Click **Load unpacked**
2. Navigate to the folder containing the extension files
3. Select the folder and click **Select Folder**
4. The extension will appear in your extensions list

### Step 4: Pin the Extension (Optional but Recommended)

1. Click the **Extensions icon** (puzzle piece) in toolbar
2. Find **TTD Booking Auto-Fill**
3. Click the **pin icon** to keep it visible

---

## 🎯 Usage

### 1️⃣ Save Pilgrim Details

1. Click the **TTD Booking Auto-Fill** icon in your toolbar
2. Fill in details for up to 6 pilgrims:
   - Name (Required)
   - Age (Required)
   - Gender (Required)
   - Photo ID Proof Type (Required)
   - Photo ID Number (Required)
3. Click **💾 Save Details**
4. You'll see a success message

**Note**: You can save fewer than 6 pilgrims - just fill what you need!

### 2️⃣ Auto-Fill the Booking Form

1. **Login** to the TTD booking website
2. **Navigate** to the pilgrim details page: https://ttdevasthanams.ap.gov.in/spat/pilgrim-details
3. Click the **TTD Booking Auto-Fill** extension icon
4. Click **⚡ Auto-Fill Form** button
5. **Boom!** All fields filled in < 1 second 🚀
6. Review the filled data and submit your booking

---

## 📝 Field Information

Each pilgrim requires 5 fields:

| Field | Type | Options |
|-------|------|---------|
| **Name** | Text | Max 80 characters |
| **Age** | Number | 1-120 |
| **Gender** | Dropdown | Male, Female, Transgender |
| **Photo ID Proof** | Dropdown | Aadhaar Card, Passport |
| **Photo ID Number** | Text | Max 12 characters |

---

## 🧠 Smart Fill Logic

The extension intelligently handles different scenarios:

- **Saved 6, Page has 3**: Fills first 3 pilgrims
- **Saved 3, Page has 6**: Fills first 3 pilgrims (leaves rest empty)
- **Saved 4, Page has 6**: Fills first 4 pilgrims
- **Empty slots**: Automatically skipped

---

## 🛠️ Troubleshooting

### Extension doesn't appear
- Ensure Developer Mode is enabled
- Try reloading the extension
- Check for any errors in Edge Extensions page

### Auto-Fill button doesn't work
- Make sure you're on the correct page: `ttdevasthanams.ap.gov.in/spat/pilgrim-details`
- Verify you've saved pilgrim data first
- Refresh the booking page and try again

### Fields not filling correctly
- Check if the website structure has changed
- Open Developer Console (F12) and check for error messages
- Try filling one pilgrim manually first to ensure form is active

### Dropdowns not selecting
- The extension uses a 10-15ms delay for dropdown interactions
- If network is slow, try refreshing and filling again
- Make sure you're using exact values: "Aadhaar Card" or "Passport"

---

## 🔒 Privacy & Security

- ✅ **All data stored locally** on your device
- ✅ **No external servers** - zero data transmission
- ✅ **No tracking** - completely private
- ✅ **Open source** - inspect the code yourself
- ✅ **No permissions abuse** - only accesses TTD website

---

## ⚙️ Technical Details

### Files Structure
```
TTD-Extension/
├── manifest.json          # Extension configuration
├── popup.html            # Extension UI
├── popup.css             # Styling
├── popup.js              # UI logic & data management
├── content.js            # Auto-fill engine (injected into page)
├── README.md             # This file
└── icons/                # Extension icons
    ├── icon16.png
    ├── icon48.png
    └── icon128.png
```

### Performance
- **Target fill time**: < 500ms
- **Parallel execution**: All 6 pilgrims filled simultaneously
- **Minimal delays**: Only 10-15ms for dropdown interactions
- **Direct DOM manipulation**: No unnecessary waits

### Browser Compatibility
- ✅ Microsoft Edge (Chromium)
- ✅ Google Chrome
- ✅ Brave
- ✅ Opera
- ⚠️ Firefox (requires manifest.json modifications)

---

## 🎨 Icons

The extension requires three icon sizes. Create or download icons and place them in the root directory:

- `icon16.png` - 16×16 pixels
- `icon48.png` - 48×48 pixels  
- `icon128.png` - 128×128 pixels

**Tip**: You can use any PNG images temporarily. Search for "temple icon png" or use emoji-to-image converters with the 🕉️ emoji.

---

## 📞 Support

If you encounter issues:

1. Check the **Troubleshooting** section above
2. Open browser Developer Tools (F12) and check Console for errors
3. Verify the website structure hasn't changed
4. Try reinstalling the extension

---

## ⚠️ Disclaimer

This extension is an **automation tool** designed to speed up form filling. 

- **Use responsibly** and in accordance with TTD website terms
- **Always review** auto-filled data before submission
- **No guarantee** of booking success (depends on availability)
- The developer is **not responsible** for any booking issues

---

## 📜 License

This project is provided as-is for personal use.

---

## 🙏 Credits

Built for pilgrims who need speed during competitive booking slots.

**May your bookings be successful! 🙏 OM NAMO VENKATESAYA 🕉️**

---

## 🔄 Version History

### v1.0.0 (Initial Release)
- ✅ Save up to 6 pilgrim details
- ✅ One-click auto-fill
- ✅ Custom dropdown handling
- ✅ Smart fill logic
- ✅ Ultra-fast performance (< 500ms)
- ✅ Beautiful modern UI
- ✅ Local storage persistence

---

**Made with ⚡ for fast bookings!**



