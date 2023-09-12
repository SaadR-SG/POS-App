import React, {useState} from "react";
import "./Header.css";
import ModalForm from "../modal/ModalForm";
const Header = () => {
  const[modalState, setModalState] = useState(false);

  const handleModalState = () => {
    setModalState(!modalState);
  }
  return (
    <header>
      <button className="add-item-btn" onClick={handleModalState}>Add New Product</button>
      {modalState && <ModalForm onClose={handleModalState}/>}
    </header>
  );
};

export default Header;
