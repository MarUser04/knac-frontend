import { TestBed, inject } from '@angular/core/testing';

import {TokenGetter} from './token-getter';

describe('TokenGetter testing', () => {

  const payload = {
    name: 'token',
    value: 'huge token'
  };

  beforeEach(() => {

    const store = {};

    const mockLocalStorage = {
      getItem: (key: string): string => {
        return key in store ? store[key] : null;
      },
      setItem: (key: string, value: string) => {
        store[key] = `${value}`;
      },
    };

    spyOn(localStorage, 'getItem')
    .and.callFake(mockLocalStorage.getItem);
    spyOn(localStorage, 'setItem')
    .and.callFake(mockLocalStorage.setItem);
  });

  it('should get token', () => {
    const { name, value } = payload;
    localStorage.setItem(name, value);
    expect(TokenGetter.getTokenGetter()).toEqual(value);
  });
});
