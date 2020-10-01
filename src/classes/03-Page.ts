import { LoadEvent } from 'puppeteer';
import { IOptions, Node } from './00-Node';
import { Maker } from './01-Maker';
import {
    IJpegFileOptions,
    IPdfFileOptions,
    IPngFileOptions,
    JpegFile,
    PdfFile,
    PngFile,
} from './04-File';

export abstract class Page<
    TPageOptions extends IOptions,
    TParent extends Node<any, any>
> extends Node<TPageOptions, TParent> {
    public async getTitle(): Promise<string> {
        throw new Error(`Not implemented yet.`);
    }
    public load(options: ILoadOptions): Load {
        return new Load(options, this);
    }
    public toPdf(options: IPdfFileOptions): PdfFile {
        return new PdfFile(options, this);
    }
    public toPng(options: IPngFileOptions): PngFile {
        return new PngFile(options, this);
    }
    public toJpeg(options: IJpegFileOptions): JpegFile {
        return new JpegFile(options, this);
    }
}

export interface IBlankPageOptions extends IOptions {
    url: string;
    // TODO: Page size
}

export class BlankPage extends Page<IBlankPageOptions, Maker> {}
// TODO: export class PdfPage extends Page<IPageOptions, Maker> {}

interface ILoadOptions extends IOptions {
    renderOnCallback?: string;
    waitUntil?: LoadEvent;
    // TODO: More
}

class Load extends Page<ILoadOptions, Page<any, any>> {}
