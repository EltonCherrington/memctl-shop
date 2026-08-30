param(
  [string]$Token = '9c4f1a2b0e8d34c5a6b7f8e90123d45e67890abc'
)
$ErrorActionPreference = 'Stop'
$root = Split-Path -Parent $MyInvocation.MyCommand.Path
# storefront source of truth = _site/; mirrors: site/ (githack, human-visible) + docs/ (GitHub Pages, indexable)
$pageSrc = Join-Path $root '_site'
Copy-Item (Join-Path $pageSrc '*.html') (Join-Path $root 'site') -Force
New-Item -ItemType Directory -Force -Path (Join-Path $root 'docs') | Out-Null
Copy-Item (Join-Path $pageSrc '*.html') (Join-Path $root 'docs') -Force
$src = Join-Path $root 'templates'
$dstDir = Join-Path $root "_site\d\$Token"
New-Item -ItemType Directory -Force -Path $dstDir | Out-Null
$zip = Join-Path $dstDir 'memctl-memory-pack-v1.zip'
if (Test-Path $zip) { Remove-Item $zip -Force }
Compress-Archive -Path (Join-Path $src '*') -DestinationPath $zip
Write-Host "pack -> $zip ($([Math]::Round((Get-Item $zip).Length/1KB)) KB)"