const { queryString } = require('./queryString');

describe('Object to query string', () => {
  it('should create a valid query string when an object is receive', () => {
    const obj = {
      name: 'Hiago',
      profession: 'developer',
    };

    expect(queryString(obj)).toBe('name=Hiago&profession=developer');
  });
});
