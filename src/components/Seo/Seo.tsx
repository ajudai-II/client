import React from "react";
import Head from "next/head";

interface IHead {
  title: string;
}
const Seo: React.FC<IHead> = ({ title }) => {
  return (
    <Head>
      <title>{title}</title>
      <meta name="description" content="Generated by create next app" />
      <meta name="viewport" content="width=device-width, initial-scale=1" />
      <link rel="icon" href="icons/ajudai.svg" />
    </Head>
  );
};

export default Seo;
