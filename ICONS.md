# 🎨 Extension Icons Setup

The extension needs 3 icon files. Here are several ways to get them:

## Option 1: Quick Temporary Icons (Fastest)

Create solid color PNG files temporarily:

1. Open Paint (Windows)
2. Create a new image
3. Set canvas size to 16×16, 48×48, or 128×128
4. Fill with any color
5. Save as `icon16.png`, `icon48.png`, `icon128.png`
6. Place in extension root folder

## Option 2: Use Emoji (Recommended)

Use online emoji-to-PNG converters:

1. Go to: https://emoji.gg/ or https://emojipedia.org/
2. Search for: 🕉️ (Om symbol) or 🛕 (Hindu temple)
3. Download the emoji image
4. Resize to 16×16, 48×48, 128×128 using:
   - Paint
   - GIMP (free)
   - Online tool: https://www.iloveimg.com/resize-image
5. Save as PNG files

## Option 3: Use Icon Generator

Use free icon generators:

1. Go to: https://www.favicon-generator.org/
2. Upload any temple/religious image
3. Generate icons
4. Download and rename to match required sizes

## Option 4: Use These SVG Templates

Create these SVG files and convert to PNG:

### Temple Icon SVG
```xml
<svg width="128" height="128" xmlns="http://www.w3.org/2000/svg">
  <rect width="128" height="128" fill="#FF6B35"/>
  <text x="50%" y="50%" text-anchor="middle" dy=".3em" font-size="80">🕉️</text>
</svg>
```

Save as `icon.svg`, then convert to PNG using:
- Online: https://cloudconvert.com/svg-to-png
- Or use browser: Open SVG → Screenshot → Crop

## Quick Fix: Remove Icons Temporarily

If you just want to test, edit `manifest.json` and **remove the icons section**:

Remove these lines:
```json
"icons": {
  "16": "icon16.png",
  "48": "icon48.png",
  "128": "icon128.png"
}
```

The extension will still work, just without a custom icon.

## Recommended Icons

**Suggested emojis/symbols:**
- 🕉️ Om symbol (most appropriate)
- 🛕 Hindu temple
- 🙏 Praying hands
- ⚡ Lightning bolt (represents speed)
- 🎯 Target (represents fast booking)

## File Requirements

- **Format**: PNG
- **Sizes**: Exactly 16×16, 48×48, 128×128 pixels
- **Names**: `icon16.png`, `icon48.png`, `icon128.png`
- **Location**: Same folder as `manifest.json`
- **Background**: Transparent or solid color

---

**Quick Start**: Just use solid color squares from Paint to get started immediately!



