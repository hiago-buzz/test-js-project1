import { queryString, parse } from './queryString';

describe('Object to query string', () => {
  it('should create a valid query string when an object is receive', () => {
    const obj = {
      name: 'Hiago',
      profession: 'developer',
    };

    expect(queryString(obj)).toBe('name=Hiago&profession=developer');
  });

  it('should create a valid query string when an array is receive', () => {
    const obj = {
      name: 'Hiago',
      profession: 'developer',
      abilities: ['JS', 'TDD'],
    };

    expect(queryString(obj)).toBe(
      'name=Hiago&profession=developer&abilities=JS,TDD',
    );
  });

  it('should throw an error when an object is passed as value', () => {
    const obj = {
      name: 'Hiago',
      profession: 'developer',
      abilities: {
        first: 'JS',
        second: 'TDD',
      },
    };

    expect(() => {
      queryString(obj);
    }).toThrowError();
  });
});

describe('Query string to Object', () => {
  it('should create a valid object when a query string is passed', () => {
    const qs = 'name=Hiago&profession=developer';

    expect(parse(qs)).toEqual({
      name: 'Hiago',
      profession: 'developer',
    });
  });

  it('should create a valid object when  exist an array value', () => {
    const qs = 'name=Hiago&profession=developer&abilities=JS,TDD';

    expect(parse(qs)).toEqual({
      name: 'Hiago',
      profession: 'developer',
      abilities: ['JS', 'TDD'],
    });
  });
});
