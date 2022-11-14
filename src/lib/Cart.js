import { find as findLodash, remove as removeLodash } from 'lodash';
import Dinero from 'dinero.js';

const calculatePercentageDiscount = (amount, item) => {
  if (item.quantity > item.condition.minimum) {
    return amount.percentage(item.condition.percentage);
  }

  return Money({ amount: 0 });
};

const calculateQuantityDiscount = (amount, item) => {
  const isEven = item.quantity % 2 === 0;
  if (item.quantity > item.condition?.quantity) {
    return amount.percentage(isEven ? 50 : 40);
  }

  return Money({ amount: 0 });
};

const Money = Dinero;

Money.defaultCurrency = 'BRL';
Money.defaultPrecision = 2;

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
      const amount = Money({ amount: item.quantity * item.product.price });
      let discount = Money({ amount: 0 });

      if (item.condition?.percentage) {
        discount = calculatePercentageDiscount(amount, item);
      } else if (item.condition?.quantity) {
        discount = calculateQuantityDiscount(amount, item);
      }

      return acc.add(amount).subtract(discount);
    }, Money({ amount: 0 }));
  }

  sumary() {
    const total = this.getTotal().getAmount();
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
