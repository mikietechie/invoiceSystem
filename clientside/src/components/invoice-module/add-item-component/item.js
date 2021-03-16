class Item {
    constructor(item,quantity) {
        this.item = item;
        this.quantity = quantity;
        this.id = this.item.id;
        this.name = this.item.name;
        this.price = this.item.price;
        this.amount = this.item.price*this.quantity;
    }
    update =(quantity) => {
        this.quantity += quantity;
    }
    delete = () => {
        this.quantity = 0;
    }
    getAmount = () => {
        return this.item.price*this.quantity
    }
}
 export default Item