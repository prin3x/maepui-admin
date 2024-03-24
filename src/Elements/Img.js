import Image from "next/image";
import React from "react";

const Img = (props) => {
  const newProps = { ...props, src: process.env.NEXT_PUBLIC_API_PROD_URL + "/" + props["src"] };
  return <Image {...newProps} />;
};

export default Img;
