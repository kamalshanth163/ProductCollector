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
    brand: "",
    minWeight: 0,
    maxWeight: 0,
    minUsage: 0,
    maxUsage: 0,
    category_id: 0,
    holder_id: 0,
  }

  const [products, setProducts] = useState([]);
  const [displayProducts, setDisplayProducts] = useState([]);
  const [productSearch, setProductSearch] = useState(InitialProductSearch);
  const [categories, setCategories] = useState([]);
  const [product, setProduct] = useState(initialProduct);
  const [uploadedImages, setUploadedImages] = useState({});
  const [action, setAction] = useState("create");
  const [showForm, setShowForm] = useState(userType == "holder" ? true : false);
  const [holders, setHolders] = useState([]);

  useEffect(() => {
    new API().getAllProducts().then((data) => {
      if(userType == "collector"){
        setProducts([...data.reverse()]);
        setDisplayProducts([...data.reverse()]);
      } 
      else if (userType == "holder"){
        var holderProducts = data.filter(x => x.holder_id == userId*1);
        setProducts([...holderProducts.reverse()]);
        setDisplayProducts([...holderProducts.reverse()]);
      }
    })
    new API().getAllCategories().then((data) => {
      setCategories([...data]);
    })

    if(userType == "collector"){
      new API().getAllHolders().then((data) => {
        setHolders([...data]);
      })
    }
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
      setShowForm(true);
    }
  }

  const handleDelete = (e) => {
    if (window.confirm("Are you sure you want to delete?")) {
      new API().deleteProduct(product.id).then(data => {});
    }
    handleViewAll();
  }

  const handleSearchChange = (e) => {
    e.preventDefault();
    setProductSearch({...productSearch, [e.target.name]: e.target.value});
  }
  
  const handleReset = () => {
    setProductSearch(InitialProductSearch);
  }

  const handleViewAll = () => {
    setDisplayProducts([...products]);
  }

  const handleSearch = () => {
    var { name, brand, minWeight, maxWeight, minUsage, maxUsage, category_id, holder_id } = productSearch;
    var searchResult = [];

    
    if(name !== ""){
      searchResult = products.filter(p => p.name.toLowerCase().includes(productSearch.name.toLowerCase()));
    }
    if(brand !== ""){
      searchResult = products.filter(p => p.brand.toLowerCase().includes(productSearch.brand.toLowerCase()));
    } 
      
    if(category_id == 0){
      searchResult = searchResult;
    }
    if(holder_id == 0){
      searchResult = searchResult;
    }

    if(category_id > 0){
      searchResult = products.filter(p => p.category_id*1 == productSearch.category_id*1);
    }

    if(holder_id > 0){
      searchResult = products.filter(p => p.holder_id*1 == productSearch.holder_id*1);
    }

    if(minWeight > 0){
      searchResult = products.filter(p => p.weight >= productSearch.minWeight);
    }   
    if(maxWeight > 0){
      searchResult = products.filter(p => p.weight <= productSearch.maxWeight);
    }

    if (minUsage > 0){
      searchResult = products.filter(p => p.usage_time >= productSearch.minUsage);
    } 
    if(maxUsage > 0){
      searchResult = products.filter(p => p.usage_time <= productSearch.maxUsage);
    }
  
    setDisplayProducts(searchResult);
  }

  return (
    <div>
      <NavBar />
      <div className="products-page">
        <div className="container mt-4">
          {userType == "holder"
           ? 
            <div>
              <button type="submit" className="btn btn-dark btn-block" onClick={(e) => setShowForm(!showForm)}>{showForm ? "<< Hide product form" : ">> Show product form"}</button><hr />
            </div>
           : ""
          }
          <div className="row products">
            <div style={{display: showForm ? 'block' : "none"}} className="col-lg-4 product-form">
              <h3>{ action == "edit" ? "Edit the product" : "Create a product"}</h3>
              <form>
                  <hr />
                  <input style={{display: "none"}} readOnly className="form-control" type="text" placeholder="Enter product id" name="id" id="id" value={product.id} onChange={(e)=>handleChange(e)}/>
                  <div className="form-outline mb-2">
                    <label className="form-label" for="name"><b>Name</b></label><br />
                    <input className="form-control" type="text" placeholder="Enter product name" name="name" id="name" value={product.name} onChange={(e)=>handleChange(e)}/>
                  </div>
                  <div className="form-outline mb-2">
                    <label className="form-label" for="brand"><b>Brand</b></label><br />
                    <input className="form-control" type="text" placeholder="Enter product brand" name="brand" id="brand" value={product.brand} onChange={(e)=>handleChange(e)}/>
                  </div>
                  <div className='form-outline mb-2'>
                    <label className="form-label" for="category_id"><b>Category</b></label>
                    <select className="form-select" name="category_id" id="category_id" value={product.category_id} onChange={(e)=>handleChange(e)}>
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
                      <input className="form-control" type="number" placeholder="Enter weight" name="weight" id="weight" value={product.weight} onChange={(e)=>handleChange(e)}/>
                    </div>
                    <div className='col'>
                      <label className="form-label" for="usage_time"><b>Usage (Year)</b></label><br />
                      <input className="form-control" type="number" placeholder="Enter usage" name="usage_time" id="usage_time" value={product.usage_time} onChange={(e)=>handleChange(e)}/>
                    </div>
                  </div>
                  <div className="form-outline mb-2">
                    <label className="form-label" for="description"><b>Description</b></label><br />
                    <textarea className="form-control" type="text" placeholder="Enter description" name="description" id="description" value={product.description} onChange={(e)=>handleChange(e)}/>
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
            
            <div className={showForm ? "col-lg-7 product-list" :  "col-lg-12 product-list"}>
              <div className="row product-search mb-3">
                <div className='row mb-2'>
                  <div className='col'>
                    <label className="form-label label-small" for="name"><b>Product Name</b></label>
                    <input className="form-control" type="text" placeholder="Name" name="name" id="name" value={productSearch.name} onChange={(e)=>handleSearchChange(e)}/>
                  </div>
                  <div className='col'>
                    <label className="form-label label-small" for="brand"><b>Brand</b></label>
                    <input className="form-control" type="text" placeholder="Brand" name="brand" id="brand" value={productSearch.brand} onChange={(e)=>handleSearchChange(e)}/>
                  </div>
                  <div className='col'>
                    <label className="form-label label-small" for="category_id"><b>Category</b></label>
                    <select className="form-select" name="category_id" id="category_id" value={productSearch.category_id} onChange={(e)=>handleSearchChange(e)}>
                      <option key={0} value={0}>All</option>
                      {
                        categories.map(category => {
                          return <option key={category.id} value={category.id}>{category.name}</option>
                        })
                      }  
                    </select>
                  </div>
                  <div className='col'>
                    <label className="form-label label-small" for="holder_id"><b>Product Holder</b></label>
                    <select className="form-select" name="holder_id" id="holder_id" value={productSearch.holder_id} onChange={(e)=>handleSearchChange(e)}>
                      <option key={0} value={0}>All</option>
                      {
                        holders.map(holder => {
                          return <option key={holder.id} value={holder.id}>{holder.name}</option>
                        })
                      }  
                    </select>
                  </div>
                </div>
                <div className='row'>
                  <div className='col'>
                    <div className='row'>
                      <div className='col'>
                        <label className="form-label label-small" for="minWeight"><b>Min Weight (Kg)</b></label><br />
                        <input className="form-control" type="number" placeholder="Min" name="minWeight" id="minWeight" value={productSearch.minWeight} required onChange={(e)=>handleSearchChange(e)}/>
                      </div>
                      <div className='col'>
                        <label className="form-label label-small" for="maxWeight"><b>Max Weight (Kg)</b></label><br />
                        <input className="form-control" type="number" placeholder="Max" name="maxWeight" id="maxWeight" value={productSearch.maxWeight} required onChange={(e)=>handleSearchChange(e)}/>
                      </div>
                    </div>
                  </div>
                  <div className='col'>
                    <div className='row'>
                      <div className='col'>
                        <label className="form-label label-small" for="minUsage"><b>Min Usage (Year)</b></label><br />
                        <input className="form-control" type="number" placeholder="Min" name="minUsage" id="minUsage" value={productSearch.minUsage} required onChange={(e)=>handleSearchChange(e)}/>
                      </div>
                      <div className='col'>
                        <label className="form-label label-small" for="maxUsage"><b>Max Usage (Year)</b></label><br />
                        <input className="form-control" type="number" placeholder="Max" name="maxUsage" id="maxUsage" value={productSearch.maxUsage} required onChange={(e)=>handleSearchChange(e)}/>
                      </div>
                    </div>
                  </div>
                </div>
                <div className='col search-buttons'>
                  <button type="submit" className="btn btn-primary btn-block mt-4" onClick={(e) => handleSearch(e)}>Search</button>
                  <button type="submit" className="btn btn-light btn-block mt-4 mx-2" onClick={(e) => handleViewAll(e)}>View all</button>
                  <button type="submit" className="btn btn-light btn-block mt-4" onClick={(e) => handleReset(e)}>Reset</button>
                </div>
              </div>
              <hr />
              <div className="row">
                { displayProducts.map((i) => {
                  return (
                    <div className="col-lg-3 box" key={i.id}>
                      {i.image !== "" 
                        ? <img alt='img' className="product-img" src={require(`../../public/uploads/product-images/${i.image.split(',')[0]}`)}/>
                        : <img alt='img' className="product-img" src={require(`../../public/uploads/product-images/${emptyImage}`)}/>
                      }
                      <div className='box-text'>
                        <h4>{i.name}</h4>
                        <h6>{i.brand}</h6>
                        <p>{i.description}</p>
                      </div>
                      <div className='row actions'>
                        { userType == "holder" 
                          ? <button type="submit" className="col btn btn-light btn-block" onClick={(e) => handleAction(e, "edit", i)}>Edit</button>
                          : ""
                        }
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