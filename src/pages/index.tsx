import Head from "next/head";
import router from "next/router";

export default function Home() {
  return (
    <div>
      <Head>
        <title>Home</title>
        <link rel="icon" href="/favicon.ico" />
      </Head>
      <h1>Hello, world!</h1>
      <button onClick={() => router.push("/another")}>Click me</button>
    </div>
  );
}

