const windowsSystemIcon = require("../dist/index");
const path = require("path");
const fs = require("fs");

const testDataFolder = path.join(__dirname, "data");
const testFiles = [
    "test.png",
    "test.txt",
    "test.jpg",
    "test.lnk",
    "test.exe"
];

describe("Windows system icon generation", () => {
    before(() => {
        if (!fs.existsSync(testDataFolder)) {
            fs.mkdirSync(testDataFolder);
        }
    });

    beforeEach(() => {
        testFiles.forEach((testFile) => {
            const filePath = path.join(testDataFolder, testFile);
            fs.writeFileSync(filePath, "dummy-data", "utf-8");
        });
    });

    afterEach(() => {
        const files = fs.readdirSync(path.join(testDataFolder));
        const filesToDelete = files.filter((file) => {
            return file.endsWith(".out");
        });

        filesToDelete.forEach((fileToDelete) => {
            fs.unlinkSync(path.join(testDataFolder, fileToDelete));
        });
    });

    after(() => {
        testFiles.forEach((testFile) => {
            const filePath = path.join(testDataFolder, testFile);
            fs.unlinkSync(filePath);
        });

        if (fs.existsSync(testDataFolder)) {
            fs.rmdirSync(testDataFolder);
        }
    });

    it("should generate multiple icons successfully", (done) => {
        const icons = testFiles.map((testFile) => {
            return {
                inputFilePath: path.join(testDataFolder, testFile),
                outputFilePath: path.join(testDataFolder, `${testFile}.out`),
                outputFormat: "Png",
            };
        });

        windowsSystemIcon.generateIcons(icons)
            .then(() => {
                const outFiles = fs
                    .readdirSync(path.join(testDataFolder))
                    .filter((file) => {
                        return file.endsWith(".out");
                    });

                if (outFiles.length !== icons.length) {
                    done("Generated icons length does not match input icons length")
                } else {
                    done();
                }
            })
            .catch((err) => {
                done(err);
            })
    });

    it("should fail when passing in undefined, null or empty array", (done) => {
        const invalidArguments = [
            undefined,
            null,
            []
        ];

        const promises = invalidArguments.map((invalidArgument) => {
            return windowsSystemIcon.generateIcons(invalidArgument);
        });

        Promise.all(promises)
            .then(() => {
                done(`Generating icons should fail when passing in an invalid argument`);
            })
            .catch((err) => {
                done();
            });
    });

    it("should fail when passing in an invalid output format", (done) => {
        const icons = testFiles.map((testFile) => {
            return {
                inputFilePath: path.join(testDataFolder, testFile),
                outputFilePath: path.join(testDataFolder, `${testDataFolder}.out`),
                outputFormat: "JPG"
            }
        });

        windowsSystemIcon.generateIcons(icons)
            .then(() => {
                done(`Generating icons should fail when passing in an invalid output format`)
            })
            .catch((err) => {
                done();
            })
    });
});
