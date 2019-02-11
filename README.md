
# windows-system-icon

Extract the associated file icons with Node.js using Powershell on Windows.

[![Build status](https://ci.appveyor.com/api/projects/status/y6sm905f0gu36trq?svg=true)](https://ci.appveyor.com/project/oliverschwendener/windows-system-icon)

## Requirements

* Powershell

## Usage

### NPM

```
npm install windows-system-icon
```

### TypeScript

``` typescript
import { generateIcons, Icon } from "../dist/index";

const icons: Icon[] = [
    {
        inputFilePath: "C:\\ProgramData\\Microsoft\\Windows\\Start Menu\\Programs\\Google Chrome.lnk",
        outputFilePath: "C:\\Users\\Oliver\\Desktop\\Google Chrome Icon.png",
        outputFormat: "Png",
    },
];

const followShortcuts = false; // this parameter is optional

generateIcons(icons, followShortcuts)
    .then(() => console.log("Done!"))
    .catch((err) => console.log(err));
```

### JavaScript
``` javascript
import { generateIcons } from "../dist/index";

const icons = [
    {
        inputFilePath: "C:\\ProgramData\\Microsoft\\Windows\\Start Menu\\Programs\\Google Chrome.lnk",
        outputFilePath: "C:\\Users\\Oliver\\Desktop\\Google Chrome Icon.png",
        outputFormat: "Png",
    },
];

const followShortcuts = false; // this parameter is optional

generateIcons(icons, followShortcuts)
    .then(() => console.log("Done!"))
    .catch((err) => console.log(err));
```

### Supported output formats

* `Gif`
* `Icon`
* `Jpeg`
* `Png`
* `Tiff`

> Make sure to capitalize the output formats

## How it works

`windows-system-icon` uses Powershell in the background to extract the associated file icons.

Here is the powershell script that gets executed in the background: 

``` powershell
Add-Type -AssemblyName System.Drawing

$fileExists = Test-Path -Path "<input-file-path>";

if ($fileExists) {
    if ($filePath.EndsWith(".lnk")) {
        Try {
            $sh = New-Object -ComObject WScript.Shell;
            $filePath = $sh.CreateShortcut($filePath).TargetPath;
        }
        Catch {
            <# do nothing #>
        }
    }
    $icon = [System.Drawing.Icon]::ExtractAssociatedIcon("<input-file-path>");
    $bitmap = $icon.ToBitmap().save("<output-file-path>", [System.Drawing.Imaging.ImageFormat]::<output-format>); 
}
```