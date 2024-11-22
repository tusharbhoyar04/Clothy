import React, { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { getCarts } from '../Redux/action';
import "../style/Cart.css";
import SingleCart from '../components/SingleCart';
import { Link } from 'react-router-dom';
import Payment from './Payment';

const Cart = () => {
  const cart = useSelector(state => state.cart.data);
  const dispatch = useDispatch();
  const user = JSON.parse(localStorage.getItem("User"));

  const totalCartPrice = cart.reduce((acc, item) => acc + item.price, 0)
  const shippingCost = totalCartPrice > 250 ? 50 : 0;
  const total = shippingCost + totalCartPrice;


  useEffect(() => {
    dispatch(getCarts(user._id));
  }, [dispatch]);

  return (
    <div className='shopping-container'>
      <div className="banner cart-banner"></div>
      {cart.length === 0 ? (
        <div className='empty-message'><i className="fa-solid fa-cart-shopping"></i><h1>Your Cart is Empty</h1></div>
      ) : (
        <div>
          <section className="section-p1">
            <table width="100%">
              <thead>
                <tr>  
                  <td>Remove</td>
                  <td>Image</td>
                  <td>Product</td>
                  <td>Price</td>
                  <td>Quantity</td>
                  <td>Subtotal</td>
                </tr>
              </thead>
              <tbody>
                {cart.map(item => <SingleCart key={item._id} item={item} />)}
              </tbody>
            </table>
          </section>
          <section className="section-p2">
            <div id="coupon">
              <h3>Apply Coupon</h3>
              <div>
                <input type="text" placeholder="Enter Your Coupon" />
                <button className="btn">Apply</button>
              </div>
            </div>

            <div id="subtotal">
              <h3>Cart Totals</h3>
              <table>
                <tr>
                  <td>Cart Subtotal</td>
                  <td>${totalCartPrice.toFixed(2)}</td>
                </tr>
                <tr>
                  <td>Shipping</td>
                  <td>{shippingCost === 0 ? "Free" : `$${shippingCost.toFixed(2)}`}</td>
                </tr>
                <tr>
                  <td><strong>Total</strong></td>
                  <td><strong>${total.toFixed(2)}</strong></td>
                </tr>
              </table>
              <Link className='btn' to={"/payment"} element={<Payment />}>Proceed to checkout</Link>
            </div>
          </section>
        </div>
      )}
    </div>
  );
};

export default Cart;
