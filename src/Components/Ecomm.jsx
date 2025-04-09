import React, { useEffect, useState } from "react";
import { ProductsPage } from "./ProductsPage";
import { Navbar } from "./Navbar";
import { Signup } from "./Signup";
import Login from "./Login";
import { CartProductPage } from "./Card/CartProductPage";
import axios from "axios";
import { AdminPage } from "./Admin/AdminPage";
import AddProductForm from "./Admin/AddProductForm";

export function Ecomm() {
  let [list, setList] = useState([]);
  let [view, setView] = useState("products");
  let [validUser, setValidUser] = useState("");
  let [adminView, setAdminView] = useState("");
  let [adminProduct, setAdminProduct] = useState("");
  let [cartList, setCartList] = useState([]);

  useEffect(() => {
    console.log("getting data from server");
    initialize();
  }, []);

  // Fixed initialization function with proper async handling
  async function initialize() {
    try {
      // First get the logged in user
      await getLoggedInUser();

      // Then get product data from server
      await getDataFromServer();

      // Finally load cart items once products are loaded
    } catch (error) {
      console.error("Initialization error:", error);
    }
  }

  async function getDataFromServer() {
    try {
      let response = await axios.get("http://localhost:3000/fruits");
      console.log("Data from server:", response.data);

      getCartItems(response.data);
      // return response.data; // Return the data for potential chaining
    } catch (error) {
      console.error("Error fetching data from server:", error);
      return []; // Return empty array in case of error
    }
  }

  function saveCartItems(cartItems) {
    try {
      let cartData = JSON.stringify(cartItems);
      localStorage.setItem("cartItems", cartData);
    } catch (error) {
      console.error("Error saving cart items:", error);
    }
  }

  async function getCartItems(list) {
    try {
      console.log("list in get cart items", list);
      // Get cart items from local storage

      let cartData = localStorage.getItem("cartItems");

      let cartItems = JSON.parse(cartData);
      setCartList(cartItems || []); // Set cart list to empty array if null
      console.log("Cart items from local storage:", cartItems);

      // Only update product quantities if we have both products and cart items
      let updatedList = "";
      if (list.length > 0 && cartItems && cartItems.length > 0) {
        updatedList = list.map((p) => {
          let cartItem = cartItems.find((e) => e.id == p.id);
          if (cartItem) {
            return { ...p, qty: cartItem.qty };
          }
          return { ...p, qty: 0 };
        });

        console.log("Updated product list with quantities:", updatedList);
      }
      if (updatedList) {
        setList(updatedList);
      } else {
        setList(list);
      }
    } catch (error) {
      console.error("Error getting cart items:", error);
      setCartList([]);
    }
  }

  function handleAddToCart(product) {
    // Use functional updates to ensure we're working with the latest state
    setList((currentList) =>
      currentList.map((p) => {
        if (p.id === product.id) {
          let updatedProduct = { ...p, qty: 1 };

          // Update cart list
          let newCartList = [
            ...cartList.filter((item) => item.id !== p.id),
            updatedProduct,
          ];
          setCartList(newCartList);
          saveCartItems(newCartList);

          return updatedProduct;
        }
        return p;
      })
    );
  }

  function handlePlusClick(product) {
    setList((currentList) =>
      currentList.map((p) => {
        if (p.id === product.id) {
          let updatedProduct = { ...p, qty: p.qty + 1 };

          // Update cart list
          let existingCartItem = cartList.find((item) => item.id === p.id);
          let newCartList;

          if (existingCartItem) {
            newCartList = cartList.map((item) =>
              item.id === p.id ? updatedProduct : item
            );
          } else {
            newCartList = [...cartList, updatedProduct];
          }

          setCartList(newCartList);
          saveCartItems(newCartList);

          return updatedProduct;
        }
        return p;
      })
    );
  }

  function handleMinusClick(product) {
    setList((currentList) =>
      currentList.map((p) => {
        if (p.id === product.id) {
          let newQty = Math.max(0, p.qty - 1);
          let updatedProduct = { ...p, qty: newQty };

          // Update cart list
          let newCartList;

          if (newQty === 0) {
            newCartList = cartList.filter((item) => item.id !== p.id);
          } else {
            newCartList = cartList.map((item) =>
              item.id === p.id ? updatedProduct : item
            );
          }

          setCartList(newCartList);
          saveCartItems(newCartList);

          return updatedProduct;
        }
        return p;
      })
    );
  }

  function handleViewChange(view) {
    console.log(`View changed to ${view}`);
    setView(view);
  }

  function handleLoginClick(v) {
    console.log(`View changed to ${v}`);
    setView(v);
  }

  function handleSignUpClick(view) {
    console.log(`View changed to ${view}`);
    setView(view);
  }

  function handleLoginSuccess(user) {
    if (user.role === "admin") {
      setView("admin");
    } else {
      setView("products");
    }
    setValidUser(user);
    storeUserLogin(user);
    console.log("printing valid user in ecomm", user.role);
  }

  function storeUserLogin(user) {
    try {
      let userData = JSON.stringify(user);
      localStorage.setItem("loggedInUser", userData);
    } catch (error) {
      console.error("Error storing user login:", error);
    }
  }

  async function getLoggedInUser() {
    try {
      let userData = localStorage.getItem("loggedInUser");

      if (!userData) {
        return null;
      }

      let user = JSON.parse(userData);
      console.log("User data fetched from local storage:", user);

      if (user) {
        handleLoginSuccess(user);
        return user;
      }
      return null;
    } catch (error) {
      console.error("Error getting logged in user:", error);
      return null;
    }
  }

  function handleLogOutClick() {
    setValidUser("");
    setView("products");
    localStorage.removeItem("loggedInUser");
    localStorage.removeItem("cartItems");
    setCartList([]);
    // Reset product quantities to 0
    setList((currentList) => currentList.map((p) => ({ ...p, qty: 0 })));
  }

  function handleAddProduct() {
    console.log("add product clicked");
    setView("addProduct");
    setAdminView("add");
  }

  function handleProductListClick() {
    setAdminProduct("");
    setView("admin");
    setAdminView("add");
  }

  function handleEditProduct(product) {
    setAdminProduct(product);
    setAdminView("edit");
    setView("addProduct");
  }

  function handleDeleteProduct(product) {
    let updatedList = axios.delete(
      `http://localhost:3000/fruits/${product.id}`
    );
    setList((currentList) => currentList.filter((p) => p.id !== product.id));
    setView("admin");
  }

  function handleProductEditFormSubmit(data) {
    // setList((currentList) =>
    //   currentList.map((p) => (p.id === data.id ? data : p))
    // );
    let updatedList = list.map((p) => {
      if (p.id === data.id) {
        return data; //return updated product if edited
      } else {
        return p; //return original product if not edited
      }
    });
    setList(updatedList);
    console.log("data edited by admin", data);
    setView("admin");
  }

  async function handleProductAddFormSubmit() {
    // setList((currentList) => [...currentList, data]);
    // console.log("data added by admin", data);
    let response = await axios.get("http://localhost:3000/fruits");
    let data = response.data;
    setList(data);
    console.log("data added by admin", data);
    setView("admin");
  }

  function handleUpdateCartList(updatedCart) {
    let updatedList = list.map((p) => {
      let cartItem = updatedCart.find((e) => e.id == p.id);
      if (cartItem) {
        return { ...p, qty: cartItem.qty };
      } else {
        return { ...p, qty: 0 }; //return original product if not in cart
      }
    });

    setList(updatedList);
  }

  return (
    <div>
      {view === "addProduct" && (
        <>
          <AddProductForm
            onProductListClick={handleProductListClick}
            adminView={adminView}
            adminProduct={adminProduct}
            onProductEditFormSubmit={handleProductEditFormSubmit}
            onProductAddFormSubmit={handleProductAddFormSubmit}
          />
        </>
      )}
      {view === "admin" && (
        <>
          <Navbar
            cartList={cartList}
            validUser={validUser}
            onViewChange={handleViewChange}
            onLogOutClick={handleLogOutClick}
            view={view}
          />
          <AdminPage
            list={list}
            onAddProduct={handleAddProduct}
            adminView={adminView}
            onEditProduct={handleEditProduct}
            onDeleteProduct={handleDeleteProduct}
          />
        </>
      )}
      {view === "SignUp" && <Signup onLoginClick={handleLoginClick} />}
      {view === "LogIn" && (
        <Login
          onLoginSuccess={handleLoginSuccess}
          onSignUpLoginClick={handleSignUpClick}
        />
      )}

      {view === "products" && view !== "admin" && (
        <div>
          <Navbar
            cartList={cartList}
            validUser={validUser}
            onViewChange={handleViewChange}
            onLogOutClick={handleLogOutClick}
            view={view}
          />
          <ProductsPage
            list={list}
            onAddToCart={handleAddToCart}
            onPlusClick={handlePlusClick}
            onMinusClick={handleMinusClick}
          />
        </div>
      )}

      {view === "cart" && (
        <>
          <Navbar
            cartList={cartList}
            validUser={validUser}
            onViewChange={handleViewChange}
            onLogOutClick={handleLogOutClick}
            view={view}
          />
          <CartProductPage
            cartList={cartList}
            validUser={validUser}
            setCartList={setCartList}
            onCartUpdate={handleUpdateCartList}
          />
        </>
      )}
    </div>
  );
}
