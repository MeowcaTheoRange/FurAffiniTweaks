export class StoreItem {
  __item;

  constructor(item) {
    this.__item = item;
  }

  static getType(item) {
    return (item).constructor.name;
  }

  get type() {
    return StoreItem.getType(this.__item);
  }

  get item() {
    return this.__item;
  }

  set item(item) {
    if (StoreItem.getType(item) !== this.type) throw "New item type does not match";
    this.__item = item;
  }

  toString() {
    return (this.__item).toString();
  }

  static fromString(value) {
    if (StoreItem.getType(value) !== "String") throw "Given value is not string";
    return new StoreItem(value);
  }
}

class BooleanStoreItem extends StoreItem {
  constructor(item) {
    if (StoreItem.getType(item) !== "Boolean") item = new Boolean(item);
    super(item);
  }

  toString() {
    return this.__item ? "true" : "false";
  }

  static fromString(value) {
    super.fromString(value);
    let boolValue = false;
    if (value !== "false" && value !== "") boolValue = true;
    return new BooleanStoreItem(boolValue);
  }
}
class NumberStoreItem extends StoreItem {
  constructor(item) {
    if (StoreItem.getType(item) !== "Number") item = parseFloat(item);
    super(item);
  }

  static fromString(value) {
    super.fromString(value);
    return new NumberStoreItem(value);
  }
}
class StringStoreItem extends StoreItem {
  constructor(item) {
    if (StoreItem.getType(item) !== "String") item = item.toString();
    super(item);
  }

  toString() {
    return this.__item;
  }

  static fromString(value) {
    super.fromString(value);
    return new StringStoreItem(value);
  }
}
class SetStoreItem extends StoreItem {
  constructor(item) {
    item = new Set(item);
    super(item);
  }

  toString() {
    return JSON.stringify(Array.from(this.__item));
  }

  static fromString(value) {
    super.fromString(value);
    return new SetStoreItem(JSON.parse(value));
  }
}
class MapStoreItem extends StoreItem {
  constructor(item) {
    item = new Map(item);
    super(item);
  }

  toString() {
    return JSON.stringify(Object.fromEntries(this.__item));
  }

  static fromString(value) {
    super.fromString(value);
    value = Object.entries(JSON.parse(value));
    return new MapStoreItem(value);
  }
}
class JSONStoreItem extends StoreItem {
  static toJSONCompatible(value) {
    let stringifiedValue = JSON.stringify(value);
    let parsedStringified = JSON.parse(stringifiedValue);
    return parsedStringified;
  }
  static isValidJSON(value) {
    return value === JSONStoreItem.toJSONCompatible(value);
  }

  constructor(item) {
    item = JSONStoreItem.toJSONCompatible(item);
    super(item);
  }

  toString() {
    return JSON.stringify(this.__item);
  }

  static fromString(value) {
    super.fromString(value);
    return new JSONStoreItem(value);
  }
}

export function selectStoreItemType(value) {
  switch ((value).constructor.name) {
    case "Boolean":
      return new BooleanStoreItem(value);
    case "Number":
      return new NumberStoreItem(value);
    case "String":
      return new StringStoreItem(value);
    case "Set":
      return new SetStoreItem(value);
    case "Map":
      return new MapStoreItem(value);
    case "Array":
    case "Object":
      return new JSONStoreItem(value);
    default:
      return new StoreItem(value);
  }
}