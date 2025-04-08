import React, { useState, useEffect } from "react";
import { CartProduct } from "./CartProduct";

export function CartProductPage(props) {
  const { cartList } = props;
  const { validUser } = props;
  const { setCartList } = props; // Make sure this prop is being passed from parent
  const [totalAmount, setTotalAmount] = useState(0);

  useEffect(() => {
    // Initialize cart from props or local storage
    if (cartList && cartList.length > 0) {
      calculateTotal(cartList);
    } else {
      // Get cart from local storage if not provided in props
      const storedCart = localStorage.getItem("cartItems"); // Use consistent key
      if (storedCart) {
        try {
          const parsedCart = JSON.parse(storedCart);
          setCartList(parsedCart); // Update parent state
          calculateTotal(parsedCart);
        } catch (err) {
          console.error("Error parsing cart from local storage:", err);
          setCartList([]); // Reset if invalid JSON
        }
      }
    }
  }, []); // Run once on mount, not on every cartList change

  // Separate effect to recalculate total when cartList changes
  useEffect(() => {
    if (cartList) {
      calculateTotal(cartList);
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
  function updateQuantity(productId, newQty) {
    const updatedCart = cartList.map((item) => {
      if (item.id === productId) {
        return { ...item, qty: newQty };
      }
      return item;
    });

    // Filter out items with quantity 0
    const filteredCart = updatedCart.filter((item) => item.qty > 0);

    // Update cart in parent component
    setCartList(filteredCart);
    props.onCartUpdate(filteredCart); // Call the parent function to update cart

    // Update local storage with consistent key
    try {
      localStorage.setItem("cartItems", JSON.stringify(filteredCart));
    } catch (err) {
      console.error("Error saving cart to local storage:", err);
    }
  }

  // Back to shopping handler
  const handleBackToShopping = () => {
    window.location.href = "/"; // Adjust this to your actual shopping page route
  };

  // Proceed to checkout handler
  // Modified handleProceedToBuy function for CartProductPage.js

  const handleProceedToBuy = () => {
    // WhatsApp phone number (include country code without + or spaces)
    const phoneNumber = "7387779339"; // Replace with your actual number

    // Create message with order details
    let message = "Hello! I'd like to place an order:\n\n";

    // Add each product to the message
    cartList.forEach((product, index) => {
      const discountedPrice =
        product.mrp - (product.mrp * product.discount) / 100;
      message += `${index + 1}. ${product.name} - ${product.qty} ${
        product.unit
      } - ₹${discountedPrice.toFixed(1)}/unit - ₹${(
        discountedPrice * product.qty
      ).toFixed(1)}\n`;
    });

    // Add total amount
    message += `\nTotal Amount: ₹${totalAmount.toFixed(1)}`;

    // Add customer message
    message += "\n\nPlease confirm my order. Thank you!";

    // Encode the message for URL
    const encodedMessage = encodeURIComponent(message);

    // Create WhatsApp URL
    const whatsappUrl = `https://wa.me/${phoneNumber}?text=${encodedMessage}`;

    // Open WhatsApp in new tab
    window.open(whatsappUrl, "_blank");
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

          {cartList && cartList.length > 0 ? (
            <>
              <div className="card border-0 shadow-sm mb-4">
                <div className="card-body p-0">
                  {cartList.map((product, index) => (
                    <CartProduct
                      key={product.id}
                      product={product}
                      index={index}
                      updateQuantity={updateQuantity}
                      isLast={index === cartList.length - 1}
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
