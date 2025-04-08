import React from "react";
import { AdminProduct } from "./AdminProduct";

export function AdminPage(props) {
  let { list } = props;

  function handleAddProduct() {
    props.onAddProduct();
  }

  function handleEditProduct(product) {
    // Handle product edit
    props.onEditProduct(product);
  }
  function handleDeleteProduct(product) {
    // Handle product delete
    props.onDeleteProduct(product);
  }
  return (
    <>
      <div className="container py-4">
        <h6 className="mb-4 text-center">
          <a href="#" onClick={handleAddProduct}>
            Add a Product
          </a>
        </h6>
        <div className="row row-cols-2 row-cols-sm-2 row-cols-md-3 row-cols-lg-4 row-cols-xl-5 g-3">
          {list.map((product) => (
            <div className="col" key={product.id}>
              <AdminProduct
                product={product}
                onEditProduct={handleEditProduct}
                onDeleteProduct={handleDeleteProduct}
              />
            </div>
          ))}
        </div>
      </div>
    </>
  );
}
