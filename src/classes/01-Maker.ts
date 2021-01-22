import { IOptions, Node } from './00-Node';
import { BlankPage, IBlankPageOptions } from './03-Page';

export interface IMakerOptions extends IOptions {
    apiUrl: string|URL;
    token?: string;
}

export class Maker extends Node<IMakerOptions, null> {
    public open(options: IBlankPageOptions) {
        return new BlankPage(options, this);
    }
}
