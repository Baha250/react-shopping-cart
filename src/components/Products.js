import React, { Component } from 'react';
import formatCurrency from '../util';
import {Fade, Zoom} from "react-reveal"
import Modal from 'react-modal'


class Products extends Component {
    constructor(){
        super()
        this.state={
            product: null
        }
    }

    openModal = (product) => {
        this.setState(state => ({product}));
    }
    closeModal = () => {
        this.setState(state => ({product: null}))
    }
    render() {
        const {product} = this.state
        return (
            <div>
                <Fade bottom cascade = {true} >
                    <ul className='products'>
                        {
                            this.props.products.map(product => (
                                <li key={product._id}>
                                    <div className='product'>
                                        <a href={"#" + product._id} onClick={() => this.openModal(product)}>
                                            <img src={product.image} alt={product.title}></img>
                                            <p>
                                                {product.title}
                                            </p>
                                        </a>
                                        <div className='product-price'>
                                            <div>{formatCurrency(product.price)}</div>
                                            <button 
                                            className='button primary'
                                            onClick = {() => this.props.AddToCart(product)}
                                            >Add to cart                                        
                                            </button>
                                        </div>
                                    </div>
                                </li>
                            ))
                        }
                    </ul>
                </Fade>
                {
                    product &&(
                        <Modal 
                        isOpen = {true}
                        onRequestClose={this.closeModal}
                        >
                            <Zoom>
                                <button className='close-modal' onClick={this.closeModal}>
                                    x
                                </button>
                                <div className='product-details'>
                                   <img src={product.image} alt={product.title}/>
                                   <div className='product-details-description'>
                                       <p>
                                           <strong>{product.title}</strong>
                                       </p>
                                       <p>
                                           {product.description}
                                       </p>
                                       <p>
                                           Available Sizes: {" "}
                                           {
                                           product.availableSizes.map(item => {
                                                return(
                                                    <span>
                                                    {" "}
                                                    <button 
                                                    className='button'                                                    
                                                    >{item}</button>
                                                 </span>
                                                )
                                           })
                                           }
                                       </p>                                       
                                        <div className='product-price'>
                                            <div className='modal-item-price'>{formatCurrency(product.price)}</div>
                                            <button 
                                            className='button primary'
                                            onClick={() => {
                                                this.props.AddToCart(product);
                                                this.closeModal();
                                            }}
                                            >Add to Cart</button>
                                        </div>                                       
                                   </div>
                                </div>
                            </Zoom>
                        </Modal>
                    )
                }
            </div>
        );
    }
}

export default Products;
