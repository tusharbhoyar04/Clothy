import React, { useEffect } from 'react'
import { useDispatch, useSelector } from 'react-redux';
import "../style/Home.css"
import { addToCart, getAllMensData, getAllWomensData } from '../Redux/action';
import { useNavigate } from 'react-router-dom';
import { useToast } from '@chakra-ui/react';

const Home = () => {
    const dispatch = useDispatch();
    const login = useSelector(state => state.login);
    const navigate = useNavigate();
    const toast = useToast();
    const { AllMensData } = useSelector(state => state.mens);
    const { AllWomensData } = useSelector(state => state.womens);

    useEffect(() => {
        dispatch(getAllMensData())
        dispatch(getAllWomensData())
    }, [dispatch]);

    const handleAddToCart = (item) => {
        if (!login.isAuth) {
            toast({
                title: "You need to be logged in to add items to cart!",
                position: "top",
                status: "error",
                duration: 2000,
                isClosable: true,
                variant: "solid",
            });
            navigate("/login");
            return;
        }
        const obj = { ...item, userId: login.users.id };
        dispatch(addToCart(obj));
        toast({
            title: "Successfully added to Cart",
            position: "top",
            duration: 3000,
            isClosable: true,
            variant: "solid",
            colorScheme: "green"
        });
    };

    return (
        <>
            <section id="hero">
                <h4>Trade-in-offer</h4>
                <h2>Super value deals</h2>
                <h1>On all products</h1>
                <p>Save more with coupons & up to 70% off! </p>
                <button>Shop Now</button>
            </section>

            <section id="product1" class="section-p1">
                <h2>Featured Products</h2>
                <p>Summer Collection New Morden Design</p>
                <div class="pro-container">
                    {AllMensData.slice(0, 8).map((item) => (
                        <div key={item._id} className="pro">
                            <img src={item.imageURL[0]} alt={item.name} />
                            <h5>{item.name}</h5>
                            <div class="des">
                                <h4>${item.price}</h4>
                                <button onClick={()=>handleAddToCart(item)} className='cart'><i className="fa-solid fa-cart-shopping"></i></button>
                            </div>
                        </div>
                    ))}
                </div>
            </section>

            <section id="banner" class="section-m1">
                <h4>Repair Services </h4>
                <h2>Up to <span>70% Off</span> - All t-shirts & Accessories </h2>
                <button class="btn">Explore More</button>
            </section>

            <section id="product1" class="section-p1">
                <h2>Featured Products</h2>
                <p>Summer Collection New Morden Design</p>
                <div class="pro-container">
                    {AllWomensData.slice(10, 18).map((item) => (
                        <div key={item._id} className="pro">
                            <img src={item.imageURL[0]} alt={item.name} />
                            <h5>{item.name}</h5>
                            <div className="des">
                                <h4>${item.price}</h4>
                                <button onClick={()=>handleAddToCart(item)} className='cart'><i className="fa-solid fa-cart-shopping"></i></button>
                            </div>
                        </div>
                    ))}
                </div>
            </section>

            <section id="sm-banner" class="section-p1">
                <div class="banner-box">
                    <h4>crazy deals</h4>
                    <h2>buy 1 get 1 free</h2>
                    <span>The best classic dress is on sale at cara</span>
                    <button class="white">Learn More</button>
                </div>

                <div class="banner-box banner-box2">
                    <h4>spring/summer</h4>
                    <h2>upcomming season</h2>
                    <span>The best classic dress is on sale at cara</span>
                    <button class="white">Collection</button>
                </div>
            </section>

            <section id="banner3">
                <div class="banner-box">
                    <h2>SEASONAL SALE</h2>
                    <h3>Winter Collection -50% OFF</h3>
                </div>

                <div class="banner-box banner-box2">
                    <h2>NEW FOOTWARE COLLECTION</h2>
                    <h3>Spring / Summer 2022</h3>
                </div>

                <div class="banner-box banner-box3">
                    <h2>T-SHIRTS</h2>
                    <h3>New Trendy Prints</h3>
                </div>
            </section>

            <section id="newsletter" class="section-p1 section-m1">
                <div class="newstext">
                    <h4>Sign Up For Newsletters</h4>
                    <p>Get E-mail updates about our latest shop and <span>special offers.</span> </p>
                </div>
                <div class="form">
                    <input type="email" placeholder="Your eamil address" />
                    <button class="normal">Sign Up</button>
                </div>
            </section>
        </>
    )
}

export default Home