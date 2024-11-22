import { useState } from "react";
import { useLocation, useNavigate, useParams } from "react-router-dom";
import { Button, useToast } from '@chakra-ui/react';
import StarRating from "./StarRating";
import "../style/singleProduct.css";
import { useDispatch, useSelector } from "react-redux";
import { addToCart } from "../Redux/action";

function SingleProduct() {
  const location = useLocation();
  const data = location.state;
  const dispatch = useDispatch();
  const login = useSelector(state => state.login);
  const navigate = useNavigate();
  const toast = useToast();
  const user = JSON.parse(localStorage.getItem("User"))

  const handleAddToCart = (data) => {
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

    dispatch(addToCart(data));
    toast({
      title: "Successfully added to Cart",
      position: "top-left",
      duration: 2000,
      isClosable: true,
      variant: "solid",
      color: "green"
    });
  };

  return (
    <div className="singleproductcontainer">
      <div className="single_product_images">
        <img src={data.imageURL[0]} alt={data.name} />
        <img src={data.imageURL[1]} alt={data.name} />
        <img src={data.imageURL[2]} alt={data.name} />
      </div>
      <div className="singleInfo">
        <h4>{data.name}</h4>
        <h5>{data.description}</h5>
        <p><b>Category:</b> {data.category}</p>
        <p><b>Price:</b> ${data.price}</p>
        <div className="rating">
          <p><b>Rating:</b> </p>
          <StarRating rating={data.rating} />
        </div>
        <Button onClick={()=> handleAddToCart(data)} colorScheme='red' size='md' marginRight={2} >ADD TO CART</Button>
      </div>
    </div>
  );
}

export default SingleProduct;
