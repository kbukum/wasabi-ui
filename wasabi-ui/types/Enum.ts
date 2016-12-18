export class Enum<T> {
    public constructor(public readonly value: T) {}
    public toString() {
        return this.value.toString();
    }
}

export default Enum;