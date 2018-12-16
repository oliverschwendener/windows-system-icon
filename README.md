# windows-system-icon

Extract the associated file icons with Node.js using Powershell on Windows.

## Requirements

* Powershell

## Usage

### NPM

```
npm install windows-system-icon
```

### TypeScript

``` typescript
import { generateIcons, Icon } from "windows-system-icon";

const icons: Icon[] = [
    {
        inputFilePath: "C:\\ProgramData\\Microsoft\\Windows\\Start Menu\\Programs\\Google Chrome.lnk",
        outputFilePath: "C:\\Users\\Oliver\\Desktop\\Google Chrome Icon.png",
        outputFormat: "Png",
    },
];

generateIcons(icons)
    .then(() => {
        console.log("Done!");
    })
    .then((err) => {
        console.log(err);
    });
```

### JavaScript
``` javascript
import { generateIcons } from "windows-system-icon";

const icons = [
    {
        inputFilePath: "C:\\ProgramData\\Microsoft\\Windows\\Start Menu\\Programs\\Google Chrome.lnk",
        outputFilePath: "C:\\Users\\Oliver\\Desktop\\Google Chrome Icon.png",
        outputFormat: "Png",
    },
];

generateIcons(icons)
    .then(() => {
        console.log("Done!")
    })
    .catch((err) => {
        console.log(err);
    });

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

if($fileExists) {
    $icon = [System.Drawing.Icon]::ExtractAssociatedIcon("<input-file-path>");
    $bitmap = $icon.ToBitmap().save("<output-file-path>", [System.Drawing.Imaging.ImageFormat]::<output-format>); 
}
```