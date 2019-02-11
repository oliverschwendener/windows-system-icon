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
