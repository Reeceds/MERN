import { React } from "react";
import { useState, useEffect } from "react";
import "./Header.scss";

import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faBars, faXmark } from "@fortawesome/free-solid-svg-icons";

import { Container } from "react-bootstrap";

import { Link, useNavigate } from "react-router-dom";

export default function Header() {
    let [auth, setAuth] = useState(false)
    let [burgerBtn, setBurgerBtn] = useState(faBars);

    let navigate = useNavigate();

    useEffect(() => {
      localStorage.getItem('user-token') ? setAuth(true) : setAuth(false)
    }, [auth])
    

    // Logs out user
    const logOutUser = () => {

        setAuth(false)
        localStorage.removeItem('user-token');
        closeMobileNav();
        navigate('/login');
    };

    // Toggle mobile nav
    const toggleMobileNav = () => {
        if (burgerBtn === faBars) {
            openMobileNav();
        } else {
            closeMobileNav();
        }
    };

    // Open mobile nav
    const openMobileNav = () => {
        let mobileMenu = document.querySelector(".js-main-nav_mobile");
        let mobileMenuNav = document.querySelector(".js-main-nav_mobile nav");

        setBurgerBtn(faXmark);

        mobileMenu.style.animation = "navContainerSlideDown 250ms forwards"; // * 'forwards' makes the animation stay where it finishes

        setTimeout(() => {
            mobileMenuNav.classList.remove("hide");
        }, 200);
    };

    // Close mobile nav
    const closeMobileNav = () => {
        let mobileMenu = document.querySelector(".js-main-nav_mobile");
        let mobileMenuNav = document.querySelector(".js-main-nav_mobile nav");

        setBurgerBtn(faBars);

        mobileMenu.style.animation = "navContainerSlideUp 250ms forwards"; // * 'forwards' makes the animation stay where it finishes
        mobileMenuNav.classList.add("hide");
    };

    return (
        <header className="main-nav">
            {/* Dektop nav */}
            <div className="main-nav_desktop">
                <Container>
                    <div className=" main-nav_desktop-container">
                        {auth ?
                        <Link onClick={() => closeMobileNav()} className="main-nav_desktop-logo" to="/dashboard">
                            MERN
                        </Link>
                        :
                        <Link onClick={() => closeMobileNav()} className="main-nav_desktop-logo" to="/login">
                            MERN
                        </Link>}
                        {auth ? (
                            <nav>
                                <Link to="/dashboard">Dashboard</Link>
                                <span className="main-nav_desktop-seperator">|</span>
                                <span onClick={logOutUser}>Log Out</span>
                            </nav>
                        ) : (
                            <nav>
                                <Link to="/login">Log In / Register</Link>
                            </nav>
                        )}
                        <FontAwesomeIcon
                            onClick={() => toggleMobileNav()}
                            className="js-burger-menu-btn burger-menu-btn"
                            icon={burgerBtn}
                            color="white"
                            size="2x"
                        />
                    </div>
                </Container>
            </div>

            {/* Mobile nav */}
            <div className="main-nav_mobile js-main-nav_mobile">
                <Container>
                    {auth ? (
                        <nav className="hide">
                            <Link onClick={() => closeMobileNav()} to="/dashboard">
                                Dashboard
                            </Link>
                            <span onClick={logOutUser}>Log Out</span>
                        </nav>
                    ) : (
                        <nav className="hide">
                            <Link onClick={() => closeMobileNav()} to="/login">
                                Log In / Register
                            </Link>
                        </nav>
                    )}
                </Container>
            </div>
        </header>
    );
}
