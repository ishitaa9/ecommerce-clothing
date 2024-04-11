import React, { useState } from 'react';
import "./AddProduct.css";
import upload_area from '../../assets/upload_area.svg';

const AddProduct = () => {
  const [image, setImage] = useState(false);
  const [productDetails, setProductDetails] = useState({
    name: "",
    image: "",
    category: "Women",
    new_price: "",
    old_price: "",
  });

  const imageHandler = (e) => {
    setImage(e.target.files[0]);
  }

  const changeHandler = (e) => {
    setProductDetails({...productDetails, [e.target.name]:e.target.value})
  }

  const Add_Product = async () => {
    console.log(productDetails);
    let responseData;
    let product = productDetails;

    let formData = new FormData();
    formData.append('product', image);

    await fetch('http://localhost:4000/upload', {
      method: 'POST',
      headers: {
        Accept: 'application/json',
      },
      body:formData,
    }).then((resp) => resp.json()).then((data)=>{responseData=data})

    if(responseData.success) {
      product.image = responseData.image_url;
      console.log(product);
      await fetch('http://localhost:4000/addproduct', {
        method: 'POST',
        headers: {
          Accept: 'application/json',
          'Content-Type': 'application/json',
        },
        body:JSON.stringify(product),
      }).then((resp) => resp.json()).then((data)=>{
        data.success ? alert("Product Added") : alert("Failed")
      })
    }
  }

  return (
    <div className='addproduct'>
      <div className="addproduct-itemfield">
        <p>Product Title</p>
        <input value={productDetails.name} onChange={changeHandler} type="text" name="name" placeholder="Type Here.." />
        <div className="addproduct-price">
          <div className="addproduct-itemfield">
            <p>Price</p>
            <input value={productDetails.old_price} onChange={changeHandler}  type="text" name='old_price' placeholder='Type Here..' />
          </div>
          <div className="addproduct-itemfield">
            <p>Offer Price</p>
            <input value={productDetails.new_price} onChange={changeHandler}  type="text" name='new_price' placeholder='Type Here..' />
          </div>
        </div>
        <div className='addproduct-itemfield'>
          <p>Product Category</p>
          <select name="category" className='addproduct-selector' value={productDetails.category} onChange={changeHandler} >
            <option value="women">Women</option>
            <option value="men">Men</option>
            <option value="kids">Kids</option>
          </select>
        </div>
        <div className="addproduct-itemfield">
          <label htmlFor="file-input">
            <img src={image? URL.createObjectURL(image) : upload_area} className='addproduct_thumbnail-img' />
            <input type="file" name="image" id="file-input" hidden onChange={imageHandler} />
            <button className='addproduct-btn' onClick={() => {Add_Product()}}>ADD</button>
          </label>
        </div>
      </div>
    </div>
  )
}

export default AddProduct
