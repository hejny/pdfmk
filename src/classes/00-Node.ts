export abstract class Node<
    TOptions extends Record<string, any>,
    TParent extends Node<any, any> | null
> {
    constructor(private options: TOptions, private parent: TParent) {}

    public get optionsFlat(): Record<string, string | number | boolean> {
        const options: Record<string, string | number | boolean> = {};

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

    public get optionsFlatDeep(): Record<string, string | number | boolean> {
        return {
            ...(this.parent ? this.parent.optionsFlatDeep : {}),
            ...this.optionsFlat,
        };
    }
}
