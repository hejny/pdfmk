import { Node } from './00-Node';
import { IPageOptions, Page } from './03-Page';

export interface IMakerOptions {
    url: string;
    token?: string;
}

export class Maker extends Node<IMakerOptions, null> {
    public open(options: IPageOptions) {
        return new Page(options, this);
    }
}
