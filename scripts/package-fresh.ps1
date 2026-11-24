$ErrorActionPreference = 'Stop'
Set-Location 'g:\Business Projects\sample\bmt-bharat'

Write-Host 'Updating fresh-deploy files from .next/standalone...'
Copy-Item -Path '.next\standalone\*' -Destination 'fresh-deploy' -Recurse -Force
Copy-Item -Path 'public\*' -Destination 'fresh-deploy\public' -Recurse -Force
New-Item -ItemType Directory -Path 'fresh-deploy\.next\static' -Force | Out-Null
Copy-Item -Path '.next\static\*' -Destination 'fresh-deploy\.next\static' -Recurse -Force

# Re-inject server.js .env loader
$serverJsPath = 'fresh-deploy\server.js'
$serverContent = Get-Content $serverJsPath -Raw

$loaderBlock = @"
// Automatically load .env in production standalone mode
try {
  const { loadEnvConfig } = require('@next/env')
  loadEnvConfig(dir)
} catch (e) {
  try {
    const fs = require('fs')
    const envFile = path.join(dir, '.env')
    if (fs.existsSync(envFile)) {
      fs.readFileSync(envFile, 'utf8').split('\n').forEach(line => {
        const match = line.match(/^\s*([\w.-]+)\s*=\s*(.*)?\s*$/)
        if (match) {
          let value = (match[2] || '').trim()
          if ((value.startsWith('"') && value.endsWith('"')) || (value.startsWith("'") && value.endsWith("'"))) {
            value = value.slice(1, -1)
          }
          if (!process.env[match[1]]) process.env[match[1]] = value
        }
      })
    }
  } catch (err) {}
}
console.log('Next standalone starting. DATABASE_URL configured:', Boolean(process.env.DATABASE_URL))
"@

if ($serverContent -notmatch 'loadEnvConfig') {
    $serverContent = $serverContent.Replace("process.chdir(__dirname)", "process.chdir(__dirname)`n$loaderBlock")
    Set-Content -Path $serverJsPath -Value $serverContent
}

# Ensure .env has database URL
$envContent = @"
# cPanel PostgreSQL (127.0.0.1:5432)
DATABASE_URL="postgresql://bmtbhara_bmtpg:9PhPy*4M%3FpnaCLpB@127.0.0.1:5432/bmtbhara_bmt?schema=public"

NODE_ENV="production"
PORT=3000
NEXTAUTH_URL="https://bmtbharat.com"
NEXT_PUBLIC_BASE_URL="https://bmtbharat.com"
NEXTAUTH_SECRET="f39e8a71d62c4b5a8e0f1d2c3b4a5e6f7a8b9c0d1e2f3a4b5c6d7e8f9a0b1c2d"
"@
Set-Content -Path 'fresh-deploy\.env' -Value $envContent
Set-Content -Path 'fresh-deploy\.env.example' -Value $envContent

# Copy real hashed modules to fresh-deploy/.next/node_modules and fresh-deploy/node_modules
New-Item -ItemType Directory -Path 'fresh-deploy\.next\node_modules\@prisma' -Force | Out-Null
Copy-Item -Path 'node_modules\@prisma\client' -Destination 'fresh-deploy\.next\node_modules\@prisma\client-2c3a283f134fdcb6' -Recurse -Force
Copy-Item -Path 'node_modules\pg' -Destination 'fresh-deploy\.next\node_modules\pg-587764f78a6c7a9c' -Recurse -Force
Copy-Item -Path 'node_modules\sharp' -Destination 'fresh-deploy\.next\node_modules\sharp-20c6a5da84e2135f' -Recurse -Force

New-Item -ItemType Directory -Path 'fresh-deploy\node_modules\@prisma' -Force | Out-Null
Copy-Item -Path 'node_modules\@prisma\client' -Destination 'fresh-deploy\node_modules\@prisma\client-2c3a283f134fdcb6' -Recurse -Force
Copy-Item -Path 'node_modules\pg' -Destination 'fresh-deploy\node_modules\pg-587764f78a6c7a9c' -Recurse -Force
Copy-Item -Path 'node_modules\sharp' -Destination 'fresh-deploy\node_modules\sharp-20c6a5da84e2135f' -Recurse -Force

# Linux engines
New-Item -ItemType Directory -Path 'fresh-deploy\node_modules\.prisma\client' -Force | Out-Null
Copy-Item -Path 'node_modules\.prisma\client\*' -Destination 'fresh-deploy\node_modules\.prisma\client' -Recurse -Force

Write-Host 'Creating bmt-app-fresh.zip...'
Set-Location 'g:\Business Projects\sample\bmt-bharat\fresh-deploy'
if (Test-Path '..\bmt-app-fresh.zip') { Remove-Item '..\bmt-app-fresh.zip' -Force }
tar.exe -a -cf '..\bmt-app-fresh.zip' .

Write-Host 'Creating bmt-static-assets.zip...'
Set-Location 'g:\Business Projects\sample\bmt-bharat\.next'
if (Test-Path '..\bmt-static-assets.zip') { Remove-Item '..\bmt-static-assets.zip' -Force }
tar.exe -a -cf '..\bmt-static-assets.zip' static

Write-Host 'Packaging completed successfully!'
