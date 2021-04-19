export function getToken(): string {
  if (typeof window === "undefined") return null;

  const token: string = sessionStorage.getItem("token");
  return token;
}

export function getUserId(): string {
  if (typeof window === "undefined") return null;

  const userId: string = sessionStorage.getItem("userId");
  return userId;
}

export function storeToken(token: string, userId: string): void {
  if (typeof window === "undefined") return null;

  sessionStorage.setItem("token", token);
  sessionStorage.setItem("userId", userId);
}

export function removeToken(): void {
  if (typeof window === "undefined") return null;

  sessionStorage.clear();
}
