import React, { useEffect, useState } from 'react';
import "../style/Navbar.css";
import { Link } from 'react-router-dom';
import Profile from './Profile';
import { useSelector } from 'react-redux';

const Navbar = () => {
    const [isMenuOpen, setIsMenuOpen] = useState(false);
    const [isScrolled, setIsScrolled] = useState(false);
    const isAuthenticated = useSelector(state => state.login.isAuth); 

    const toggleMenu = () => setIsMenuOpen(!isMenuOpen);
    const closeMenu = () => {
        setIsMenuOpen(false);
        window.scrollTo({
            top: 0,
            left: 0,
            behavior: 'smooth'
        });
    };

    const handleScroll = () => {
        setIsScrolled(window.pageYOffset > 0);
    };

    useEffect(() => {
        window.addEventListener('scroll', handleScroll);
        return () => window.removeEventListener('scroll', handleScroll);
    }, []);

    return (
        <header className={`navbar-header ${isMenuOpen ? "navbar-open" : ""} ${isScrolled ? "navbar-sticky" : ""}`} id='nav-menu'>
            <Link to="/" className="navbar-logo" onClick={closeMenu}>Clothy<span>...</span></Link>
            <nav className={`navbar ${isMenuOpen ? "navbar-expanded" : ""}`}>
                <Link to="/" className="navbar-link" onClick={closeMenu}>Home</Link>
                <Link to="/mens" className="navbar-link" onClick={closeMenu}>Mens</Link>
                <Link to="/womens" className="navbar-link" onClick={closeMenu}>Womens</Link>

                <div className="navbar-profile-section">
                    {isAuthenticated ? (
                        <>
                            <Link to="/cart" className='icon-link' onClick={closeMenu}><i className="fa-solid fa-cart-shopping"></i></Link>
                            <Link to="/wishlist" className='icon-link' onClick={closeMenu}><i className="fa-regular fa-heart"></i></Link>
                            <Link onClick={closeMenu}><Profile /></Link>
                        </>
                    ) : (
                        <Link to="/login" className="navbar-login-button" onClick={closeMenu}>Login</Link>
                    )}
                </div>
            </nav>
            <div className="navbar-profile">
                {isAuthenticated ? (
                    <>
                        <Link to="/cart" className='icon-link' onClick={closeMenu}><i className="fa-solid fa-cart-shopping"></i></Link>
                        <Link to="/wishlist" className='icon-link' onClick={closeMenu}><i className="fa-regular fa-heart"></i></Link>
                        <Link onClick={closeMenu}><Profile /></Link>
                    </>
                ) : (
                    <Link to="/login" className="navbar-login-button" onClick={closeMenu}>Login</Link>
                )}
            </div>
            <i className="fa-solid fa-bars navbar-menu-icon" onClick={toggleMenu}></i>
        </header>
    );
};

export default Navbar;
