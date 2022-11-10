import { find as findLodash, remove as removeLodash } from 'lodash';

export default class Cart {
  items = [];

  add(item) {
    const itemToFind = { product: item.product };

    if (findLodash(this.items, itemToFind)) {
      removeLodash(this.items, itemToFind);
    }

    this.items.push(item);
  }

  remove(product) {
    removeLodash(this.items, { product: product });
  }

  getTotal() {
    return this.items.reduce((acc, item) => {
      return acc + item.quantity * item.product.price;
    }, 0);
  }

  checkout() {
    return {
      total: this.getTotal(),
      items: this.items,
    };
  }
}
