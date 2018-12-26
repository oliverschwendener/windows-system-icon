if($env:appveyor_repo_tag -eq 'True') {
    Write-Host "Deploying to NPM";
    $npm_token = $env:NPM_TOKEN;
    "//registry.npmjs.org/:_authToken=$($npm_token)" | Out-File .npmrc;
    npm publish .;
    Remove-Item .npmrc;
} else {
    Write-Host "Skipping deployment to NPM";
}