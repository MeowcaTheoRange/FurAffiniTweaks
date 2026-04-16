import { StoreItem, selectStoreItemType } from "./base.js";

class Store {
  namespace;
  /** @type {Map<string, StoreItem>} */
  __storage = new Map();
  /** @type {Map<string, StoreStoreItem>} */
  __stores = new Map();

  constructor(namespace) {
    this.namespace = namespace;
  }

  // format() {
  //   let formattedStorage = {};
  //   this.#storage.forEach((value, key) => {
  //     formattedStorage[key] = value.toString();
  //   });
  //   this.#stores.forEach((store, namespace) => {
  //     formattedStorage[namespace] = store.item.format();
  //   });
  //   return formattedStorage;
  // }

  makeSubStore(namespace) {
    let store = new Store(namespace);
    let storeItem = new StoreStoreItem(store)
    this.__stores.set(namespace, storeItem);
    return store;
  }

  getSubStore(namespace) {
    return this.__stores.get(namespace)?.item;
  }

  setItem(key, value) {
    let storeItem = selectStoreItemType(value);
    this.__storage.set(key, storeItem);
  }

  getItem(key) {
    return this.__storage.get(key)?.item;
  }

  getType(key) {
    return this.__storage.get(key)?.type;
  }
}

class LocalStore extends Store {


  setItem(key, value) {
    let storeItem = selectStoreItemType(value);
    this.__storage.set(key, storeItem);
  }

  getItem(key) {
    return this.__storage.get(key)?.item;
  }

  getType(key) {
    return this.__storage.get(key)?.type;
  }
}

class StoreStoreItem extends StoreItem {
  constructor(store) {
    if (StoreItem.getType(store) !== "Store") throw "Item is not Store";
    super(store);
  }

  toString() {
    throw "Unimplemented";
    return JSON.stringify(Object.fromEntries(this.__item));
  }

  static fromString(value) {
    throw "Unimplemented";
    super.fromString(value);
    value = Object.entries(JSON.parse(value));
    return new StoreStoreItem(value);
  }
}

export function setupModule(module) {
  module.Store = Store;
}