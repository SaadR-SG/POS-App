import React, { useEffect } from "react";
import "./Card.css";
import { useState } from "react";
import ModalForm from "../modal/ModalForm";
const Card = ({ product, addItem, removeItem, addedItems }) => {
  const [isAdded, setIsAdded] = useState(true);
  const [editForm, setEditForm] = useState(false);
  const item = addedItems.filter((addedItem) => addedItem.id == product.id);
  useEffect(() => {
    item.length == 0 ? setIsAdded(true) : setIsAdded(false);
  }, [item]);

  const editHandler = () => {
    setEditForm(!editForm);
  };

  return (
    <div className="card">
      <span className="edit-btn" onClick={editHandler}>Edit</span>
      {editForm && <ModalForm inputData={product} onClose={editHandler}/>}
      <img className="card__img" src={product.image} alt="" />
      <div>
        <h2>{product.category}</h2>
        <h4>{product.title}</h4>
        <p>{product.description}</p>
      </div>
      <div className="card-price-add">
        <span>Price : ${product.price}</span>
        <button
          className={isAdded ? "add-item-btn" : "remove-item-btn"}
          onClick={() => {
            isAdded ? addItem(product) : removeItem(product);
            setIsAdded(!isAdded);
          }}
        >
          {isAdded ? "ADD " : "REMOVE"}
        </button>
      </div>
    </div>
  );
};

export default Card;
