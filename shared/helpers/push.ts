import router from "next/router";

export default function push(pathname: string) {
  return () => router.push(pathname);
}
