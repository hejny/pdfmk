import { IMakerOptions, Maker } from './classes/01-Maker';

export default function (options: IMakerOptions) {
    return new Maker(options, null);
}

// TODO: Auto add
// TODO: Auto update where it is used (but in more clever way)
