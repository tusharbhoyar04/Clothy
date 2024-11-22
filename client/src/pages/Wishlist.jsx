import React, { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { getWishlists } from '../Redux/action';
import SingleWishlist from '../components/SingleWishlist';

const Wishlist = () => {
  const wishlist = useSelector(state => state.wishlist.data);
  const dispatch = useDispatch();
  const user = JSON.parse(localStorage.getItem("User"));

  useEffect(() => {
    dispatch(getWishlists(user._id));
  }, [dispatch]);

  return (
    <div className='shopping-container'>
      <div className="banner wishlist-banner"></div>
      {wishlist.length === 0 ? (
        <div className='empty-message'><i className="fa-solid fa-heart wishlist-icon"></i><h1>Your Wishlist is Empty</h1></div>
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
                </tr>
              </thead>
              <tbody>
                {wishlist.map(item => <SingleWishlist key={item._id} item={item} />)}
              </tbody>
            </table>
          </section>
        </div>
      )}
    </div>
  );
};

export default Wishlist;
