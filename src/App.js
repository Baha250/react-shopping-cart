// feature-1
import React, {Component} from "react";
import Filter from "./components/Filter";
import Products from "./components/Products";
import data from "./data.json"

export default class App extends Component {
  constructor(){
    super();
    this.state = {
      products: data.products,
      size:"",
      sort:""

    };
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
                     <Products products = {this.state.products}/>
                  </div>
                  <div className="sidebar">
                      Cart Items
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


