// import axios from "axios";
// import { useEffect, useState } from "react";
// import { BeatLoader } from "react-spinners";
// import fieldValidate from "./FormValidation";

// function AddProductForm(props) {
//   // Default empty product object
//   const emptyProduct = {
//     name: "",
//     mrp: "",
//     discount: "",
//   };

//   // State variables
//   const [product, setProduct] = useState(emptyProduct); // Current product data
//   const [flagLoader, setFlagLoader] = useState(false); // Loading state for API calls
//   const [flagFormInvalid, setFlagFormInvalid] = useState(false); // Form validation state

//   // Extract props for better readability
//   const { adminView, onProductListClick } = props;

//   // Validation rules and error messages for each field
//   const [errorProduct, setErrorProduct] = useState({
//     name: { message: "", mxLen: 80, mnLen: 3, onlyDigits: false },
//     mrp: { message: "", mxLen: 6, mnLen: 1, onlyDigits: true },
//     discount: { message: "", mxLen: 6, mnLen: 1, onlyDigits: true },
//   });

//   // Initialize form based on whether we're adding or editing
//   useEffect(() => {
//     if (adminView === "edit") {
//       setProduct(props.adminProduct); // Use the provided product for editing
//     } else if (adminView === "add") {
//       setProduct(emptyProduct); // Use empty product for adding new
//     }
//   }, []);

//   // Handle click on product list link
//   function handleProductListClick() {
//     onProductListClick();
//   }

//   // Handle input changes in form fields
//   function handleTextChange(event) {
//     const name = event.target.name;

//     // Update product state with new value
//     setProduct({ ...product, [name]: event.target.value });

//     // Validate the field and update error state
//     const message = fieldValidate(event, errorProduct);
//     const errProduct = { ...errorProduct };
//     errProduct[name].message = message;
//     setErrorProduct(errProduct);

//     // Check if the form has any errors
//     checkAllErrors(errProduct);
//   }

//   // Validate field when user leaves it
//   function handleBlur(event) {
//     const name = event.target.name;

//     // Fix: Use errorProduct instead of errorClientSheet
//     const message = fieldValidate(event, errorProduct);
//     const errProduct = { ...errorProduct };
//     errProduct[name].message = message;
//     setErrorProduct(errProduct);

//     // Check if the form has any errors
//     checkAllErrors(errProduct);
//   }

//   // Check if any field has validation errors
//   function checkAllErrors(errProduct) {
//     for (let field in errProduct) {
//       if (errProduct[field].message !== "") {
//         setFlagFormInvalid(true);
//         return;
//       }
//     }
//     setFlagFormInvalid(false);
//   }

//   // Handle form submission
//   function handleProductAddEditFormSubmit(event) {
//     event.preventDefault();

//     if (adminView === "edit") {
//       updateBackendProduct(product);
//     } else if (adminView === "add") {
//       addToBackendProduct(product);
//     }
//   }

//   // Update existing product in backend
//   async function updateBackendProduct(product) {
//     try {
//       setFlagLoader(true);
//       await axios.put(`http://localhost:3000/fruits/${product.id}`, product);
//       props.onProductEditFormSubmit(product);
//     } catch (error) {
//       console.error("Error updating product:", error);
//       alert("Failed to update product. Please try again.");
//     } finally {
//       setFlagLoader(false);
//     }
//   }

//   // Add new product to backend
//   async function addToBackendProduct(product) {
//     try {
//       setFlagLoader(true);
//       const response = await axios.post(
//         "http://localhost:3000/fruits",
//         product
//       );
//       const data = response.data;
//       props.onProductAddFormSubmit(data); // Pass back the new product with ID
//     } catch (error) {
//       console.error("Error adding product:", error);
//       alert("Failed to add product. Please try again.");
//     } finally {
//       setFlagLoader(false);
//     }
//   }

//   // Show loading spinner during API calls
//   if (flagLoader) {
//     return (
//       <div className="d-flex justify-content-center my-5">
//         <BeatLoader size={24} color={"red"} />
//       </div>
//     );
//   }

//   return (
//     <div className="container mt-4">
//       {/* Navigation link to return to product list */}
//       <div className="text-center mb-3">
//         <button
//           className="btn btn-outline-secondary"
//           onClick={handleProductListClick}
//         >
//           <i className="bi bi-arrow-left me-2"></i>Back to Product List
//         </button>
//       </div>

//       {/* Form header showing mode (add or edit) */}
//       <div className="card shadow-sm border-danger mb-4">
//         <div className="card-header bg-danger text-white">
//           <h4 className="mb-0">
//             {adminView === "edit" ? (
//               <>
//                 Edit Product: <span className="fw-bold">{product.name}</span>
//               </>
//             ) : (
//               <>Add New Product</>
//             )}
//           </h4>
//         </div>

//         {/* Product form */}
//         <div className="card-body">
//           <form onSubmit={handleProductAddEditFormSubmit}>
//             <div className="row mb-3">
//               <label
//                 htmlFor="name"
//                 className="col-sm-3 col-form-label text-sm-end"
//               >
//                 Product Name:
//               </label>
//               <div className="col-sm-9">
//                 <input
//                   type="text"
//                   className="form-control"
//                   id="name"
//                   name="name"
//                   value={product.name}
//                   onChange={handleTextChange}
//                   onBlur={handleBlur}
//                   required
//                   placeholder="Enter product name"
//                 />
//                 {errorProduct.name.message && (
//                   <div className="text-danger small mt-1">
//                     {errorProduct.name.message}
//                   </div>
//                 )}
//               </div>
//             </div>

//             <div className="row mb-3">
//               <label
//                 htmlFor="mrp"
//                 className="col-sm-3 col-form-label text-sm-end"
//               >
//                 MRP (₹):
//               </label>
//               <div className="col-sm-9">
//                 <input
//                   type="text"
//                   className="form-control"
//                   id="mrp"
//                   name="mrp"
//                   value={product.mrp}
//                   onChange={handleTextChange}
//                   onBlur={handleBlur}
//                   required
//                   placeholder="Enter MRP"
//                 />
//                 {errorProduct.mrp.message && (
//                   <div className="text-danger small mt-1">
//                     {errorProduct.mrp.message}
//                   </div>
//                 )}
//               </div>
//             </div>

//             <div className="row mb-3">
//               <label
//                 htmlFor="discount"
//                 className="col-sm-3 col-form-label text-sm-end"
//               >
//                 Discount (%):
//               </label>
//               <div className="col-sm-9">
//                 <input
//                   type="text"
//                   className="form-control"
//                   id="discount"
//                   name="discount"
//                   value={product.discount}
//                   onChange={handleTextChange}
//                   onBlur={handleBlur}
//                   required
//                   placeholder="Enter discount percentage"
//                 />
//                 {errorProduct.discount.message && (
//                   <div className="text-danger small mt-1">
//                     {errorProduct.discount.message}
//                   </div>
//                 )}
//               </div>
//             </div>

//             {/* Form action buttons */}
//             <div className="row mt-4">
//               <div className="offset-sm-3 col-sm-9">
//                 <button
//                   type="submit"
//                   className="btn btn-danger me-2"
//                   disabled={flagFormInvalid}
//                 >
//                   <i className="bi bi-save me-1"></i>
//                   {adminView === "edit" ? "Update Product" : "Add Product"}
//                 </button>
//                 <button
//                   type="button"
//                   className="btn btn-outline-secondary"
//                   onClick={handleProductListClick}
//                 >
//                   Cancel
//                 </button>
//               </div>
//             </div>
//           </form>
//         </div>
//       </div>
//     </div>
//   );
// }

// export default AddProductForm;

import axios from "axios";
import { useEffect, useState } from "react";
import { BeatLoader } from "react-spinners";
import fieldValidate from "./FormValidation";

function AddProductForm(props) {
  // Default empty product object with new fields
  const emptyProduct = {
    name: "",
    image: "",
    unit: "kg", // Default unit
    mrp: "",
    discount: "",
    inStock: false,
    qty: 0,
    type: "Organic", // Default type
  };

  // State variables
  const [product, setProduct] = useState(emptyProduct); // Current product data
  const [flagLoader, setFlagLoader] = useState(false); // Loading state for API calls
  const [flagFormInvalid, setFlagFormInvalid] = useState(false); // Form validation state

  // Extract props for better readability
  const { adminView, onProductListClick } = props;

  // Validation rules and error messages for each field
  const [errorProduct, setErrorProduct] = useState({
    name: { message: "", mxLen: 80, mnLen: 3, onlyDigits: false },
    image: { message: "", mxLen: 200, mnLen: 3, onlyDigits: false },
    unit: { message: "", mxLen: 10, mnLen: 1, onlyDigits: false },
    mrp: { message: "", mxLen: 6, mnLen: 1, onlyDigits: true },
    discount: { message: "", mxLen: 6, mnLen: 1, onlyDigits: true },
    qty: { message: "", mxLen: 6, mnLen: 0, onlyDigits: true },
    type: { message: "", mxLen: 20, mnLen: 3, onlyDigits: false },
  });

  // Initialize form based on whether we're adding or editing
  useEffect(() => {
    if (adminView === "edit") {
      setProduct(props.adminProduct); // Use the provided product for editing
    } else if (adminView === "add") {
      setProduct(emptyProduct); // Use empty product for adding new
    }
  }, []);

  // Handle click on product list link
  function handleProductListClick() {
    onProductListClick();
  }

  // Handle input changes in form fields
  function handleTextChange(event) {
    const name = event.target.name;
    const value =
      event.target.type === "checkbox"
        ? event.target.checked
        : event.target.value;

    // Update product state with new value
    setProduct({ ...product, [name]: value });

    // Skip validation for checkbox fields
    if (event.target.type === "checkbox") return;

    // Validate the field and update error state
    const message = fieldValidate(event, errorProduct);
    const errProduct = { ...errorProduct };
    errProduct[name].message = message;
    setErrorProduct(errProduct);

    // Check if the form has any errors
    checkAllErrors(errProduct);
  }

  // Validate field when user leaves it
  function handleBlur(event) {
    const name = event.target.name;

    // Skip validation for checkbox fields
    if (event.target.type === "checkbox") return;

    const message = fieldValidate(event, errorProduct);
    const errProduct = { ...errorProduct };
    errProduct[name].message = message;
    setErrorProduct(errProduct);

    // Check if the form has any errors
    checkAllErrors(errProduct);
  }

  // Check if any field has validation errors
  function checkAllErrors(errProduct) {
    for (let field in errProduct) {
      if (errProduct[field].message !== "") {
        setFlagFormInvalid(true);
        return;
      }
    }
    setFlagFormInvalid(false);
  }

  // Handle form submission
  function handleProductAddEditFormSubmit(event) {
    event.preventDefault();

    if (adminView === "edit") {
      updateBackendProduct(product);
    } else if (adminView === "add") {
      addToBackendProduct(product);
    }
  }

  // Update existing product in backend
  async function updateBackendProduct(product) {
    try {
      setFlagLoader(true);
      await axios.put(`http://localhost:3000/fruits/${product.id}`, product);
      props.onProductEditFormSubmit(product);
    } catch (error) {
      console.error("Error updating product:", error);
      alert("Failed to update product. Please try again.");
    } finally {
      setFlagLoader(false);
    }
  }

  // Add new product to backend
  async function addToBackendProduct(product) {
    try {
      setFlagLoader(true);
      const response = await axios.post(
        "http://localhost:3000/fruits",
        product
      );
      const data = response.data;
      props.onProductAddFormSubmit(data); // Pass back the new product with ID
    } catch (error) {
      console.error("Error adding product:", error);
      alert("Failed to add product. Please try again.");
    } finally {
      setFlagLoader(false);
    }
  }

  // Show loading spinner during API calls
  if (flagLoader) {
    return (
      <div className="d-flex justify-content-center my-5">
        <BeatLoader size={24} color={"red"} />
      </div>
    );
  }

  return (
    <div className="container mt-4">
      {/* Navigation link to return to product list */}
      <div className="text-center mb-3">
        <button
          className="btn btn-outline-secondary"
          onClick={handleProductListClick}
        >
          <i className="bi bi-arrow-left me-2"></i>Back to Product List
        </button>
      </div>

      {/* Form header showing mode (add or edit) */}
      <div className="card shadow-sm border-danger mb-4">
        <div className="card-header bg-danger text-white">
          <h4 className="mb-0">
            {adminView === "edit" ? (
              <>
                Edit Product: <span className="fw-bold">{product.name}</span>
              </>
            ) : (
              <>Add New Product</>
            )}
          </h4>
        </div>

        {/* Product form */}
        <div className="card-body">
          <form onSubmit={handleProductAddEditFormSubmit}>
            <div className="row mb-3">
              <label
                htmlFor="name"
                className="col-sm-3 col-form-label text-sm-end"
              >
                Product Name:
              </label>
              <div className="col-sm-9">
                <input
                  type="text"
                  className="form-control"
                  id="name"
                  name="name"
                  value={product.name}
                  onChange={handleTextChange}
                  onBlur={handleBlur}
                  required
                  placeholder="Enter product name"
                />
                {errorProduct.name.message && (
                  <div className="text-danger small mt-1">
                    {errorProduct.name.message}
                  </div>
                )}
              </div>
            </div>

            <div className="row mb-3">
              <label
                htmlFor="image"
                className="col-sm-3 col-form-label text-sm-end"
              >
                Image:
              </label>
              <div className="col-sm-9">
                <input
                  type="text"
                  className="form-control"
                  id="image"
                  name="image"
                  value={product.image}
                  onChange={handleTextChange}
                  onBlur={handleBlur}
                  required
                  placeholder="Enter image filename (e.g., grapes.jpg)"
                />
                {errorProduct.image.message && (
                  <div className="text-danger small mt-1">
                    {errorProduct.image.message}
                  </div>
                )}
              </div>
            </div>

            <div className="row mb-3">
              <label
                htmlFor="unit"
                className="col-sm-3 col-form-label text-sm-end"
              >
                Unit:
              </label>
              <div className="col-sm-9">
                <select
                  className="form-select"
                  id="unit"
                  name="unit"
                  value={product.unit}
                  onChange={handleTextChange}
                  required
                >
                  <option value="kg">kg</option>
                  <option value="g">g</option>
                  <option value="pcs">pcs</option>
                  <option value="dozen">dozen</option>
                </select>
              </div>
            </div>

            <div className="row mb-3">
              <label
                htmlFor="mrp"
                className="col-sm-3 col-form-label text-sm-end"
              >
                MRP (₹):
              </label>
              <div className="col-sm-9">
                <input
                  type="text"
                  className="form-control"
                  id="mrp"
                  name="mrp"
                  value={product.mrp}
                  onChange={handleTextChange}
                  onBlur={handleBlur}
                  required
                  placeholder="Enter MRP"
                />
                {errorProduct.mrp.message && (
                  <div className="text-danger small mt-1">
                    {errorProduct.mrp.message}
                  </div>
                )}
              </div>
            </div>

            <div className="row mb-3">
              <label
                htmlFor="discount"
                className="col-sm-3 col-form-label text-sm-end"
              >
                Discount (%):
              </label>
              <div className="col-sm-9">
                <input
                  type="text"
                  className="form-control"
                  id="discount"
                  name="discount"
                  value={product.discount}
                  onChange={handleTextChange}
                  onBlur={handleBlur}
                  required
                  placeholder="Enter discount percentage"
                />
                {errorProduct.discount.message && (
                  <div className="text-danger small mt-1">
                    {errorProduct.discount.message}
                  </div>
                )}
              </div>
            </div>

            <div className="row mb-3">
              <div className="col-sm-9 offset-sm-3">
                <div className="form-check">
                  <input
                    type="checkbox"
                    className="form-check-input"
                    id="inStock"
                    name="inStock"
                    checked={product.inStock}
                    onChange={handleTextChange}
                  />
                  <label className="form-check-label" htmlFor="inStock">
                    In Stock
                  </label>
                </div>
              </div>
            </div>

            <div className="row mb-3">
              <label
                htmlFor="qty"
                className="col-sm-3 col-form-label text-sm-end"
              >
                Quantity:
              </label>
              <div className="col-sm-9">
                <input
                  type="number"
                  className="form-control"
                  id="qty"
                  name="qty"
                  value={product.qty}
                  onChange={handleTextChange}
                  onBlur={handleBlur}
                  min="0"
                  required
                  placeholder="Enter quantity"
                />
                {errorProduct.qty.message && (
                  <div className="text-danger small mt-1">
                    {errorProduct.qty.message}
                  </div>
                )}
              </div>
            </div>

            <div className="row mb-3">
              <label
                htmlFor="type"
                className="col-sm-3 col-form-label text-sm-end"
              >
                Type:
              </label>
              <div className="col-sm-9">
                <select
                  className="form-select"
                  id="type"
                  name="type"
                  value={product.type}
                  onChange={handleTextChange}
                  required
                >
                  <option value="Organic">Organic</option>
                  <option value="Regular">Regular</option>
                  <option value="Premium">Premium</option>
                </select>
              </div>
            </div>

            {/* Form action buttons */}
            <div className="row mt-4">
              <div className="offset-sm-3 col-sm-9">
                <button
                  type="submit"
                  className="btn btn-danger me-2"
                  disabled={flagFormInvalid}
                >
                  <i className="bi bi-save me-1"></i>
                  {adminView === "edit" ? "Update Product" : "Add Product"}
                </button>
                <button
                  type="button"
                  className="btn btn-outline-secondary"
                  onClick={handleProductListClick}
                >
                  Cancel
                </button>
              </div>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
}

export default AddProductForm;
