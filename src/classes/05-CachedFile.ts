import { access, writeFile } from 'fs/promises';
import { join } from 'path';
import sjcl from 'sjcl';
import { IOptions, Node } from './00-Node';
import { GeneratedFile } from './04-File';

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

            //const fileStat = await stat(fileName);
        } catch (error) {
            const content = await this.parent.getContent();
            await writeFile(fileName, content);
        } finally {
            return fileName;
        }
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
