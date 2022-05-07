import React from "react";
import Link from "next/link";
import { urlFor } from "../../lib/client";

const FooterBanner = ({
  footerBanner: {
    discount,
    largeText1,
    largeText2,
    saleTIme,
    smallText,
    buttonText,
    midText,
    image,
    product,
    desc
  },
}) => {
  return (
    <div className="footer-banner-container">
      <div className="banner-desc">
        <div className="left">
          <p>{discount}</p>
          <h3>{largeText1}</h3>
          <h3>{largeText2}</h3>
          <p>{saleTIme}</p>
        </div>

        <div className="right">
          <p>{smallText}</p>
          <h3>{smallText}</h3>
          <p>{desc}</p>
        <Link href={`product/${product}`} >
          <button type="button" >{buttonText}</button>
        </Link>
        </div>
        <img src={image&&urlFor(image)} alt="product" className="footer-banner-image" />
      </div>
    </div>
  );
};

export default FooterBanner;
