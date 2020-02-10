import uniqid from 'uniqid';

export default class List {
    constructor() {
        this.items = [];
    }
    
    addItem(count, unit, ingredient) {
        const item = {
            id: uniqid(),
            count,
            unit,
            ingredient
        }
        this.items.push(item);
        return item;
    }
    
    deleteItem(id) {
        const index = this.items.findIndex(el => el.id === id);
        // [2, 3, 4] splice(1,2) return [3,4]; original array [2, 4] -- mutate original array
        // [2, 3, 4] slice(1,2) return 3; original array [2, 3, 4] -- not mutate
        this.items.splice(index, 1);
    }
    
    updateCount(id, newCount) {
        this.items.find(el => el.id === id).count = newCount;
    }
}