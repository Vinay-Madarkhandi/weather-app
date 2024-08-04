import React from "react";
import Image from "next/image";

const Myqr = () => {
  return (
    <div>
      <h1 className=" text-2xl ">My QR code</h1>
      <Image src="/My QR.jpg" width={300} height={300} />
      <p>ye just fun ke liye hai agar tumahara dil bada ho tho dedo 😗 👉👈</p>
    </div>
  );
};
export default Myqr;
