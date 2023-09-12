import React, {useState} from 'react';
import Modal from './modal';
import axios from 'axios';
import './modal.css';
import ErrorBlock from '../error/ErrorBlock';

export default function ModalForm({inputData, onClose}) {
    
    const [image, setImage] = useState(null);
    const [isError, setisError] = useState(false);
    let id = '';
    let errorMessgae='Failed to Add Data';
    if (inputData)
    {
        id=inputData.id;
        errorMessgae='Failed to Update Data';
    }
    
  const fileSelectorHanlder = (event) => {
    const selectedImage = event.target.files[0];
    if (selectedImage) {
        if (!selectedImage.type.startsWith('image/')) {
            window.alert("File does not support. You must use .png or .jpg ");
            return false;
         }
        const img = new Image();
        img.onload = () => {
          if (img.width <= 200 && img.height <= 200) {
            setImage(selectedImage);
          } else {
            alert('Image dimensions must be 200x200 or smaller.');
            return false;
          }
        };
        img.src = URL.createObjectURL(selectedImage);
      }
  };
  const submitHandler = event => {
    event.preventDefault();
    const formData = new FormData(event.target);
    const data = Object.fromEntries(formData);
        axios({
          method: !inputData ? 'POST' : 'PUT', 
          url: 'https://fakestoreapi.com/products/'+id, 
          body:JSON.stringify(
            {
                title: data.title,
                price: data.price,
                description: data.description,
                image: data.image,
                category: data.category,
            }
          )
        })
          .then((response) => console.log(response.data))
          .catch(err => {
            if(err)
                setisError(true);
          })
  };
  
  let content = (
  <form id='form' onSubmit={submitHandler}>
    <p className="control">
        <label htmlFor="title">Title</label>
        <input
          id="title"
          name="title"
          required
          defaultValue={inputData?.title ?? ''}
        />
    </p>
    <p className="control">
        <label htmlFor="price">Price</label>
        <input
        type="number"
        id="price"
        name="price"
        required
        defaultValue={inputData?.price ?? ''}
        />
    </p>
    <p className="control">
        <label htmlFor="description">Description</label>
        <input
        id="description"
        name="description"
        required
        defaultValue={inputData?.description ?? ''}
        />
    </p>
    <p className="control">
    <label htmlFor="category">Category</label>
    <input
        type="text"
        id="category"
        name="category"
        required
        defaultValue={inputData?.category ?? ''}
    />
    </p>
    <p className="control">
    <label htmlFor="ImageUpload">Upload Image</label>
    <input
        type="file"
        id="ImageUpload"
        name="ImageUpload"
        onChange={fileSelectorHanlder}
        required   
    />
    </p>
    <p className="control">
    <label htmlFor="image">Upload Image</label>
    <input
        type="hidden"
        id="image"
        name="image"
        value={image===null ? ' ' : image.name}
        required
    />
    </p>
    <div id='btn-div'>
        <button type='submit' className='add-item-btn'>{!inputData ? 'Add Product' : 'Update Product'}</button>
        <button className='remove-item-btn' style={{marginLeft: '5px'}} onClick={onClose}>Cancel</button>
    </div>
    {isError && <ErrorBlock title='Failed...' message={errorMessgae} />}
  </form>
  );
    return (
    <Modal>{content}</Modal>
  );
}
