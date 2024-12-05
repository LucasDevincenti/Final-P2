import React from "react";
export const Menu = () => {
  return (
    <>
      <section className="grid grid-cols-3 w-[80%] mx-auto h-[600px] mt-[80px] gap-4">
        <div className="w-full h-full bg-orange-500 row-span-2">
          <img
            src="../../src/assets/imagenes-productos/hamburguesa-cuadrado-2.webp"
            alt=""
          />
        </div>
        <div className="w-full h-full bg-orange-500 col-span-2">
        </div>
        <div className="w-full h-full bg-orange-500 col-span-2"></div>
      </section>
    </>
  );
};
