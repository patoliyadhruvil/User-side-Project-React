import React, { useState, useEffect } from 'react';
import { Routes, Route } from 'react-router';
import { Provider } from 'react-redux';
import { store } from './store';
import Header from './componenets/Header/Header';
import Footer from './componenets/Footer/Footer';
import Loader from './componenets/Loader/Loader';
import Home from './componenets/container/Home/Home';
import About from './componenets/container/About/About';
import ContactUs from './componenets/Container/Contact-us/ContactUs';
import Blog from './componenets/container/Blog/Blog';
import WatchShop from './componenets/Container/WatchShop/WatchShop';
import CartList from './componenets/Container/CartList/CartList';
import Login from './componenets/Container/Login/Login';

function App() {
    const [loading, setLoading] = useState(true);
    const [isSticky, setIsSticky] = useState(false);


    useEffect(() => {

        setTimeout(() => {
            setLoading(false);
        }, 1000);
    }, []);

    useEffect(() => {
        const handleScroll = () => {
            const currentScroll = window.pageYOffset;
            setIsSticky(currentScroll > 250);
        };

        window.addEventListener("scroll", handleScroll);

        // Clean up the event listener when the component unmounts
        return () => {
            window.removeEventListener("scroll", handleScroll);
        };
    }, []);

    return (
        <>
            <Provider store={store}>
                {loading ? (
                    <Loader />
                ) : (
                    <>
                        <header className={isSticky ? "sticky" : ""}>
                            <Header />
                        </header>
                        <main>
                            <Routes>
                                <Route path='/' element={<Home />} />
                                <Route path='/About' element={<About />} />
                                <Route path='/ContactUs' element={<ContactUs />} />
                                <Route path='/Blog' element={<Blog />} />
                                <Route path='/WatchShop' element={<WatchShop />} />
                                <Route path='/CartList' element={<CartList />} />
                                <Route path='/Login' element={<Login />} />
                            </Routes>
                        </main>
                        <Footer />
                    </>
                )}
            </Provider>
        </>
    );
}

export default App;
