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

    public getByFilter<FilterType>(filter: FilterType): T[] {
        return this.filter(filter, true);
    }

    public removeByFilter<FilterType>(filter: FilterType): void {
        this.list = this.filter(filter, false);
    }

    private filter<FilterType>(filter: FilterType, hasItem: boolean): T[] {
        return this.list.filter((listItem: T) => {
            for (const property in filter) {
                if (filter.hasOwnProperty(property) && listItem.hasOwnProperty(property)) {
                    if (filter[property] === listItem[property as any] && hasItem) {
                        return true;
                    }
                }
            }
        });
    }

}