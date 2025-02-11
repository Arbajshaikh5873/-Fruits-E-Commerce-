import React from "react";
import { Product } from "./Product";

export function ProductsPage(props) {
  let { pList } = props;
  function handleButtonClick(product, action) {
    console.log(`Add to Cart clicked for  ${product.name} in ProductsPage`);
    props.onButtonClick(product, action);
  }
  return (
    <div className="row row-cols-1 row-cols-md-2 row-cols-lg-3">
      {pList.map((product, index) => {
        return (
          <div className="col" key={index}>
            <Product
              product={product}
              onButtonClick={handleButtonClick}
            />
          </div>
        );
      })}
    </div>
  );
}
