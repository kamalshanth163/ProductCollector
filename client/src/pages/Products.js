import React, {useEffect, useState} from 'react';
import '../styles/Products.css'
import NavBar from '../components/NavBar';
import API from '../APIs/API';

function Products() {

  const userType = localStorage.getItem("user-type");
  const userId = localStorage.getItem("user-id");
  const userName = localStorage.getItem("user-name");

  var initialProduct = {
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
  const [imageCode, setImageCode] = useState({});

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

  const saveUploadedImages = (productId, files) => {
    var fileNames = Object.keys(files).map((f, i) => {
      var extension = files[f].name.split(".")[1];
      var fileName = `${productId}_${i+1}.${extension}`;
      var file = files[f];

      console.log(file)

      file.mv(`${__dirname}/client/public/uploads/product-images/${fileName}`);

      return fileName;
    });
    var code = fileNames.join(",");
    setImageCode(code);
  }
  
  const handleSubmit = (e) => {
    e.preventDefault(); 
    var newProduct = {
      ...product, 
      image: "", 
      holder_id: parseInt(userId),
      category_id: parseInt(product.category_id)
    };

    new API().postProduct(newProduct).then(data => {
      var productId = data.insertId;
      if(productId > 0){
        saveUploadedImages(productId, uploadedImages);
      }
      newProduct = {
        ...newProduct,
        id: productId,
        image: imageCode
      }
      new API().updateProduct(newProduct).then(data => {

      })
    });
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
              <h3>Create a product</h3>
              <form>
                  <hr />
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

                  <button type="submit" class="btn btn-primary btn-block mt-4" onClick={(e) => handleSubmit(e)}>Create</button>
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
                  <button type="submit" class="btn btn-primary btn-block" onClick={(e) => handleSearch(e)}>Search</button>
                </div>
              </div>
              <div className="row">
                { products.map((i) => {
                  return (
                    <div className="col box">
                      <img alt='img' />
                      <h4>{i.name}</h4>
                      <h6>{i.brand}</h6>
                      <p>{i.description}</p>
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