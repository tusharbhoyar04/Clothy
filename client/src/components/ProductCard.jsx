import React, { useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useNavigate, useLocation } from 'react-router-dom';
import { useToast } from '@chakra-ui/react';
import "../style/ProductCard.css";
import { addToCart, addToWishlist } from '../Redux/action';

function ProductCard({ item }) {
  const login = useSelector(state => state.login);
  const user = JSON.parse(localStorage.getItem("User"))
  const { id, name, price, imageURL } = item;
  const [currentImageIndex, setCurrentImageIndex] = useState(0);
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const toast = useToast();

  const handleNavigation = () => {
    if (!login.isAuth) {
      toast({
        title: "Please login first",
        status: "error",
        duration: 4000,
        isClosable: true,
        position: "top",
      });
      navigate("/login");
    } else {
      navigate(`/mens/${id}`, { state: { ...item, userId: user._id } });
    }
  };

  const handleAddToCart = () => {
    if (!login.isAuth) {
      toast({
        title: "Authentication required",
        description: "Please login to add items to your cart.",
        status: "error",
        duration: 4000,
        isClosable: true,
        position: "top-right"
      });
      navigate("/login");
      return;
    }
    dispatch(addToCart(item));
    toast({
      title: "Successfully added to Cart",
      status: "success",
      position: "top-left",
      duration: 2000,
      isClosable: true,
    });
  };

  const handleAddToWishlist = () => {
    if (!login.isAuth) {
      toast({
        title: "Authentication required",
        description: "Please login to add items to your wishlist.",
        status: "error",
        duration: 4000,
        isClosable: true,
        position: "top-right"
      });
      navigate("/login");
      return;
    }

    dispatch(addToWishlist(item));
    toast({
      title: "Successfully added to Wishlist",
      status: "success",
      position: "top-left",
      duration: 2000,
      isClosable: true,
    });
  };

  const handleNextImage = () => {
    setCurrentImageIndex((prevIndex) => (prevIndex + 1) % imageURL.length);
  };

  const handlePrevImage = () => {
    setCurrentImageIndex((prevIndex) => prevIndex === 0 ? imageURL.length - 1 : prevIndex - 1);
  };

  return (
    <div className="product-card">
      <div className="carousel-container">
        <img className="carousel-image" src={imageURL[currentImageIndex]} alt={name} />
        <button className="prev" onClick={handlePrevImage}>&#10094;</button>
        <button className="next" onClick={handleNextImage}>&#10095;</button>
      </div>
      <div className="card-front" onClick={handleNavigation}>
        <h1 className="product-name">{name}</h1>
      </div>
      <div className="product-detail">
        <p className="price"><b>Price:</b> ${price}</p>
        <div className="button-container">
          <button className="action-button" onClick={handleAddToCart}>
            <i className="fa-solid fa-cart-shopping"></i>
          </button>
          <button className="action-button" onClick={handleAddToWishlist}>
            <i className="fa-solid fa-heart"></i>
          </button>
        </div>
      </div>
    </div>
  );
}

export default ProductCard;
