export function getToken(): string {
  const token:string = sessionStorage.getItem("token");
  return token;
}

export function getUserId(): string {
  const userId: string = sessionStorage.getItem("userId");
  return userId;
}

export function storeToken(token: string, userId: string): void {
  sessionStorage.setItem("token", token);
  sessionStorage.setItem("userId", userId);
}

export function removeToken(): void {
  sessionStorage.clear();
}
