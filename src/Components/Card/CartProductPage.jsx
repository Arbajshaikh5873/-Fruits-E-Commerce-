// import React from "react";
// import { CartProduct } from "./CartProduct";

// export function CartProductPage(props) {
//   const { cartList } = props;
//   let { validUser } = props;
//   return (
//     <>
//       {validUser ? (
//         <div className="container py-4">
//           <h2 className="mb-4 text-center">Fresh Fruits</h2>
//           <div className="row row-cols-2 row-cols-sm-2 row-cols-md-3 row-cols-lg-4 row-cols-xl-5 g-3">
//             {cartList.map((product) => (
//               <div className="col" key={product.id}>
//                 <CartProduct
//                   product={product}
//                 />
//               </div>
//             ))}
//           </div>
//         </div>
//       ) : (
//         <div className="alert alert-danger text-center" role="alert">
//           {" "}
//           You must be logged in to view your cart!
//         </div>
//       )}
//     </>
//   );
// }

import React, { useState, useEffect } from "react";
import { CartProduct } from "./CartProduct";

export function CartProductPage(props) {
  const { cartList } = props;
  const { validUser } = props;
  const [cart, setCart] = useState([]);
  const [totalAmount, setTotalAmount] = useState(0);

  useEffect(() => {
    // Initialize cart from props or local storage
    if (cartList && cartList.length > 0) {
      setCart(cartList);
      calculateTotal(cartList);
    } else {
      // Get cart from local storage if not provided in props
      const storedCart = localStorage.getItem("shoppingCart");
      if (storedCart) {
        const parsedCart = JSON.parse(storedCart);
        setCart(parsedCart);
        calculateTotal(parsedCart);
      }
    }
  }, [cartList]);

  // Calculate total amount
  const calculateTotal = (cartItems) => {
    let total = 0;
    cartItems.forEach((item) => {
      const discountedPrice = item.mrp - (item.mrp * item.discount) / 100;
      total += discountedPrice * item.qty;
    });
    setTotalAmount(total);
  };

  // Update quantity
  const updateQuantity = (productId, newQty) => {
    const updatedCart = cart.map((item) => {
      if (item.id === productId) {
        return { ...item, qty: newQty };
      }
      return item;
    });

    // Filter out items with quantity 0
    const filteredCart = updatedCart.filter((item) => item.qty > 0);

    setCart(filteredCart);
    calculateTotal(filteredCart);

    // Update local storage
    localStorage.setItem("shoppingCart", JSON.stringify(filteredCart));
  };

  // Back to shopping handler
  const handleBackToShopping = () => {
    window.location.href = "/"; // Adjust this to your actual shopping page route
  };

  // Proceed to checkout handler
  const handleProceedToBuy = () => {
    window.location.href = "/checkout"; // Adjust this to your actual checkout page route
  };

  return (
    <>
      {validUser ? (
        <div className="container py-4">
          <div className="row mb-4">
            <div className="col-12 text-center">
              <h2 className="fw-bold">Your Shopping Cart</h2>
            </div>
          </div>

          {cart.length > 0 ? (
            <>
              <div className="card border-0 shadow-sm mb-4">
                <div className="card-body p-0">
                  {cart.map((product, index) => (
                    <CartProduct
                      key={product.id}
                      product={product}
                      index={index}
                      updateQuantity={updateQuantity}
                      isLast={index === cart.length - 1}
                    />
                  ))}
                </div>
                <div className="card-footer bg-white p-3">
                  <div className="d-flex justify-content-end">
                    <h5 className="fw-bold mb-0">
                      Total: ₹ {totalAmount.toFixed(1)}
                    </h5>
                  </div>
                </div>
              </div>

              <div className="row mt-4">
                <div className="col-12">
                  <div className="d-flex justify-content-between">
                    <button
                      className="btn btn-outline-secondary px-4"
                      onClick={handleBackToShopping}
                    >
                      Back to shopping
                    </button>
                    <button
                      className="btn btn-danger px-4"
                      onClick={handleProceedToBuy}
                    >
                      Proceed to Buy
                    </button>
                  </div>
                </div>
              </div>
            </>
          ) : (
            <div className="alert alert-info text-center py-4" role="alert">
              <i className="bi bi-cart-x me-2"></i>
              Your cart is empty. Start shopping to add items to your cart!
            </div>
          )}
        </div>
      ) : (
        <div className="alert alert-danger text-center py-4" role="alert">
          <i className="bi bi-lock me-2"></i>
          You must be logged in to view your cart!
        </div>
      )}
    </>
  );
}

export default CartProductPage;
