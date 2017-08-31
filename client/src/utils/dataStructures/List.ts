export class List<T> {
    constructor(private list: T[] = []) {
    }

    public add(item: T): void {
        this.list.push(item);
    }

    public has(item: T): boolean {
        return this.list.indexOf(item) != -1;
    }

    public remove(item: T): void {
        if (this.has(item)) {
            this.list.splice(this.list.indexOf(item), 1);
        }
    }
}