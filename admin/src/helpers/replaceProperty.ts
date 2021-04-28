export default function replaceProperty<T>(obj: T, old: string, newProperty: keyof T) {
  if (obj) {
    obj[newProperty] = obj[old];
    delete obj[old];
  }
}
