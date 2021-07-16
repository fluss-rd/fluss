import { NextPage } from "next";
import axiosInstance from "shared/services/axiosInstance";

const Test: NextPage = () => {
  console.log({ axiosInstance });
  return <div></div>;
};

export default Test;

