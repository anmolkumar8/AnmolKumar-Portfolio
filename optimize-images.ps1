# Image Optimization Script
# This script helps optimize images for web performance

Write-Host "Image Optimization for Portfolio Website" -ForegroundColor Green
Write-Host "========================================"

# Check if original image exists
if (Test-Path "picture.PNG") {
    $originalSize = (Get-Item "picture.PNG").Length
    Write-Host "Original image size: $([math]::Round($originalSize / 1MB, 2)) MB" -ForegroundColor Red
    
    if ($originalSize -gt 500KB) {
        Write-Host "⚠️  WARNING: Image is very large for web use!" -ForegroundColor Yellow
        Write-Host "Recommended max size for web: 500KB or less" -ForegroundColor Yellow
        Write-Host ""
        Write-Host "Solutions:" -ForegroundColor Cyan
        Write-Host "1. Use online tools like TinyPNG.com or Squoosh.app" -ForegroundColor White
        Write-Host "2. Resize image to 400x400 pixels max" -ForegroundColor White
        Write-Host "3. Convert to WebP format for better compression" -ForegroundColor White
        Write-Host "4. Reduce quality to 80-90% if possible" -ForegroundColor White
    }
} else {
    Write-Host "❌ picture.PNG not found!" -ForegroundColor Red
}

# Check minified files
Write-Host "`nOptimized files status:" -ForegroundColor Green

if (Test-Path "style.min.css") {
    $minCssSize = (Get-Item "style.min.css").Length
    $origCssSize = (Get-Item "style.css").Length
    $cssSavings = [math]::Round((($origCssSize - $minCssSize) / $origCssSize) * 100, 1)
    Write-Host "✅ CSS minified: $([math]::Round($minCssSize / 1KB, 1))KB (saved $cssSavings%)" -ForegroundColor Green
}

if (Test-Path "script.min.js") {
    $minJsSize = (Get-Item "script.min.js").Length
    $origJsSize = (Get-Item "script.js").Length
    $jsSavings = [math]::Round((($origJsSize - $minJsSize) / $origJsSize) * 100, 1)
    Write-Host "✅ JS minified: $([math]::Round($minJsSize / 1KB, 1))KB (saved $jsSavings%)" -ForegroundColor Green
}

Write-Host "`nNext steps for image optimization:" -ForegroundColor Yellow
Write-Host "1. Go to https://squoosh.app/" -ForegroundColor White
Write-Host "2. Upload your picture.PNG" -ForegroundColor White
Write-Host "3. Choose WebP format and adjust quality to 80%" -ForegroundColor White
Write-Host "4. Download and replace the original image" -ForegroundColor White
Write-Host "5. Update HTML to use the new optimized image" -ForegroundColor White

Write-Host "`nPerformance improvements applied:" -ForegroundColor Cyan
Write-Host "• Minified CSS and JavaScript files" -ForegroundColor Green
Write-Host "• Added image preloading" -ForegroundColor Green
Write-Host "• Optimized Font Awesome loading" -ForegroundColor Green
Write-Host "• Added lazy loading for images" -ForegroundColor Green
Write-Host "• Implemented efficient scroll handlers" -ForegroundColor Green
