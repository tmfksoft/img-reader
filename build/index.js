"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const PointerBuffer_1 = __importDefault(require("./PointerBuffer"));
class IMGReader {
    constructor(data) {
        this.data = data;
        this.sectorSize = 2048;
        this.entries = [];
        this.imgData = new PointerBuffer_1.default(this.data);
        this.processData();
    }
    processData() {
        console.log(`Read ${this.imgData.size} bytes`);
        // Assuming it's a GTA:SA IMG
        const magicWord = this.imgData.readString(4);
        if (magicWord !== "VER2") {
            throw new Error("This isn't a GTA:SA IMG Archive!");
        }
        const entryCount = this.imgData.readUint32();
        console.log(`Archive contains ${entryCount} directory entries.`);
        for (let i = 0; i < entryCount; i++) {
            const offset = this.imgData.readUint32();
            const streamingSize = this.imgData.readUint16();
            const storedSize = this.imgData.readUint16();
            const fileName = this.imgData.readString(24); // Needs some tidying up.
            this.entries.push({
                offset,
                streamingSize,
                storedSize,
                fileName, // Needs some tidying up.
            });
        }
    }
    /**
     * Reads a file from the IMG Archive and returns it as a buffer, or null if it doesn't exist.
     * @param name File name to read. e.g. "bridge_1.dff"
     * @returns
     */
    readFile(name) {
        // Read the files
        for (let file of this.entries) {
            if (file.fileName.toLowerCase() === name.toLowerCase()) {
                const dataOffset = file.offset * this.sectorSize;
                const dataSize = file.streamingSize * this.sectorSize;
                const fileData = this.imgData.rawData.subarray(dataOffset, dataOffset + dataSize);
                return fileData;
            }
        }
        return null;
    }
}
exports.default = IMGReader;
//# sourceMappingURL=index.js.map