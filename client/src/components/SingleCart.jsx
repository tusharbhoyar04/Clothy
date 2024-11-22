import React, { useState } from 'react';
import { useDispatch } from 'react-redux';
import { deleteFromCart } from '../Redux/action';

const SingleCart = ({item}) => {
    const dispatch = useDispatch()
    const [quantity, setQuantity] = useState(1);
    const total = quantity * item.price;

    const handleQuantityChange = (event) => {
        const newQuantity = parseInt(event.target.value, 10);
        setQuantity(newQuantity);
    };

    return (
        <tr>
            <td onClick={() => { dispatch(deleteFromCart(item._id, item.userId))}}><a><i className="far fa-times-circle"></i></a></td>
            <td><img src={item.imageURL[0]} alt={item.name} /></td>
            <td>{item.name}</td>
            <td>{item.price}</td>
            <td>
                <input
                    type="number"
                    value={quantity}
                    onChange={handleQuantityChange}
                />
            </td>
            <td>{total.toFixed(2)}</td>
        </tr>
    );
}

export default SingleCart;