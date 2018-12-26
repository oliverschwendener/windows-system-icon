$npm_rc = "$($env:HOMEPATH)\.npmrc";
"registry=""//registry.npmjs.org/:_authToken=$($env:NPM_TOKEN)""" | Out-File $npm_rc;
npm publish .;
Remove-Item $npm_rc;