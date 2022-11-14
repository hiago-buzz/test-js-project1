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

const calculateDiscount = (amount, quantity, condition) => {
  const list = Array.isArray(condition) ? condition : [condition];

  const [higherDiscount] = list
    .map(cond => {
      if (cond.percentage) {
        return calculatePercentageDiscount(amount, {
          condition: cond,
          quantity,
        }).getAmount();
      } else if (cond.quantity) {
        return calculateQuantityDiscount(amount, {
          condition: cond,
          quantity,
        }).getAmount();
      }
    })
    .sort((a, b) => b - a);

  return Money({ amount: higherDiscount });
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

      if (item.condition) {
        discount = calculateDiscount(amount, item.quantity, item.condition);
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
