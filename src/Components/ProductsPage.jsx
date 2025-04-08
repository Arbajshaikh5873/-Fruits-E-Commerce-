import React from "react";
import { Product } from "./Product";

export function ProductsPage(props) {
  let { list } = props;

  function handleAddToCart(product) {
    props.onAddToCart(product);
  }

  function handleMinusClick(product) {
    props.onMinusClick(product);
  }

  function handlePlusClick(product) {
    props.onPlusClick(product);
  }

  return (
    <div className="container py-4">
      <h2 className="mb-4 text-center">Fresh Fruits</h2>
      <div className="row row-cols-2 row-cols-sm-2 row-cols-md-3 row-cols-lg-4 row-cols-xl-5 g-3">
        {list.map((product) => (
          <div className="col" key={product.id}>
            <Product
              product={product}
              onAddToCart={handleAddToCart}
              onPlusClick={handlePlusClick}
              onMinusClick={handleMinusClick}
            />
          </div>
        ))}
      </div>
    </div>
  );
}
