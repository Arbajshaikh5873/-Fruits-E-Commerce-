import React from "react";

export function Product(props) {
  let { product } = props;

  function handleAddtoCartButtonClick() {
    props.onAddToCart(product);
  }

  function handlePlusClick() {
    props.onPlusClick(product);
  }

  function handleMinusClick() {
    props.onMinusClick(product);
  }

  // Calculate discounted price
  let discountedPrice = product.mrp - (product.mrp * product.discount) / 100;
  let mrp = Number(product.mrp) || 0; // Fallback to 0 if undefined or null

  return (
    <div className="card h-100 shadow-sm border-0 product-card">
      {/* Discount badge */}
      {product.discount > 0 && (
        <div className="badge bg-danger position-absolute top-0 end-0 m-2 rounded-pill px-2">
          {product.discount}% OFF
        </div>
      )}

      {/* Product type badge */}
      <div className="position-absolute top-0 start-0 m-2">
        <span
          className={`badge ${
            product.type === "Organic" ? "bg-success" : "bg-info"
          } rounded-pill`}
        >
          {product.type}
        </span>
      </div>

      {/* Product image with hover effect */}
      <div className="text-center p-3 product-img-container">
        <img
          src={`/productImages/${product.image}`}
          className="img-fluid product-img"
          alt={product.name}
        />
      </div>

      <div className="card-body d-flex flex-column">
        {/* Product name */}
        <h5 className="product-name fw-bold">{product.name}</h5>

        {/* Unit */}
        <div className="text-muted small mb-2">Per {product.unit}</div>

        {/* Price information */}
        <div className="d-flex align-items-center mb-3">
          <h5 className="text-danger fw-bold mb-0">
            ₹{discountedPrice.toFixed(2)}
          </h5>
          {product.discount > 0 && (
            <small className="text-muted text-decoration-line-through ms-2">
              ₹{mrp.toFixed(2)}
            </small>
          )}
        </div>

        {/* Stock status */}
        {/* {!product.inStock && (
          <div className="mb-2">
            <span className="badge bg-secondary">Out of Stock</span>
          </div>
        )} */}

        {/* Add to cart button or quantity controls */}
        <div className="mt-auto">
          {product.qty == 0 && (
            <button
              className={`btn ${
                product.inStock ? "btn-danger" : "btn-secondary"
              } w-100 py-2`}
              onClick={handleAddtoCartButtonClick}
              disabled={!product.inStock}
            >
              {product.inStock ? "Add to Cart" : "Out of Stock"}
            </button>
          )}

          {product.qty != 0 && (
            <div className="d-flex justify-content-between align-items-center quantity-controls">
              <button
                className="btn btn-outline-danger rounded-circle quantity-btn"
                onClick={handleMinusClick}
              >
                <i className="bi bi-dash"></i>
              </button>
              <span className="fw-bold mx-3">{product.qty}</span>
              <button
                className="btn btn-outline-danger rounded-circle quantity-btn"
                onClick={handlePlusClick}
              >
                <i className="bi bi-plus"></i>
              </button>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
