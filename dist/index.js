"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const Powershell = require("node-powershell");
const validOutputFormats = [
    "Gif",
    "Icon",
    "Jpeg",
    "Png",
    "Tiff",
];
const getValidationOutput = (icons) => {
    if (icons === undefined || icons === null || icons.length === 0) {
        return {
            errorMessage: "No icons specified to be converted",
            isValid: false,
        };
    }
    for (const icon of icons) {
        if (!validOutputFormats.some((validOutputFormat) => validOutputFormat === icon.outputFormat)) {
            return {
                errorMessage: `${icon.outputFormat} is an invalid output format. Allowed file formats: ${validOutputFormats.join(",")}`,
                isValid: false,
            };
        }
    }
    return {
        errorMessage: "",
        isValid: true,
    };
};
exports.generateIcons = (icons, followShortcuts) => {
    return new Promise((resolve, reject) => {
        const validationOutput = getValidationOutput(icons);
        if (!validationOutput.isValid) {
            reject(validationOutput.errorMessage);
        }
        else {
            const ps = new Powershell({
                debugMsg: false,
                executionPolicy: "Bypass",
                noProfile: true,
            });
            ps.addCommand(`Add-Type -AssemblyName System.Drawing`);
            icons.forEach((icon) => {
                ps.addCommand(`$filePath = "${icon.inputFilePath}";`);
                ps.addCommand(`$fileExists = Test-Path -Path $filePath;`);
                if (followShortcuts) {
                    ps.addCommand(`$filePathIsShortcutFile = $filePath.EndsWith(".lnk");`);
                    ps.addCommand(`if ($fileExists -and $filePathIsShortcutFile) { Try { $sh = New-Object -ComObject WScript.Shell; $filePath = $sh.CreateShortcut($filePath).TargetPath; } Catch { <# do nothing #> } }`);
                }
                ps.addCommand(`if($fileExists) { $icon = [System.Drawing.Icon]::ExtractAssociatedIcon($filePath); }`);
                ps.addCommand(`if($fileExists) { $bitmap = $icon.ToBitmap().save("${icon.outputFilePath}", [System.Drawing.Imaging.ImageFormat]::${icon.outputFormat}); }`);
            });
            ps.invoke()
                .then(() => resolve())
                .catch((err) => reject(err))
                .then(() => ps.dispose());
        }
    });
};
