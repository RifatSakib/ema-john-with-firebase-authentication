import React, { useEffect, useState } from 'react';
import { getDatabaseCart, processOrder, removeFromDatabaseCart } from '../../utilities/databaseManager';
import fakeData from '../../fakeData';
import ReviewItem from '../ReviewItem/ReviewItem';
import Cart from '../Cart/Cart';
import happyImage from '../../images/giphy.gif'
import { useHistory } from 'react-router-dom';


const Review = () => {

    const[cart,setCart] = useState([])
    const[orderPlaced, setOrderPlaced]= useState(false);
    const history = useHistory();

    const handleProceedCheckout = ()=> {
      
        history.push('/shipment');

    }

    const removeProduct = (productKey) =>{
        const newCart = cart.filter(pd => pd.key !== productKey);
        setCart(newCart);
        removeFromDatabaseCart(productKey);
    }

    useEffect(()=>{

        const savedCart=getDatabaseCart();
       // console.log(savedCart);
        const productKeys= Object.keys(savedCart);

        const cartProducts= productKeys.map(key=> {
            const product = fakeData.find(pd => pd.key === key);
           // console.log(product);
            product.quantity = savedCart[key];
            return product;
        });
        //console.log(cartProducts);
        setCart(cartProducts);
    },[])
    let thankYou;
    if(orderPlaced){

        thankYou= <img src={happyImage} alt="" />
    }  
    return (
        <div className='twin-container'>
       
            <div className="product-container">
            {
                cart.map(pd => <ReviewItem key= {pd.key} removeProduct={removeProduct} product={pd}></ReviewItem>)
            }

            
            {
                thankYou
            }

            </div>

            <div className="cart-container">
            <Cart cart={cart}>

                <button  onClick={handleProceedCheckout} className='main-button'>Proceed Checkout</button>
            </Cart>

            </div>
        </div>
    );
};

export default Review;