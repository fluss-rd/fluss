import Head from "next/head";
import styles from "../styles/Home.module.css";
import Hey from "admin/src/components/Hey";

export default function Home() {
  return (
    <div>
      <h1>Papp</h1>
      <Hey onClick={() => console.log("hey")} />
    </div>
  );
}

