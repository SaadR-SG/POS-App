import React, { useEffect, useState } from "react";
import Header from "./components/header/Header";
import Search from "./components/search/Search";
import AddProducts from "./components/addproducts/AddProducts";
import CardBody from "./components/cards/CardBody";
import Button from "./components/button/Button";
import axios from "axios";
import "./App.css";
const App = () => {
  const [items, setItem] = useState([]);
  const [searchValue, setSearchValue] = useState("");
  const [addedItems, setAddedItem] = useState([]);
  const [showAddProducts, setShowAddProducts] = useState(false);

  useEffect(() => {
    axios({
      method: 'GET', 
      url: 'https://fakestoreapi.com/products/',
    })
      .then(({ data }) => {
        setItem(data)
      })
      .catch(err => console.dir(err))      
  }, []);
  function changingSrarchData(e) {
    setSearchValue(e.target.value);
  }
  const itmesFilter = items.filter((item) =>
    item.title.toLowerCase().includes(searchValue.toLowerCase())
  );

  function addItem(item) {
    item.addNumber = 1;
    const itemArr = addedItems;
    setAddedItem([...itemArr, item]);
  }
  // console.log(addedItems);
  function removeItem(item) {
    const newItems = addedItems.filter((addedItem) => addedItem.id !== item.id);
    setAddedItem(newItems);
    // console.log(addedItems);
  }
  return (
    <div>
      {/* <Header /> */}

      <div className="body__container">
        <div className="nav">
          <Header />
          <div className="nav-right">
            <Search
              products={items}
              value={searchValue}
              onChangeData={changingSrarchData}
            />
            <Button num={addedItems.length} click={setShowAddProducts} />
          </div>
        </div>

        {showAddProducts && (
          <AddProducts
            click={setShowAddProducts}
            items={addedItems}
            removeItem={removeItem}
            setAddedItem={setAddedItem}
          />
        )}
        <CardBody
          products={itmesFilter}
          addItem={addItem}
          removeItem={removeItem}
          addedItems={addedItems}
        />
      </div>
    </div>
  );
};

export default App;
