import React, {useEffect, useState} from 'react';
import { useParams, useHistory } from 'react-router';
import '../styles/Products.css'
import NavBar from '../components/NavBar';
import API from '../APIs/API';

function Product() {

  const { id } = useParams();
  const history = useHistory();

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

  var initialOrder = {
    id: 0,
    status: "",
    price: 0,
    collector_id: 0,
    product_id: 0,
  }

  const [product, setProduct] = useState(initialProduct);
  const [orders, setOrders] = useState([]);
  const [category, setCategory] = useState({});
  const [price, setPrice] = useState(0);
  const [orderStatus, setOrderStatus] = useState("");
  const [images, setImages] = useState([]);
  const [imagePreview, setImagePreview] = useState("empty.jpg");

  useEffect(() => {
    new API().getAllProducts().then((data) => {
      var product = data.find(x => x.id == id);
      setProduct({...product});

      var imageList = product.image.split(",");
      setImages(imageList);
      setImagePreview(imageList[0]);

      new API().getAllCategories().then((data) => {
        var category = data.find(x => x.id == product.category_id);
        setCategory({...category});
        setPrice(category.price_per_kg * product.weight * 1)
      })

      new API().getAllOrders().then((data) => {
        var order = data.find(x => x.collector_id == userId && x.product_id == product.id);
        if(order){
          setOrderStatus(order.status);
        }
      })
    })
  }, [product])

  const handlePreview = (image) => {
    setImagePreview(image);
  }
  
  const handleOrder = (e) => {
    var newOrder = {
      id: 0,
      status: "pending",
      price: price,
      collector_id: userId,
      product_id: product.id,
    }

    new API().postOrder(newOrder).then(data => {
      alert("Product ordered successfully");
      setProduct(product);
    })
  }

  return (
    <div className='product-preview'>
      <NavBar />
      <button className="back-btn" onClick={(e) => history.push('/products')}>{'<<'} Back</button>
      <div className='container'> 
        <div className='row'>
          <div className='col image-section'>
            <div className='row image-preview'>
              <div className='col'>
                <img alt='img' className="product-img-preview" src={require(`../../public/uploads/product-images/${imagePreview}`)}/>
              </div>
            </div>
            <div className='row image-list'>
              {images.map(image => {
                return (
                  <div className='col'>
                    <img alt='img' className="product-img" src={require(`../../public/uploads/product-images/${image}`)} onClick={() => handlePreview(image)}/>
                  </div>
                )
              })}
            </div>
          </div>
          <div className='col info-section'>
              <div className='row'>
                <div className='col'>
                  <h6>{category.name} category</h6>
                  <h1>{product.name}</h1>
                  <h3>{product.brand}</h3>
                  <hr />
                  <p>{product.description}</p>
                </div>
              </div>
              <br />
              <div className='row'>
                <div className='col'>
                  <h6>Weight</h6>
                  <h3>{product.weight} Kg</h3>
                </div>
                <div className='col'>
                  <h6>Usage</h6>
                  <h3>{product.usage_time} Years</h3>
                </div>                
                <div className='col'>
                  <h6>Price</h6>
                  <h3>LKR {price.toFixed(2)}</h3>
                </div>
              </div>
              <hr />
              { userType == "collector" 
                ?
                <div className='col'>
                  { orderStatus == "pending" 
                      ? <div type="submit" className="mt-4">
                          <span>This product order is pending</span>
                          <button type="submit" className="btn btn-primary btn-block mx-2" onClick={(e) => history.push('/orders')}>View order</button>
                        </div>
                      : orderStatus == "completed" 
                        ? <div type="submit" className="mt-4">
                            <span>This product order is completed</span>
                            <button type="submit" className="btn btn-primary btn-block mx-2" onClick={(e) => history.push('/orders')}>View order</button>
                          </div>
                        : <div type="submit" className="mt-4">
                            <button type="submit" className="btn btn-success btn-block" onClick={(e) => handleOrder(e)}>Order this product</button>
                          </div>
                  }
                </div>
                : ""
              }
          </div> 
        </div>

      </div>
    </div>
  );
}

export default Product;