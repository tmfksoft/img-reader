/// <reference types="node" />
import DirectoryEntry from './format/DirectoryEntry';
declare class IMGReader {
    protected data: Buffer;
    private sectorSize;
    private imgData;
    entries: DirectoryEntry[];
    constructor(data: Buffer);
    private processData;
    /**
     * Reads a file from the IMG Archive and returns it as a buffer, or null if it doesn't exist.
     * @param name File name to read. e.g. "bridge_1.dff"
     * @returns
     */
    readFile(name: string): Buffer | null;
}
export default IMGReader;
