import React, { Component } from 'react';

class Cart extends Component {
    constructor(){
        super()
        this.state = {

        }
    }
    render() {
        const {cartItems} = this.props

        return (

            <div>
                {
                    cartItems.length === 0?(<div className='cart cart-header'>Cart is empty</div>)
                    : (<div className='cart cart-header'>You have {cartItems.length} items in Cart</div>)
                }
                {
                    <ul>
                        {
                            cartItems.map(item => {
                                const {price,image,title,count} = item;
                                return (
                                    <li key={item._id}>
                                        <div>
                                            <div><img src={image} alt={title}/></div>
                                            <div>{title}</div>
                                        </div>
                                        <div>
                                            <div>{count}X{price}</div>
                                            <button>Remove</button>
                                        </div>
                                    </li>
                                )
                            })
                        }
                    </ul>
                }

            </div>
        );
    }
}

export default Cart;