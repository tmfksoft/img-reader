/// <reference types="node" />
import DirectoryEntry from './interfaces/DirectoryEntry';
declare class IMGReader {
    private filename;
    private files;
    constructor(filename: string);
    read(): Promise<void>;
    readFile(filename: string): Buffer;
    getFileList(): string[];
    getEntries(): DirectoryEntry[];
}
export default IMGReader;
