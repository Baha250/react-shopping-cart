// feature-1
import React, {Component} from "react";
import Filter from "./components/Filter";
import Products from "./components/Products";
import Cart from "./components/Cart";
import data from "./data.json"

export default class App extends Component {
  constructor(){
    super();
    this.state = {
      products: data.products,
      size:"",
      sort:"",
      cartItems: []

    };
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
 
  }
  removeFromCart = (itemId) => {
    const cartInner = this.state.cartItems;
    const itemIndex = cartInner.findIndex(element => element._id === itemId);
    
    const newItems = [...cartInner.slice(0, itemIndex), ...cartInner.slice(itemIndex +1)];
    this.setState(state => ({
      cartItems: newItems
    }))
  }


  filterSizeOfProducts = (e) =>{
    if(e.target.value === ""){
      this.setState(state => ({
        size: e.target.value,
        products: data.products
      }))
    }else{
    this.setState(state => ({
      size: e.target.value,
      products: data.products.filter(item => item.availableSizes.indexOf(e.target.value)>=0)
    }))
  }
  }
  sortProductsByPrice = (e) =>{
    const sort = e.target.value
      this.setState(state => ({
        sort,
        products: this.state.products.slice().sort(function(a,b){
          if(sort === "highest"){
            if(a.price<b.price){
              return 10
            }
            if(a.price>b.price) {
              return -10
            }
          }
          if(sort==="lowest"){
            if(a.price>b.price){
              return 10
            }
            if(a.price<b.price){
              return -10
            }
          }
          if(a._id>b._id){
            return 10
          }else if(a._id<b._id){
            return -10
          }
          return null
        }) 
      }));
    
  }
  render() {
    return (    
          <div className="grid-container">
              <header>
                <a href="/">React Shopping-Cart</a>
              </header>
              <main>
               <div className="content">
                  <div className="main">
                    <Filter 
                    count={this.state.products.length}
                    size={this.state.size}
                    sort={this.state.sort}
                    filterSizeOfProducts={this.filterSizeOfProducts}
                    sortProductsByPrice={this.sortProductsByPrice}
                    />
                     <Products 
                     products = {this.state.products}
                     AddToCart = {this.addToCart}
                     />
                  </div>
                  <div className="sidebar">
                      <Cart 
                      cartItems={this.state.cartItems}
                      removeFromCart = {this.removeFromCart}
                      />
                  </div>
               </div>
              </main>
              <footer>
                All right is reserved.
              </footer>
          </div> 
    )
  }
};


