import React, {useEffect, useState} from 'react';
import '../styles/Products.css'
import NavBar from '../components/NavBar';
import API from '../APIs/API';

function Products() {

  const userType = localStorage.getItem("user-type");
  const userId = localStorage.getItem("user-id");
  const userName = localStorage.getItem("user-name");

  var initialProduct = {
    id: 0,
    name: "",
    brand: "",
    weight: 0,
    usage_time: "",
    description: "",
    image: "",
    holder_id: 0,
    category_id: 1,
  }

  const [products, setProducts] = useState([]);
  const [categories, setCategories] = useState([]);
  const [product, setProduct] = useState(initialProduct);
  const [uploadedImages, setUploadedImages] = useState({});
  const [action, setAction] = useState("create");

  useEffect(() => {
    new API().getAllProducts().then((data) => {
      setProducts([...data]);
    })
    new API().getAllCategories().then((data) => {
      setCategories([...data]);
    })
  }, [])
  
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
            console.log(uploadedImages)
            uploadImages(uploadedImages, newProduct);
          }
        }
      });
    }
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
      console.log(uploadedImages);
      if(Object.keys(uploadedImages).length > 0){ 
        uploadImages(uploadedImages, productToUpdate);
      }
    })
    setAction("create");
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

  const handleSearch = (e) => {

  }

  return (
    <div>
      <NavBar />
      <div className="products-page">
        <h1>Products</h1>
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
                      <button type="submit" class="btn btn-primary btn-block mt-4" onClick={(e) => handleEdit(e)}>Save</button>
                      <button type="submit" class="btn btn-secondary btn-block mt-4 mx-2" onClick={(e) => handleAction(e, "create")}>Back to Create</button>
                    </div>
                    : <button type="submit" class="btn btn-primary btn-block mt-4" onClick={(e) => handleCreate(e)}>Create</button>
                  }
              </form>
            </div>
            <div className="col-lg-8 product-list">
              <div className="row product-search mb-3">
                <div className='col'>
                  <input className="form-control" type="text" placeholder="Name" name="name" id="name" value={product.name} required onChange={(e)=>handleChange(e)}/>
                </div>
                <div className='col'>
                  <input className="form-control" type="text" placeholder="Brand" name="name" id="name" value={product.name} required onChange={(e)=>handleChange(e)}/>
                </div>
                <div className='col'>
                  <button type="submit" className="btn btn-primary btn-block" onClick={(e) => handleSearch(e)}>Search</button>
                </div>
              </div>
              <div className="row">
                { products.map((i) => {
                  return (
                    <div className="col box" key={i.id}>
                      {i.image != "" 
                        ? <img alt='img' className="product-img" src={require(`../../public/uploads/product-images/${i.image.split(',')[0]}`)}/>
                        : <img alt='img' className="product-img" />
                      }  
                      <h4>{i.name}</h4>
                      <h6>{i.brand}</h6>
                      <p>{i.description}</p>

                      <button type="submit" class="btn btn-secondary btn-block mt-4 mx-2" onClick={(e) => handleAction(e, "edit", i)}>Edit</button>
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