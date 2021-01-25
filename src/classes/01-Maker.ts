import { URL } from 'react-native-url-polyfill';
import { IOptions, Node } from './00-Node';
import { BlankPage, IBlankPageOptions } from './03-Page';

export interface IMakerOptions extends IOptions {
    apiUrl: string | URL/* Note: Not using native URL because of old node versions */;
    token?: string;
}

export class Maker extends Node<IMakerOptions, null> {
    public open(options: IBlankPageOptions) {
        if(options.apiUrl instanceof URL){
            options.apiUrl = options.apiUrl.toString();
        }
        return new BlankPage(options, this);
    }
}
