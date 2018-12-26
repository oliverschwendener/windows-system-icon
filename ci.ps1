if($env:appveyor_repo_tag -eq 'True') {
    Write-Host "Deploying to NPM";
    powershell ".\deploy.ps1";
} else {
    Write-Host "Skipping deployment to NPM";
}