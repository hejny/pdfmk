import { Node } from './00-Node';
import { Maker } from './01-Maker';
import {
    IJpegFileOptions,
    IPdfFileOptions,
    IPngFileOptions,
    JpegFile,
    PdfFile,
    PngFile,
} from './04-File';

export interface IPageOptions {}

export class Page extends Node<IPageOptions, Maker> {
    public async getTitle(): Promise<string> {
        throw new Error(`Not implemented yet.`);
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

export class PdfPage extends Page {}
