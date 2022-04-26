import React, {useEffect, useState} from 'react';
import '../styles/Products.css'
import NavBar from '../components/NavBar';
import API from '../APIs/API';

function Products() {

  const userType = localStorage.getItem("user-type");
  const userId = localStorage.getItem("user-id");
  const userName = localStorage.getItem("user-name");
  var emptyImage = "empty.jpg";

  var initialProduct = {
    id: 0,
    name: "",
    brand: "",
    weight: 0,
    usage_time: 0,
    description: "",
    image: "",
    holder_id: 0,
    category_id: 1,
  }

  var InitialProductSearch = {
    name: "",
    brand: ""
  }

  const [products, setProducts] = useState([]);
  const [displayProducts, setDisplayProducts] = useState([]);
  const [productSearch, setProductSearch] = useState(InitialProductSearch);
  const [categories, setCategories] = useState([]);
  const [product, setProduct] = useState(initialProduct);
  const [uploadedImages, setUploadedImages] = useState({});
  const [action, setAction] = useState("create");

  useEffect(() => {
    new API().getAllProducts().then((data) => {
      setProducts([...data.reverse()]);
      setDisplayProducts([...data]);
    })
    new API().getAllCategories().then((data) => {
      setCategories([...data]);
    })
  }, [product])
  
  const handleChange = (e) => {
    setProduct({...product, [e.target.name]: e.target.value});
  }
  
  const handleFileUpload = (e) => {
    setUploadedImages({...e.target.files});
  }
  
  const handleCreate = (e) => {
    e.preventDefault(); 
    var newProduct = {
      ...product, 
      image: "", 
      holder_id: parseInt(userId),
      category_id: parseInt(product.category_id)
    };
    if(product.name !== ""){
      new API().postProduct(newProduct).then(data => {
        var productId = data.insertId;
        if(productId > 0){
          if(Object.keys(uploadedImages).length > 0){  
            newProduct.id = productId;
            uploadImages(uploadedImages, newProduct);
          }
        }
      });
    }
    setUploadedImages({});
    setProduct(initialProduct);
  }

  const handleEdit = (e) => {
    e.preventDefault();
    var productToUpdate = {
      ...product, 
      holder_id: parseInt(userId),
      category_id: parseInt(product.category_id)
    };
    new API().updateProduct(productToUpdate).then(data => {
      if(Object.keys(uploadedImages).length > 0){ 
        uploadImages(uploadedImages, productToUpdate);
      }
      setAction("create");
    })
    setUploadedImages({});
    setProduct(initialProduct);
  } 

  const uploadImages = (files, productObj) => {
    var formData = new FormData();
    for(var i=0; i<Object.keys(files).length; i++){
      formData.append(`${i}`, files[i]);
    }     
    new API().uploadProductImages(product.id, formData).then(data => {
      var fileNames = [...data];
      var imageCode = fileNames.join(",");
      productObj = {
        ...productObj,
        image: imageCode
      }
      new API().updateProduct(productObj).then(data => {
        console.log(data)
      })
    })
  }

  const handleAction = (e, action, data) => {
    setAction(action);
    if(action == "create"){
      setProduct(initialProduct);
    }
    else if(action == "edit"){
      setProduct({...data});
    }
  }

  const handleDelete = (e) => {
    if (window.confirm("Are you sure you want to delete?")) {
      new API().deleteProduct(product.id).then(data => {});
      handleViewAll();
    }
  }

  const handleSearchChange = (e) => {
    e.preventDefault();
    setProductSearch({...productSearch, [e.target.name]: e.target.value});

    var { name, brand } = productSearch;
    var searchResult = [];
    if(name != "" && brand != ""){
      searchResult = products.filter(p => p.name.toLowerCase().includes(productSearch.name.toLowerCase()) && p.brand.toLowerCase().includes(productSearch.brand.toLowerCase()));
    }
    else if(name != ""){
      searchResult = products.filter(p => p.name.toLowerCase().includes(productSearch.name.toLowerCase()));
    }
    else if(brand != ""){
      searchResult = products.filter(p => p.brand.toLowerCase().includes(productSearch.brand.toLowerCase()));
    }
  
    setDisplayProducts(searchResult);
  }
  
  const handleViewAll = () => {
    setDisplayProducts([...products]);
    setProductSearch(initialProduct);
  }

  return (
    <div>
      <NavBar />
      <div className="products-page">
        {/* <h1>Products</h1> */}
        <div className="container">
          <div className="row products">
            <div className="col-lg-4 product-form">
              <h3>{ action == "edit" ? "Edit the product" : "Create a product"}</h3>
              <form>
                  <hr />
                  <input style={{display: "none"}} readOnly className="form-control" type="text" placeholder="Enter product id" name="id" id="id" value={product.id} onChange={(e)=>handleChange(e)}/>
                  <div className="form-outline mb-2">
                    <label className="form-label" for="name"><b>Name</b></label><br />
                    <input className="form-control" type="text" placeholder="Enter product name" name="name" id="name" value={product.name} required onChange={(e)=>handleChange(e)}/>
                  </div>
                  <div className="form-outline mb-2">
                    <label className="form-label" for="brand"><b>Brand</b></label><br />
                    <input className="form-control" type="text" placeholder="Enter product brand" name="brand" id="brand" value={product.brand} required onChange={(e)=>handleChange(e)}/>
                  </div>
                  <div className='form-outline mb-2'>
                    <label className="form-label" for="category_id"><b>Category</b></label>
                    <select className="form-select" name="category_id" id="category_id" value={product.category_id} required onChange={(e)=>handleChange(e)}>
                      {
                        categories.map(category => {
                          return <option key={category.id} value={category.id}>{category.name}</option>
                        })
                      }  
                    </select>
                  </div>
                  <div className="form-outline mb-2 row">
                    <div className='col'>
                      <label className="form-label" for="weight"><b>Weight (Kg)</b></label><br />
                      <input className="form-control" type="number" placeholder="Enter weight" name="weight" id="weight" value={product.weight} required onChange={(e)=>handleChange(e)}/>
                    </div>
                    <div className='col'>
                      <label className="form-label" for="usage_time"><b>Usage (Year)</b></label><br />
                      <input className="form-control" type="number" placeholder="Enter usage" name="usage_time" id="usage_time" value={product.usage_time} required onChange={(e)=>handleChange(e)}/>
                    </div>
                  </div>
                  <div className="form-outline mb-2">
                    <label className="form-label" for="description"><b>Description</b></label><br />
                    <textarea className="form-control" type="text" placeholder="Enter description" name="description" id="description" value={product.description} required onChange={(e)=>handleChange(e)}/>
                  </div> 
                  <div className="form-outline mb-2">
                    <label className="form-label" for="image"><b>Images</b></label><br />
                    <input type="file" multiple name="image" onChange={(e) => handleFileUpload(e)}/>
                  </div>  

                  {action == "edit" 
                    ? 
                    <div>
                      <button type="submit" className="btn btn-primary btn-block mt-4" onClick={(e) => handleEdit(e)}>Save</button>
                      <button type="submit" className="btn btn-success btn-block mt-4 mx-2" onClick={(e) => handleAction(e, "create")}>Back to Create</button>
                      <button type="submit" className="btn btn-danger btn-block mt-4" onClick={(e) => handleDelete(e)}>Delete</button>
                    </div>
                    : <button type="submit" className="btn btn-success btn-block mt-4" onClick={(e) => handleCreate(e)}>Create</button>
                  }
              </form>
            </div>
            <div className="col-lg-7 product-list">
              <div className="row product-search mb-3">
                <div className='col'>
                  <input className="form-control" type="text" placeholder="Name" name="name" id="name" value={productSearch.name} required onChange={(e)=>handleSearchChange(e)}/>
                </div>
                <div className='col'>
                  <input className="form-control" type="text" placeholder="Brand" name="brand" id="brand" value={productSearch.brand} required onChange={(e)=>handleSearchChange(e)}/>
                </div>
                <div className='col'>
                  {/* <button type="submit" className="btn btn-dark btn-block" onClick={(e) => handleSearch(e)}>Search</button> */}
                  <button type="submit" className="btn btn-light btn-block" onClick={(e) => handleViewAll(e)}>View all</button>
                </div>
              </div>
              <div className="row">
                { displayProducts.map((i) => {
                  return (
                    <div className="col-lg-3 box" key={i.id}>
                      {i.image != "" 
                        ? <img alt='img' className="product-img" src={require(`../../public/uploads/product-images/${i.image.split(',')[0]}`)}/>
                        : <img alt='img' className="product-img" src={require(`../../public/uploads/product-images/${emptyImage}`)}/>
                      }
                      <div className='box-text'>
                        <h4>{i.name}</h4>
                        <h6>{i.brand}</h6>
                        <p>{i.description}</p>
                      </div>
                      <div className='row actions'>
                        <button type="submit" className="col btn btn-light btn-block" onClick={(e) => handleAction(e, "edit", i)}>Edit</button>
                        <button type="submit" className="col btn btn-dark btn-block" onClick={(e) => handleAction(e, "view", i)}>View</button>
                      </div>
                    </div>
                  )
                })}
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default Products;