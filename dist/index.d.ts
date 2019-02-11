export interface Icon {
    inputFilePath: string;
    outputFilePath: string;
    outputFormat: string;
}
export declare const generateIcons: (icons: Icon[], followShortcuts?: boolean | undefined) => Promise<void>;
