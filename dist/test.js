var { generateIcons } = require("./index");

var icons = [
    {
        inputFilePath: "C:\\ProgramData\\Microsoft\\Windows\\Start Menu\\Programs\\Adobe After Effects CC 2019.lnk",
        outputFilePath: "C:\\Users\\Oliver\\Desktop\\afx.png",
        outputFormat: "Png",
    },
    {
        inputFilePath: "C:\\ProgramData\\Microsoft\\Windows\\Start Menu\\Programs\\Adobe Photoshop CC 2019.lnk",
        outputFilePath: "C:\\Users\\Oliver\\Desktop\\ps.png",
        outputFormat: "Png",
    }
];

generateIcons(icons, true)
    .then(() => console.log("success"))
    .catch((err) => console.log(err));
    