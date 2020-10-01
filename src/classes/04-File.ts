import fetch from 'cross-fetch';
import { PDFOptions, ScreenshotOptions } from 'puppeteer';
import { Node } from './00-Node';
import { Page } from './03-Page';

export interface IFileOptions {}

/**
 * TODO: Some more elegant way how to not do a collision with object File
 */
abstract class GeneratedFile<TFileOptions extends IFileOptions> extends Node<
    TFileOptions,
    Page
> {
    public getUnsecurePublicUrlSync(): URL {
        const options = {
            ...this.parent.parent.options,
            ...this.parent.options,
            ...this.options,
        };

        const url = new URL(this.parent.parent.options.url);
        for (const [key, value] of Object.entries(options)) {
            console.log({ key, value });
            url.searchParams.set(key, value as string);
        }

        return url;
    }
    public getSignedPublicUrlSync(): URL {
        throw new Error(`Not implemented yet.`);
    }
    public getEncryptedPublicUrlSync(): URL {
        throw new Error(`Not implemented yet.`);
    }
    public async getPublicUrl(): Promise<URL> {
        throw new Error(`Not implemented yet.`);
        fetch(``);
    }
    public async getContent(): Promise<Blob> {
        throw new Error(`Not implemented yet.`);
    }
    public async getFile(): Promise<File> {
        throw new Error(`Not implemented yet.`);
    }
    public async getTitle(): Promise<string> {
        throw new Error(`Not implemented yet.`);
    }
}

export interface IPdfFileOptions extends Omit<PDFOptions, 'path'> {}

export class PdfFile extends GeneratedFile<IPdfFileOptions> {}

interface IImageFileOptions extends Omit<ScreenshotOptions, 'path'> {}

abstract class ImageFile<
    TFileOptions extends IImageFileOptions
> extends GeneratedFile<TFileOptions> {}

export interface IPngFileOptions extends IImageFileOptions {
    type: 'png';
}

export class PngFile extends ImageFile<IPngFileOptions> {}

export interface IJpegFileOptions extends IImageFileOptions {
    type: 'jpeg';
    quality: number;
}

export class JpegFile extends ImageFile<IJpegFileOptions> {}

// new Maker({}).open().toPdf().getPublicUrlSync().toString();
