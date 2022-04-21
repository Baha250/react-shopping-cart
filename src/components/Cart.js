import React, { Component } from 'react';
import formatCurrency from '../util';
import { Fade } from 'react-reveal';

class Cart extends Component {

    state={
        name:"",
        email:"",
        address: "",
        showCheckout:false
    }

    handleInput = (e) => {
        this.setState(state=> ({
            [e.target.name]: e.target.value
        }))
    }

    createOrder = (e) => {
        e.preventDefault();
        const order = {
            name: this.state.name,
            address: this.state.address,
            email: this.state.email,
            cartItems: this.props.cartItems
        }
        this.props.createOrder(order);
    }

    render() {
        const {cartItems} = this.props

        return (

            <div>
                <div>
                    {
                        cartItems.length === 0?(<div className='cart cart-header'>Cart is empty</div>)
                        : (<div className='cart cart-header'>You have {cartItems.length} items in Cart</div>)
                    }
                </div>

                <div>
                    <div className='cart'>                        
                        <Fade left cascade>
                            <ul className='cart-items'>
                                {
                                    cartItems.map(item => {
                                        const {price,image,title,count} = item;
                                        return (
                                            <li key={item._id}>                                          
                                                <div>
                                                    <img src={image} alt={title}/>
                                                </div>                                           
                                                
                                                <div>
                                                    <div>{title}</div>
                                                    <div className='right'>                                                                                                      
                                                        {formatCurrency(price)}x{count}{" "}
                                                        <button
                                                        className='button'
                                                        onClick={() => this.props.removeFromCart(item._id)}
                                                        >Remove</button>
                                                    </div>
                                                </div>
                                            </li>
                                        )
                                    })
                                }
                            </ul>
                        </Fade>
                    </div>
                    {
                       cartItems.length !==0 &&(
                            <div>
                                <div className='cart'>
                                    <div className='total'>                                   
                                        <div>
                                            Total:{" "}
                                            {formatCurrency(cartItems.reduce((a, b) => a + (b.price*b.count), 0))}
                                        </div>
                                        <button 
                                        className='button primary'
                                        onClick={() => this.setState(state => ({
                                            showCheckout:true
                                        }))}
                                        >
                                            Proceed
                                        </button>
                                    </div>
                                </div>
                                {
                                    this.state.showCheckout &&(
                                        <div className='cart'>
                                            <Fade right cascade>
                                                <form onSubmit={this.createOrder}>
                                                    <ul className='form-container'>
                                                        <li>
                                                            <label>
                                                                Email
                                                            </label>
                                                            <input name="email" type="email" required onChange={this.handleInput}/>
                                                        </li>
                                                        <li>
                                                            <label>
                                                                Name
                                                            </label>
                                                            <input name="name" type="text" required onChange={this.handleInput}/>
                                                        </li>
                                                        <li>
                                                            <label>
                                                                Address
                                                            </label>
                                                            <input name="address" type="texf" required onChange={this.handleInput}/>
                                                        </li>
                                                        <li>
                                                            <button 
                                                            tipe="submit"
                                                            className='button primary'
                                                            >Checkout</button>
                                                        </li>
                                                    </ul>
                                                </form>
                                            </Fade>
                                        </div>
                                    )
                                }

                            </div>                                                       
                        ) 
                    }
                </div>

            </div>
        );
    }
}

export default Cart;