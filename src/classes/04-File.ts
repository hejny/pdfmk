import fetch from 'cross-fetch';
import { PDFOptions, ScreenshotOptions } from 'puppeteer';
import { IOptions, Node } from './00-Node';
import { Page } from './03-Page';

export interface IFileOptions extends IOptions {}

/**
 * TODO: Some more elegant way how to not do a collision with object File
 */
abstract class GeneratedFile<TFileOptions extends IFileOptions> extends Node<
    TFileOptions,
    Page<any, any>
> {
    public getUrl(security?: 'masked'): Promise<URL>;
    public getUrl(security?: null | 'signed' | 'encrypted'): URL;
    public getUrl(
        security?: null | 'signed' | 'encrypted' | 'masked',
    ): URL | Promise<URL> {
        // TODO: Custom message and debugging + download
        // TODO: Warn when unsecure

        if (security) {
            throw new Error(`Not implemented yet.`);
        }

        const options = this.optionsFlatDeep;

        const url = new URL(options.url as string);
        for (const [key, value] of Object.entries(options)) {
            // console.log({ key, value });
            url.searchParams.set(key, value as string);
        }

        // TODO:
        url.searchParams.set(`errorMessage`, 'DEBUG');

        return url;
    }
    public async getContent(): Promise<Blob> {
        throw new Error(`Not implemented yet.`);

        fetch(``);
    }
    public async getFile(): Promise<File> {
        throw new Error(`Not implemented yet.`);
    }
    public async getTitle(): Promise<string> {
        throw new Error(`Not implemented yet.`);
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

interface IImageFileOptions extends IOptions, Omit<ScreenshotOptions, 'path'|'encoding'> {}

abstract class ImageFile<
    TFileOptions extends IImageFileOptions
> extends GeneratedFile<TFileOptions> {}

export interface IPngFileOptions extends IImageFileOptions {
    // type: 'png';
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
