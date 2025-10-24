# 📦 Quick Installation Guide

## Step 1: Create Icon Files

### Method A: Run PowerShell Script (Automatic - Recommended)
1. Right-click on `create-icons.ps1`
2. Select **Run with PowerShell**
3. Wait for "All icons created successfully!" message

### Method B: Manual Creation (If script fails)
1. Open Paint
2. Create 16×16 image, fill with any color, Save as `icon16.png`
3. Create 48×48 image, fill with any color, Save as `icon48.png`  
4. Create 128×128 image, fill with any color, Save as `icon128.png`
5. Place all files in this folder

### Method C: Skip Icons (Testing Only)
Edit `manifest.json` and delete these lines:
```json
"icons": {
  "16": "icon16.png",
  "48": "icon48.png",
  "128": "icon128.png"
},
```

---

## Step 2: Load Extension in Edge

1. Open **Microsoft Edge**
2. Navigate to: `edge://extensions/`
3. Enable **Developer mode** (toggle bottom-left)
4. Click **Load unpacked**
5. Select this folder (`C:\Projects\TTD Booking`)
6. Click **Select Folder**

✅ Extension installed!

---

## Step 3: Pin Extension (Optional)

1. Click **Extensions** icon (puzzle piece) in toolbar
2. Find **TTD Booking Auto-Fill**
3. Click the **pin icon** 📌

---

## Step 4: Save Your Details

1. Click the **TTD Booking Auto-Fill** icon
2. Fill in pilgrim details (1-6 pilgrims)
3. Click **💾 Save Details**

---

## Step 5: Use Auto-Fill

1. Login to https://ttdevasthanams.ap.gov.in/
2. Navigate to pilgrim details page
3. Click extension icon
4. Click **⚡ Auto-Fill Form**
5. Complete booking! 🚀

---

## ⚠️ Troubleshooting

**Extension won't load?**
- Make sure icons exist OR remove icons section from manifest.json
- Check Developer mode is enabled
- Try restarting Edge

**Auto-fill not working?**
- Verify you're on the correct booking page
- Check you've saved pilgrim data
- Open Developer Console (F12) for error messages

**Need help?** Check `README.md` for detailed documentation.

---

**Ready to book? Let's go! ⚡**


