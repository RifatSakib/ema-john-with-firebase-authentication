import React from 'react';
import './Product.css'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faShoppingCart } from '@fortawesome/free-solid-svg-icons'
import {Link } from 'react-router-dom';


const Product = (props) => {
    //console.log(props)
    const {product, handleAddProduct} = props;
    const { img, name, seller, price, stock,key } = product
    return (

        <div className="product">
 
            <div style={{ paddingRight: "10px" }}>
                <img src={img} alt="" />
            </div>


            <div>
                <h4 className='product-name'> <Link to={"/product/"+key}>{name}</Link>  </h4>               
                <br />
                <p style={{ marginLeft: "10px" }}><small> by: {seller}</small></p>
                <p style={{ marginLeft: "10px", color:"red" }}> <b>$ {price}</b></p>
                <p style={{ marginLeft: "10px" }}><small>Only {stock} left in stock</small></p>
               {props.showAddToCart === true && <button className='main-button' onClick={()=> handleAddProduct(product)}> <FontAwesomeIcon icon={faShoppingCart} /> Add to cart</button>}
           
           
            </div>

        </div>

    );
};

export default Product;