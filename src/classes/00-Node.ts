export interface IOptions {
    [key: string]: string | number | boolean | undefined | object;
}

export abstract class Node<
    TOptions extends IOptions,
    TParent extends Node<any, any> | null
> {
    constructor(private options: TOptions, private parent: TParent) {}

    protected get optionsFlat(): IOptions {
        const options: IOptions = {};

        for (const [key, value] of Object.entries(this.options)) {
            // TODO: DRY
            if (
                typeof value === 'string' ||
                typeof value === 'number' ||
                typeof value === 'boolean'
            ) {
                options[key] = value;
            } else if (typeof value === 'object') {
                for (const [subkey, subvalue] of Object.entries(value)) {
                    if (
                        typeof subvalue === 'string' ||
                        typeof subvalue === 'number' ||
                        typeof subvalue === 'boolean'
                    ) {
                        options[
                            key +
                                subkey.substr(0, 1).toUpperCase() +
                                subkey.substr(1)
                        ] = subvalue;
                    } else {
                        // TODO: Support multiple layers
                        throw new Error(`Not supported layers of options.`);
                    }
                }
            } else {
                // TODO: Support for Arrays
                throw new Error(
                    `Unsupported type of option "${typeof value}".`,
                );
            }
        }
        return options;
    }

    protected get optionsComputed(): IOptions {
        return {};
    }

    protected get optionsFlatDeep(): IOptions {
        return {
            ...(this.parent ? this.parent.optionsFlatDeep : {}),
            ...this.optionsComputed,
            ...this.optionsFlat,
        };
    }
}
