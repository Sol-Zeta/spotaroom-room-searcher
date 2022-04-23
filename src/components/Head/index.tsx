import React from "react";
import NextHead from "next/head";

export const Head = () => {
  return (
    <NextHead>
      <title>Spot a Room</title>
      <meta name="description" content="Find the room of your dreams" />
      <link rel="icon" href="/favicon.ico" />
    </NextHead>
  );
};
