# Quick PowerShell script to create placeholder icon files
Write-Host "Creating placeholder icons for TTD Booking Extension..." -ForegroundColor Cyan

try {
    Add-Type -AssemblyName System.Drawing
    
    # Create icon16.png
    $bitmap16 = New-Object System.Drawing.Bitmap(16, 16)
    $graphics16 = [System.Drawing.Graphics]::FromImage($bitmap16)
    $brush = New-Object System.Drawing.SolidBrush([System.Drawing.Color]::FromArgb(255, 255, 107, 53))
    $graphics16.FillRectangle($brush, 0, 0, 16, 16)
    $bitmap16.Save("icon16.png", [System.Drawing.Imaging.ImageFormat]::Png)
    $graphics16.Dispose()
    $bitmap16.Dispose()
    Write-Host "  Created: icon16.png" -ForegroundColor Green
    
    # Create icon48.png
    $bitmap48 = New-Object System.Drawing.Bitmap(48, 48)
    $graphics48 = [System.Drawing.Graphics]::FromImage($bitmap48)
    $graphics48.FillRectangle($brush, 0, 0, 48, 48)
    $bitmap48.Save("icon48.png", [System.Drawing.Imaging.ImageFormat]::Png)
    $graphics48.Dispose()
    $bitmap48.Dispose()
    Write-Host "  Created: icon48.png" -ForegroundColor Green
    
    # Create icon128.png
    $bitmap128 = New-Object System.Drawing.Bitmap(128, 128)
    $graphics128 = [System.Drawing.Graphics]::FromImage($bitmap128)
    $graphics128.FillRectangle($brush, 0, 0, 128, 128)
    $bitmap128.Save("icon128.png", [System.Drawing.Imaging.ImageFormat]::Png)
    $graphics128.Dispose()
    $bitmap128.Dispose()
    Write-Host "  Created: icon128.png" -ForegroundColor Green
    
    $brush.Dispose()
    
    Write-Host ""
    Write-Host "All icons created successfully!" -ForegroundColor Green
}
catch {
    Write-Host "Error: $_" -ForegroundColor Red
    Write-Host "You can manually create PNG files or remove icons from manifest.json" -ForegroundColor Yellow
}
