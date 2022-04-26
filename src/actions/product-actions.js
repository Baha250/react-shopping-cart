import { FETCH_PRODUCTS } from "../types";
import {FILTER_PRODUCTS_BY_SIZE} from "../types"
import { ORDER_PRODUCTS_BY_PRICE } from "../types";

const fetchProducts = () => async(dispatch) => {
    const res = await fetch("/api/products");
    const data = await res.json() 
    dispatch({
        type: FETCH_PRODUCTS,
        payload: data
    });
}

const filterProducts = (products, size) => (dispatch) => {
    dispatch({
       type:  FILTER_PRODUCTS_BY_SIZE,
       payload: {
           size: size,
           items: size==="" ? products : 
           products.filter(item => item.availableSizes.indexOf(size)>=0)
       }
    });
}
const sortProducts = (filteredProducts,sort) => (dispatch) => {
    const sortedProducts = filteredProducts.slice();
    if(sort==="latest"){
        sortedProducts.sort((a,b) => (a._id>b._id ? 1 : -1));
    }else{
        sortedProducts.sort((a,b) => (
            sort==="lowest" 
            ? a.price>b.prise 
            ? 1
            : -1
            : a.price>b.price
            ? -1
            : 1
        ));
    }
    dispatch({
        type: ORDER_PRODUCTS_BY_PRICE,
        payload: {
            sort: sort,
            items: sortedProducts
        } 

    });
}




export {
    fetchProducts,
    filterProducts,
    sortProducts

}