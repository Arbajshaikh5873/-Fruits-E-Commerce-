import React, { useEffect, useState } from "react";
import { ProductsPage } from "./ProductsPage";
import { Navbar } from "./Navbar";
import { Signup } from "./Signup";
import Login from "./Login";
import { CartProductPage } from "./Card/CartProductPage";
import axios from "axios";
import { AdminPage } from "./Admin/AdminPage";
import AddProductForm from "./Admin/AddProductForm";
import { json } from "server/reply";

export function Ecomm() {
  // let pList = [
  //   {
  //     id: "1",
  //     name: "Grapes",
  //     image: "grapes.jpg",
  //     unit: "kg",
  //     mrp: 120,
  //     discount: 10,
  //     inStock: false,
  //     qty: 0,
  //     type: "Organic",
  //   },
  //   {
  //     id: "2",
  //     name: "Mango",
  //     image: "mango.jpg",
  //     unit: "doz",
  //     mrp: 500,
  //     discount: 8,
  //     inStock: true,
  //     qty: 0,
  //     type: "Organic",
  //   },
  //   {
  //     id: "3",
  //     name: "Banana",
  //     image: "banana.jpg",
  //     unit: "doz",
  //     mrp: 60,
  //     discount: 0,
  //     inStock: true,
  //     qty: 0,
  //     type: "Non-Organic",
  //   },
  //   {
  //     id: "4",
  //     name: "Apple",
  //     image: "apple.jpg",
  //     unit: "kg",
  //     mrp: 180,
  //     discount: 7,
  //     inStock: true,
  //     qty: 0,
  //     type: "Non-Organic",
  //   },
  //   {
  //     id: "5",
  //     name: "Anjeer",
  //     image: "anjeer.jpg",
  //     unit: "kg",
  //     mrp: 100,
  //     discount: 0,
  //     inStock: true,
  //     qty: 0,
  //     type: "Organic",
  //   },
  //   {
  //     id: "6",
  //     name: "Strawberry",
  //     image: "strawberry.jpg",
  //     unit: "kg",
  //     mrp: 200,
  //     discount: 20,
  //     inStock: true,
  //     qty: 0,
  //     type: "Non-Organic",
  //   },
  //   {
  //     id: "7",
  //     name: "Papaya",
  //     image: "papaya.jpg",
  //     unit: "kg",
  //     mrp: 50,
  //     discount: 15,
  //     inStock: true,
  //     qty: 0,
  //     type: "Organic",
  //   },
  //   {
  //     id: "8",
  //     name: "Cherry",
  //     image: "cherry.jpg",
  //     unit: "kg",
  //     mrp: 300,
  //     discount: 5,
  //     inStock: true,
  //     qty: 0,
  //     type: "Non-Organic",
  //   },
  //   {
  //     id: "9",
  //     name: "Chikoo",
  //     image: "Chikoo.jpg",
  //     unit: "kg",
  //     mrp: 60,
  //     discount: 5,
  //     inStock: false,
  //     qty: 0,
  //     type: "Organic",
  //   },
  //   {
  //     id: "10",
  //     name: "Kiwi",
  //     image: "Kiwi.jpg",
  //     unit: "piece",
  //     mrp: 20,
  //     discount: 0,
  //     inStock: false,
  //     qty: 0,
  //     type: "Non-Organic",
  //   },
  //   {
  //     id: "11",
  //     name: "Orange",
  //     image: "orange.jpg",
  //     unit: "kg",
  //     mrp: 200,
  //     discount: 10,
  //     inStock: true,
  //     qty: 0,
  //     type: "Non-Organic",
  //   },
  //   {
  //     id: "12",
  //     name: "Pear",
  //     image: "pear.jpg",
  //     unit: "kg",
  //     mrp: 200,
  //     discount: 7,
  //     inStock: true,
  //     qty: 0,
  //     type: "Non-Organic",
  //   },
  //   {
  //     id: "13",
  //     name: "Pineapple",
  //     image: "pineapple.jpg",
  //     unit: "piece",
  //     mrp: 100,
  //     discount: 50,
  //     inStock: true,
  //     qty: 0,
  //     type: "Non-Organic",
  //   },
  //   {
  //     id: "14",
  //     name: "Pomegranete",
  //     image: "pomegranete.jpg",
  //     unit: "kg",
  //     mrp: 200,
  //     discount: 5,
  //     inStock: true,
  //     qty: 0,
  //     type: "Non-Organic",
  //   },
  //   {
  //     id: "15",
  //     name: "Sitaphal",
  //     image: "sitaphal.jpg",
  //     unit: "kg",
  //     mrp: 100,
  //     discount: 10,
  //     inStock: true,
  //     qty: 0,
  //     type: "Organic",
  //   },
  //   {
  //     id: "16",
  //     name: "Watermelon",
  //     image: "watermelon.jpg",
  //     unit: "piece",
  //     mrp: 80,
  //     discount: 50,
  //     inStock: true,
  //     qty: 0,
  //     type: "Organic",
  //   },
  //   {
  //     id: "17",
  //     name: "Sweetlime",
  //     image: "sweetlime.jpg",
  //     unit: "kg",
  //     mrp: 200,
  //     discount: 5,
  //     inStock: true,
  //     qty: 0,
  //     type: "Non-Organic",
  //   },
  //   {
  //     id: "18",
  //     name: "Peach",
  //     image: "peach.jpg",
  //     unit: "kg",
  //     mrp: 200,
  //     discount: 10,
  //     inStock: false,
  //     qty: 0,
  //     type: "Non-Organic",
  //   },
  //   {
  //     id: "19",
  //     name: "Dragon",
  //     image: "dragon.jpg",
  //     unit: "piece",
  //     mrp: 60,
  //     discount: 0,
  //     inStock: true,
  //     qty: 0,
  //     type: "Non-Organic",
  //   },
  // ];
  let [list, setList] = useState([]);
  let [view, setView] = useState("products");
  let [validUser, setValidUser] = useState("");
  let [adminView, setAdminView] = useState("");
  let [adminProduct, setAdminProduct] = useState("");
  let [cartList, setCartList] = useState([]);

  useEffect(() => {
    console.log("getting data from server");
    getDataFromServer();
    getLoggedInUser();
    getCartItems();
  }, []);

  async function getDataFromServer() {
    try {
      let response = await axios.get("http://localhost:3000/fruits");
      console.log(response.data);
      let data = await response.data;
      setList(data);
    } catch (error) {
      console.log(error);
    }
  }

  function saveCartItems(cartList) {
    let cartData = JSON.stringify(cartList);
    localStorage.setItem("cartItems", cartData);
  }

  function getCartItems() {
    let cartData = localStorage.getItem("cartItems");
    let cartItems = JSON.parse(cartData);
    if (cartItems) {
      setCartList(cartItems);
    }
    let temp = list.map((p) => {
      let tempCart = cartItems.find((e) => e.id === p.id);
      if (tempCart) {
        p.qty = tempCart.qty;
      }
      return p;
    });

    setList(temp);
  }

  function handleAddToCart(product) {
    let updatedList = list.map((p) => {
      if (p.id === product.id) {
        p.qty = 1;
        let temp = [...cartList, p];
        setCartList(temp);
        saveCartItems(temp);
      }
      return p;
    });
    setList(updatedList);
  }

  function handlePlusClick(product) {
    let updatedList = list.map((p) => {
      if (p.id === product.id) {
        p.qty = p.qty + 1;
      }
      return p;
    });
    setList(updatedList);
  }

  function handleMinusClick(product) {
    let updatedList = list.map((p) => {
      if (p.id === product.id) {
        p.qty = p.qty - 1;
        if (p.qty == 0) {
          let temp = cartList.filter((e) => e.id !== product.id);
          setCartList(temp);
        }
      }
      return p;
    });
    setList(updatedList);
  }

  function handleViewChange(view) {
    console.log(`View changed to ${view}`);
    setView(view);
  }
  function handleLoginClick(view) {
    console.log(`View changed to ${view}`);
    setView(view);
  }

  function handleLoginSuccess(user) {
    if (user.role == "admin") {
      setView("admin");
    } else {
      setView("products");
    }
    setValidUser(user);
    storeUserLogin(user);
    console.log("printing valid user in ecomm", user.role);
  }

  function storeUserLogin(user) {
    let userDate = JSON.stringify(user);

    localStorage.setItem("loggedInUser", userDate);
  }

  async function getLoggedInUser() {
    let user = localStorage.getItem("loggedInUser");
    let userData = await JSON.parse(user);
    console.log("user data fetched from the local server", userData);
    if (userData) {
      handleLoginSuccess(userData);
    }
  }

  function handleLogOutClick() {
    setValidUser("");
    setView("products");
    localStorage.removeItem("loggedInUser");
    localStorage.removeItem("cartItems");
    setCartList([]);
  }

  function handleAddProduct() {
    console.log("add product clicked");
    setView("addProduct");
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
    let temp = list.filter((p) => p.id !== product.id);
    setList(temp);
    setView("admin");
  }
  function handleProductEditFormSubmit(data) {
    let temp = list.map((p) => {
      if ( p.id === data.id ) {
        return data;
      } else {
        return p;
      }
    });
    console.log("data edited by admin", data);

    setList(temp);
    setView("admin");
  }
  function handleProductAddFormSubmit(data) {
    let temp = [...list, data];
    console.log("data aadded by admin", data);

    setList(temp);
    setView("admin");
  }
  return (
    <div>
      {view === "addProduct" && (
        <>
          <AddProductForm
            onProductListClick={handleProductListClick}
            adminView={adminView} // Fix: Pass adminView to AddProductForm
            adminProduct={adminProduct} // Fix: Pass adminProduct to AddProductForm
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
      {view === "LogIn" && <Login onLoginSuccess={handleLoginSuccess} />}

      {view === "products" && view != "admin" && (
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
          {" "}
          <Navbar
            cartList={cartList}
            validUser={validUser}
            onViewChange={handleViewChange}
            onLogOutClick={handleLogOutClick}
            view={view}
          />
          <CartProductPage cartList={cartList} validUser={validUser} />
        </>
      )}
    </div>
  );
}
