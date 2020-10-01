export abstract class Node<TOptions, TParent> {
    constructor(readonly options: TOptions, readonly parent: TParent) {}
}
