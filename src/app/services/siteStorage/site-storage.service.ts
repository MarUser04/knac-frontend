import { Injectable } from '@angular/core';

@Injectable()
export class SiteStorageService {

  constructor() { }

  saveOnStorage(payload = {name: '', value: '' }) {
    const { name, value } = payload;
    try {
      localStorage.setItem(name, JSON.stringify(value));
    } catch (err) {
      throw new SyntaxError('Storage: name && value are not defined!');
    }
  }

  getFromStorage(name) {
    try {
      return JSON.parse(localStorage.getItem(name));
    } catch (err) {
      throw new SyntaxError('Storage: name is not defined!');
    }
  }

  destroyOnStorage(name) {
    try {
      localStorage.removeItem(name);
      return localStorage.getItem(name);
    } catch (err) {
      throw new SyntaxError('Storage: name is not defined!');
    }
  }
}
