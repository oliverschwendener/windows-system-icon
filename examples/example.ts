import { generateIcons, Icon } from "../index";

const icons: Icon[] = [
    {
        inputFilePath: "C:\\ProgramData\\Microsoft\\Windows\\Start Menu\\Programs\\Google Chrome.lnk",
        outputFilePath: "C:\\Users\\Oliver\\Desktop\\Google Chrome Icon.png",
        outputFormat: "Png",
    },
];

generateIcons(icons)
    .then(() => {
        // tslint:disable-next-line:no-console
        console.log("Done!");
    })
    .then((err) => {
        // tslint:disable-next-line:no-console
        console.log(err);
    });
