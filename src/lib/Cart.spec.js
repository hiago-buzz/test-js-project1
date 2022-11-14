import Cart from './Cart';

describe('Cart', () => {
  let cart;

  let product = {
    title: 'Adidas tennis',
    price: 2000,
  };

  let product2 = {
    title: 'Nike tennis',
    price: 4000,
  };

  beforeEach(() => {
    cart = new Cart();
  });

  describe('getTotal()', () => {
    it('should return 0 when getTotal() is executed in a newly created instance', () => {
      expect(cart.getTotal().getAmount()).toEqual(0);
    });

    it('should multiply quantity and price and receive the total amount', () => {
      cart.add({
        product,
        quantity: 2,
      });

      expect(cart.getTotal().getAmount()).toEqual(4000);
    });

    it('should ensure no more than on product exists at a time', () => {
      cart.add({
        product,
        quantity: 2,
      });

      cart.add({
        product,
        quantity: 1,
      });

      expect(cart.getTotal().getAmount()).toEqual(2000);
    });

    it('should update total when a product gets included and removed', () => {
      cart.add({
        product,
        quantity: 2,
      });
      cart.add({
        product: product2,
        quantity: 1,
      });

      cart.remove(product);

      expect(cart.getTotal().getAmount()).toEqual(4000);
    });
  });

  describe('checkout', () => {
    it('should return an object with the total and the list of items', () => {
      cart.add({
        product,
        quantity: 2,
      });
      cart.add({
        product: product2,
        quantity: 5,
      });

      expect(cart.checkout()).toMatchSnapshot();
    });

    it('should return an object with the total and the list of items when sumary() is called', () => {
      cart.add({
        product,
        quantity: 2,
      });

      cart.add({
        product: product2,
        quantity: 5,
      });

      expect(cart.sumary()).toMatchSnapshot();
      expect(cart.getTotal().getAmount()).toBeGreaterThan(0);
    });

    it('should reset the cart when checkout() is called', () => {
      cart.add({
        product: product2,
        quantity: 5,
      });

      cart.checkout();

      expect(cart.getTotal().getAmount()).toEqual(0);
    });
  });

  describe('special conditions', () => {
    it('should apply percentage discount quantity above minimum is passed', () => {
      const condition = {
        percentage: 30,
        minimum: 2,
      };
      cart.add({
        product,
        condition,
        quantity: 3,
      });

      expect(cart.getTotal().getAmount()).toEqual(4200);
    });

    it('should NOT apply percentage discount quantity is below or equals minimum', () => {
      const condition = {
        percentage: 30,
        minimum: 2,
      };
      cart.add({
        product,
        condition,
        quantity: 2,
      });

      expect(cart.getTotal().getAmount()).toEqual(4000);
    });

    it('should apply quantity discount for even quantities', () => {
      const condition = {
        quantity: 2,
      };
      cart.add({
        product,
        condition,
        quantity: 4,
      });

      expect(cart.getTotal().getAmount()).toEqual(4000);
    });

    it('should  NOT apply quantity is below or equals minimum', () => {
      const condition = {
        quantity: 2,
      };
      cart.add({
        product,
        condition,
        quantity: 1,
      });

      expect(cart.getTotal().getAmount()).toEqual(2000);
    });

    it('should apply quantity discount for odd quantities', () => {
      const condition = {
        quantity: 2,
      };
      cart.add({
        product,
        condition,
        quantity: 5,
      });

      expect(cart.getTotal().getAmount()).toEqual(6000);
    });
  });
});
