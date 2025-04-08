// import React from "react";

// export function CartProduct(props) {
//   let { product } = props;

//   let discountedPrice = product.mrp - (product.mrp * product.discount) / 100;

//   return (
//     <div className="card h-100 shadow-sm border-0 product-card">
//       {/* Discount badge */}
//       {product.discount > 0 && (
//         <div className="badge bg-danger position-absolute top-0 end-0 m-2 rounded-pill px-2">
//           {product.discount}% OFF
//         </div>
//       )}

//       {/* Product type badge */}
//       <div className="position-absolute top-0 start-0 m-2">
//         <span
//           className={`badge ${
//             product.type === "Organic" ? "bg-success" : "bg-info"
//           } rounded-pill`}
//         >
//           {product.type}
//         </span>
//       </div>

//       {/* Product image with hover effect */}
//       <div className="text-center p-3 product-img-container">
//         <img
//           src={`/productImages/${product.image}`}
//           className="img-fluid product-img"
//           alt={product.name}
//         />
//       </div>

//       <div className="card-body d-flex flex-column">
//         {/* Product name */}
//         <h5 className="product-name fw-bold">{product.name}</h5>

//         {/* Unit */}
//         <div className="text-muted small mb-2">Per {product.unit}</div>

//         {/* Price information */}
//         <div className="d-flex align-items-center mb-3">
//           <h5 className="text-danger fw-bold mb-0">
//             ₹{discountedPrice.toFixed(2)}
//           </h5>
//           {product.discount > 0 && (
//             <small className="text-muted text-decoration-line-through ms-2">
//               ₹{Number(product.mrp).toFixed(2)}
//             </small>
//           )}
//         </div>

//         {/* Stock status */}
//         {/* {!product.inStock && (
//           <div className="mb-2">
//             <span className="badge bg-secondary">Out of Stock</span>
//           </div>
//         )} */}
//         <div className="mt-auto">
//           {/* Add to cart button or quantity controls
//         // <div className="mt-auto">
//           {product.qty == 0 && (
//             <button
//               className={`btn ${
//                 product.inStock ? "btn-danger" : "btn-secondary"
//               } w-100 py-2`}
//               onClick={handleAddtoCartButtonClick}
//               disabled={!product.inStock}
//             >
//               {product.inStock ? "Add to Cart" : "Out of Stock"}
//             </button>
//           )} */}

//           {product.qty != 0 && (
//             <div className="d-flex justify-content-center align-items-center quantity-controls">
//               <div className="fw-bold mx-3 ">{product.qty}</div>
//             </div>
//           )}
//         </div>
//       </div>
//     </div>
//   );
// }

import React from "react";

export function CartProduct(props) {
  let { product, index, updateQuantity, isLast } = props;

  // Calculate discounted price
  let discountedPrice = product.mrp - (product.mrp * product.discount) / 100;
  let totalItemPrice = discountedPrice * product.qty;

  return (
    <div className="border-bottom p-3">
      <div className="row align-items-center">
        {/* Item number */}
        <div className="col-1 text-center">
          <span className="fw-bold text-secondary">{index + 1}.</span>
        </div>

        {/* Product name */}
        <div className="col-3">
          <h5 className="fw-bold mb-0">{product.name}</h5>
          <small className="text-muted">Per {product.unit}</small>
        </div>

        {/* Quantity controls */}
        <div className="col-4">
          <div className="d-flex align-items-center">
            <button
              className="btn btn-danger d-flex justify-content-center align-items-center rounded-circle"
              style={{ width: "30px", height: "30px" }}
              onClick={() => updateQuantity(product.id, product.qty - 1)}
            >
              <span className="fw-bold">-</span>
            </button>

            <span className="mx-3 fw-bold">{product.qty}</span>

            <button
              className="btn btn-danger d-flex justify-content-center align-items-center rounded-circle"
              style={{ width: "30px", height: "30px" }}
              onClick={() => updateQuantity(product.id, product.qty + 1)}
            >
              <span className="fw-bold">+</span>
            </button>
          </div>
        </div>

        {/* Price information */}
        <div className="col-4 text-end">
          {product.discount > 0 && (
            <div className="text-muted text-decoration-line-through small">
              Rs. {Number(product.mrp).toFixed(1)}
            </div>
          )}

          <div className="fw-semibold">Rs. {discountedPrice.toFixed(1)}</div>

          <div className="fw-bold text-danger fs-5">
            Rs. {totalItemPrice.toFixed(1)}
          </div>
        </div>
      </div>
    </div>
  );
}

export default CartProduct;
