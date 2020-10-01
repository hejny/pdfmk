export interface IOptions {
    [key: string]: string | number | boolean | undefined | object;
}

export abstract class Node<
    TOptions extends IOptions,
    TParent extends Node<any, any> | null
> {
    constructor(protected options: TOptions, protected parent: TParent) {}

    protected get optionsFlat(): IOptions {
        const options: IOptions = {};

        const assign = (
            key: string,
            value:
                | string
                | number
                | boolean /* TODO: Here could be object for the deep recursion */,
        ) => {
            if (typeof options[key] !== 'undefined') {
                /* tslint:disable:no-console */
                console.warn(
                    `Collision in property "${key}", value "${options[key]}" is rewritten by "${value}".`,
                );
            }
            options[key] = value;
        };

        for (const [key, value] of Object.entries(this.options)) {
            // TODO: DRY
            if (
                typeof value === 'string' ||
                typeof value === 'number' ||
                typeof value === 'boolean'
            ) {
                assign(key, value);
            } else if (typeof value === 'object') {
                for (const [subkey, subvalue] of Object.entries(value)) {
                    if (
                        typeof subvalue === 'string' ||
                        typeof subvalue === 'number' ||
                        typeof subvalue === 'boolean'
                    ) {
                        assign(
                            key +
                                subkey.substr(0, 1).toUpperCase() +
                                subkey.substr(1),
                            subvalue,
                        );
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
        // TODO: Warn when overlapping
        return {
            ...(this.parent ? this.parent.optionsFlatDeep : {}),
            ...this.optionsComputed,
            ...this.optionsFlat,
        };
    }
}
