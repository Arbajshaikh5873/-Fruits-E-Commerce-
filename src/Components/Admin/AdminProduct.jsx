import React from "react";

export function AdminProduct(props) {
  let { product } = props;

  // Calculate discounted price
  let discountedPrice = product.mrp - (product.mrp * product.discount) / 100;
  // Removed redundant price variable

  function handleEditClick() {
    props.onEditProduct(product);
  }
  function handleDeleteClick() {
    let confirmDelete = window.confirm(
      `Are you sure you want to delete ${product.name}?`
    );
    if (!confirmDelete) return;
    props.onDeleteProduct(product);
  }
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
              ₹{Number(product.mrp).toFixed(2)}
            </small>
          )}
        </div>
        {/* Add to cart button or quantity controls */}
        <div className="mt-auto">
          <div className="d-flex justify-content-around align-items-center quantity-controls">
            <button
              className="btn btn-outline-danger rounded-circle quantity-btn "
              onClick={handleEditClick}
            >
              <i class="bi bi-pencil-square"></i>
            </button>

            <button
              className="btn btn-outline-danger rounded-circle quantity-btn "
              onClick={handleDeleteClick}
            >
              <i class="bi bi-trash"></i>
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}
