import fetch from 'cross-fetch';
import { PDFOptions, ScreenshotOptions } from 'puppeteer';
import { IOptions, Node } from './00-Node';
import { Page } from './03-Page';
import { CachedFile, ICachedFileOptions } from './05-CachedFile';

export interface IFileOptions extends IOptions {}

/**
 * TODO: Some more elegant way how to not do a collision with object File
 */
export abstract class GeneratedFile<
    TFileOptions extends IFileOptions
> extends Node<TFileOptions, Page<any, any>> {
    public getUrl(security?: null | 'signed' | 'encrypted' | 'masked'): string {
        // TODO: as a promise
        // TODO: Custom message and debugging + download
        // TODO: Warn when unsecure

        if (security) {
            throw new Error(`Not implemented yet.`);
        }

        const options = this.optionsFlatDeep;

        // TODO: !!! Trim /
        let url = (options.apiUrl as string) + '/make?_';
        // TODO: Better construction of URL (see git history)

        for (const [key, value] of Object.entries(options)) {
            // console.log({ key, value });
            if (key !== 'apiUrl') {
                url += `&${key}=${encodeURIComponent(value as string)}`;
            }
        }

        // TODO:
        url += `&errorMessage=DEBUG`;

        return url;
    }
    public async getResponse(): Promise<Response> {
        return await fetch(this.getUrl());
    }
    public async getContent(): Promise<string> {
        return (await this.getResponse()).text();
    }
    public async getBlob(): Promise<Blob> {
        return (await this.getResponse()).blob();
    }
    public async getArrayBuffer(): Promise<ArrayBuffer> {
        return (await this.getBlob()).arrayBuffer();
    }
    public async getFile(): Promise<File> {
        throw new Error(`Not implemented yet.`);
    }
    public async getTitle(): Promise<string> {
        throw new Error(`Not implemented yet.`);
    }

    public cacheLocal(
        options: ICachedFileOptions,
    ): CachedFile<ICachedFileOptions> {
        return new CachedFile(options, this);
    }
}

export interface IPdfFileOptions extends IOptions, Omit<PDFOptions, 'path'> {
    // type: 'pdf';
}

export class PdfFile extends GeneratedFile<IPdfFileOptions> {
    public get optionsComputed(): IOptions {
        return { type: 'pdf' };
    }
}

interface IImageFileOptions
    extends IOptions,
        Omit<ScreenshotOptions, 'path' | 'encoding'> {
    width?: number;
    height?: number;
}

abstract class ImageFile<
    TFileOptions extends IImageFileOptions
> extends GeneratedFile<TFileOptions> {}

export interface IPngFileOptions extends IImageFileOptions {
    // type: 'png';
    // quality: undefined;
}

export class PngFile extends ImageFile<IPngFileOptions> {
    public get optionsComputed(): IOptions {
        return { type: 'png' };
    }
}

export interface IJpegFileOptions extends IImageFileOptions {
    // type: 'jpeg';
    quality: number;
}

export class JpegFile extends ImageFile<IJpegFileOptions> {
    public get optionsComputed(): IOptions {
        return { type: 'jpeg' };
    }
}

// new Maker({}).open().toPdf().getPublicUrlSync().toString();
