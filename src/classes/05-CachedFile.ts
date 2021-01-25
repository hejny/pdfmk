import {
    access as accessOld,
    readFile as readFileOld,
    writeFile as writeFileOld
} from 'fs';
import { join } from 'path';
import sjcl from 'sjcl';
import { promisify } from 'util';
import { isNode } from '../utils/isNode';
import { IOptions, Node } from './00-Node';
import { GeneratedFile } from './04-File';

function fs() {
    // TODO: In future use import { access, writeFile } from 'fs/promises';
    // TODO: Bit inefficient

    if (!isNode()) {
        throw new Error(`You can use caching files only in node environment.`);
        // TODO: Add support for caching in browser
    }

    const access = promisify(accessOld);
    const readFile = promisify(readFileOld);
    const writeFile = promisify(writeFileOld);

    return {
        access,
        readFile,
        writeFile,
    };
}

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
            await fs().access(fileName);

            // const fileStat = await stat(fileName);
        } catch (error) {
            await fs().writeFile(
                fileName,
                Buffer.from(await (await this.parent.getBlob()).arrayBuffer()),
            );
        }

        return fileName;
    }

    public async getBuffer(): Promise<Buffer> {
        return await fs().readFile(await this.getLocalPath());
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
