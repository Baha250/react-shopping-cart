// feature-1
import React, {Component} from "react";
import Filter from "./components/Filter";
import Products from "./components/Products";
import Cart from "./components/Cart";
import store from "./store";
import { Provider } from "react-redux";

export default class App extends Component {
  constructor(){
    super();
    this.state = {

      cartItems: localStorage.getItem("cartItems")? JSON.parse(localStorage.getItem("cartItems")):[]

    };
  }
  createOrder = (order) => {
    alert(`Need to save order for ${order.name}`);
  }
  addToCart=(product)=>{
    
    const cartItems = this.state.cartItems.slice();
    let alreadyExist = false;
    cartItems.forEach(item => {
      if(item._id===product._id){
        item.count ++;
        alreadyExist = true;
      }
    });
    if(!alreadyExist){
      cartItems.push({...product, count:1})
    }

    this.setState(state => ({
      cartItems
    }));
    localStorage.setItem("cartItems", JSON.stringify(cartItems));
 
  }
  removeFromCart = (itemId) => {
    const cartInner = this.state.cartItems;
    const itemIndex = cartInner.findIndex(element => element._id === itemId);
    
    const cartItems = [...cartInner.slice(0, itemIndex), ...cartInner.slice(itemIndex +1)];
    this.setState(state => ({
      cartItems
    }))
    localStorage.setItem("cartItems", JSON.stringify(cartItems));
  }
  render() {
    return (    
      <Provider store={store}>
          <div className="grid-container">
              <header>
                <a href="/">React Shopping-Cart</a>
              </header>
              <main>
               <div className="content">
                  <div className="main">
                    <Filter/>
                     <Products/>
                  </div>
                  <div className="sidebar">
                      <Cart 
                      cartItems={this.state.cartItems}
                      removeFromCart = {this.removeFromCart}
                      createOrder = {this.createOrder}
                      />
                  </div>
               </div>
              </main>
              <footer>
                All right is reserved.
              </footer>
          </div> 
      </Provider>
    )
  }
};


