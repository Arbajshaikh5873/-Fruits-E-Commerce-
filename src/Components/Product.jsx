import React from "react";

export function Product(props) {
  let { product } = props;
  function handleClick(action) {
    console.log(`Add to Cart clicked for ${product.name}`);
    props.onButtonClick(product, action);
  }
  return (
      <div className="col m-2 border border-2 rounded-2 p-2 border-danger justify-content-center text-center">

      <div>
        <img
          src={`/productImages/${product.image}`} 

          className="img-fluid"
          alt=""

        />
      </div>
      <div>{product.name}</div>
      <div>
        {" "}
        Rs.{" "}
        {product.discount > 0 && (
          <span className="text-decoration-line-through">{product.mrp}</span>
        )}{" "}
        {product.mrp - (product.mrp * product.discount) / 100}
      </div>
      <div>
        {product.qty == 0 && (
          <button className="btn btn-danger" onClick={() => handleClick("+")}>
            Add to Cart
          </button>
        )}
        {product.qty != 0 && (
          <div className="row">
            <div className="col-4">
              <button
                className="btn btn-danger"
                onClick={() => handleClick("+")}
              >
                +
              </button>
            </div>
            <div className="col-4"></div>
            <div className="col-4">{product.qty}</div>
            <div className="col-4">
              <button
                className="btn btn-danger"
                onClick={() => handleClick("-")}
              >
                -
              </button>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}
