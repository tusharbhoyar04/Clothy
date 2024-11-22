import { useDispatch, useSelector } from 'react-redux';
import { addToCart, deleteFromWishlist } from '../Redux/action';
import { Button, useToast } from '@chakra-ui/react';

const SingleWishlist = ({item}) => {
    const dispatch = useDispatch()
    const toast = useToast()
    const login = useSelector(state => state.login);


    const handleAddToCart = (item) => {
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
          position: "top-left",
          duration: 2000,
          isClosable: true,
          variant: "solid",
          color: "green"
        });
      };
    return (
        <tr>
            <td onClick={() => { dispatch(deleteFromWishlist(item._id, item.userId))}}><a><i className="far fa-times-circle"></i></a></td>
            <td><img src={item.imageURL[0]} alt={item.name} /></td>
            <td>{item.name}</td>
            <td>{item.price}</td>
            <Button onClick={()=> handleAddToCart(item)} colorScheme='red' size='md' marginRight={2} >ADD TO CART</Button>
        </tr>
    );
}

export default SingleWishlist
