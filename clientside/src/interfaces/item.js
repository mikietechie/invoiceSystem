class Item {
    constructor(item,quantity=0) {
        this.id = item.id;
        this.name = item.name;
        this.price = item.price;
        this.description = item.description
        this.quantity = quantity;
    }
    update =(quantity) => {
        this.quantity += quantity;
    }
    delete = () => {
        this.quantity = 0;
    }
    getAmount = () => {
        return this.price*this.quantity
    }
}
 export default Item