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

  sumary() {
    const total = this.getTotal();
    const items = this.items;

    return {
      total,
      items,
    };
  }

  checkout() {
    const { total, items } = this.sumary();

    this.items = [];

    return {
      total,
      items,
    };
  }
}
