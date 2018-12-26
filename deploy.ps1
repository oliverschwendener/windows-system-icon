if($env:appveyor_repo_tag -eq 'True') {
   $npm_token = $env:NPM_TOKEN;
    "//registry.npmjs.org/:_authToken=$($npm_token)" | Out-File .npmrc;
    npm publish .
    Remove-Item .npmrc;
}