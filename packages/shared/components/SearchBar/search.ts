import { Row } from "react-table";

export default function search<T>(data: T[], keyword: string): T[] {
  const matches = data.filter((element: T) => {
    const normalizedKeyword: string = normalizeText(keyword);
    const normalizedContent: string = normalizeText(objToString(element));
    const thereIsAMatch = normalizedContent.includes(normalizedKeyword);
    return thereIsAMatch;
  });

  return matches;
}

export function searchRows<T extends object>(data: Row<T>[], keyword: string): Row<T>[] {
  const matches = data.filter((element: Row<T>) => {
    const normalizedKeyword: string = normalizeText(keyword);
    const normalizedContent: string = normalizeText(objToString(element.original));
    const thereIsAMatch = normalizedContent.includes(normalizedKeyword);
    return thereIsAMatch;
  });

  return matches;
}

function objToString<T>(obj: T): string {
  const str = Object.keys(obj)
    .map((key) => obj[key])
    .join(" ");

  return str;
}

function normalizeText(text: string): string {
  const normalized = text.normalize("NFD").replace(/[\u0300-\u036f]/g, "");
  const lowerCased = normalized.toLowerCase();
  return lowerCased;
}
