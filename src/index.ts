import fs from 'fs';
import DirectoryEntry from './interfaces/DirectoryEntry';

class IMGReader {
	private files: DirectoryEntry[] = [];

	constructor(private filename: string) {

	}

	async read() {
		if (!fs.existsSync(this.filename)) {
			throw new Error("Unable to find IMG file!");
		}
		const rawFile = fs.readFileSync(this.filename);

		const header = rawFile.slice(0, 8);
		if (header.slice(0,4).toString() !== "VER2") {
			throw new Error("Unsupported IMG file, IMG Reader only support Version 2!");
		}
		const entryCount = header.readUInt32LE(4);
		const entryEnd = 32 * entryCount;

		// Skip through the entries.
		for (let i=8; i<entryEnd; i+=32) {
			const entry = rawFile.slice(i, i + 32);

			const offset = entry.readUInt32LE();
			const streaming_size = entry.readUInt16LE(4);
			const stored_size = entry.readUInt16LE(6);
			let filename = "";

			// Hacky filename trim!
			for (let i=8; i<24; i++) {
				if (entry[i] === 0x00) {
					filename = entry.slice(8, i).toString();
					break;
				}
			}

			this.files.push({
				offset,
				streaming_size,
				stored_size,
				filename,
			});
		}
	}

	readFile(filename: string): Buffer {
		if (!fs.existsSync(this.filename)) {
			throw new Error("Unable to find IMG file!");
		}

		let entry;
		for (let fileEntry of this.files) {
			if (fileEntry.filename.toLowerCase() === filename.toLowerCase()) {
				entry = fileEntry;
			}
		}
		if (!entry) {
			throw new Error("No such file!");
		}

		const realOffset = entry.offset * 2048;
		const realSize = entry.streaming_size * 2048;
		
		const rawFile = fs.readFileSync(this.filename);
		const entryData = rawFile.slice(realOffset, realOffset + realSize);

		return entryData;
	}

	getFileList(): string[] {
		return this.files.map( f => f.filename);
	}
	getEntries(): DirectoryEntry[] {
		return this.files;
	}
}
export default IMGReader;