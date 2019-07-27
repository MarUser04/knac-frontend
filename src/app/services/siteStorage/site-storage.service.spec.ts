import { TestBed, inject } from '@angular/core/testing';

import { SiteStorageService } from './site-storage.service';

describe('SiteStorageService testing', () => {

  let siteStorageService: SiteStorageService;

  const payload = {
    name: 'token',
    value: 'huge token'
  };

  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [SiteStorageService]
    });

    siteStorageService = TestBed.get(SiteStorageService);
    let store = { };

    const mockLocalStorage = {
      getItem: (key: string): string => {
        return key in store ? store[key] : null;
      },
      setItem: (key: string, value: string) => {
        store[key] = `${value}`;
      },
      removeItem: (key: string) => {
        delete store[key];
      },
      clear: () => {
        store = {};
      }
    };

    spyOn(localStorage, 'getItem')
    .and.callFake(mockLocalStorage.getItem);
    spyOn(localStorage, 'setItem')
      .and.callFake(mockLocalStorage.setItem);
    spyOn(localStorage, 'removeItem')
      .and.callFake(mockLocalStorage.removeItem);
    spyOn(localStorage, 'clear')
      .and.callFake(mockLocalStorage.clear);

  });

  it('should create the SiteStorageService', () => {
    expect(siteStorageService).toBeTruthy();
  });

  it('should save on storage', () => {
    const { name, value } = payload;
    siteStorageService.saveOnStorage(payload);
    expect(JSON.parse(localStorage.getItem(name))).toEqual(value);
  });

  it('should get from storage', () => {
    const { name, value } = payload;
    localStorage.setItem(name, JSON.stringify(value));
    expect(siteStorageService.getFromStorage(name)).toEqual((value));
  });

  it('should remove from storage', () => {
    const { name, value } = payload;
    localStorage.removeItem(name);
    expect(siteStorageService.destroyOnStorage(name)).toBe(null);
  });
});
