import {
    access as accessOld,
    readFile as readFileOld,
    writeFile as writeFileOld,
} from 'fs';
import { join } from 'path';
import sjcl from 'sjcl';
import { promisify } from 'util';
import { IOptions, Node } from './00-Node';
import { GeneratedFile } from './04-File';

// TODO: In future use import { access, writeFile } from 'fs/promises';
const access = promisify(accessOld);
const writeFile = promisify(writeFileOld);
const readFile = promisify(readFileOld);

/**
 * ttl - TODO: seconds or miliseconds
 */
export interface ICachedFileOptions extends IOptions {
    cacheDir: string;
    ttl?: number;
}

/**
 * TODO: Some more elegant way how to not do a collision with object File
 * TODO: So not send cacheDir and ttl to server
 */
export class CachedFile<TFileOptions extends ICachedFileOptions> extends Node<
    TFileOptions,
    GeneratedFile<any>
> {
    public async getLocalPath(): Promise<string> {
        const fileName = this.fileName;
        try {
            await access(fileName);

            // const fileStat = await stat(fileName);
        } catch (error) {
            await writeFile(
                fileName,
                Buffer.from(await (await this.parent.getBlob()).arrayBuffer()),
            );
        }

        return fileName;
    }

    public async getBuffer(): Promise<Buffer> {
        return await readFile(await this.getLocalPath());
    }
    public async getBlob(): Promise<Blob> {
        throw new Error(`Not implemented yet.`);
    }
    public async getTitle(): Promise<string> {
        throw new Error(`Not implemented yet.`);
    }
    public async getFile(): Promise<File> {
        throw new Error(`Not implemented yet.`);
    }

    private get fileName(): string {
        // TODO: Maybe public
        const url = this.parent.getUrl();
        const hash = sjcl.codec.hex.fromBits(
            sjcl.hash.sha256.hash(url.toString()),
        );
        const filename = `${hash}.${this.optionsFlatDeep.type}`;
        return join(this.options.cacheDir, filename);
    }
}
