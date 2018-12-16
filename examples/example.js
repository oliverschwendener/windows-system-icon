import { generateIcons } from "../index";

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
