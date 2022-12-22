import React from "react";
import { BrowserRouter, Route, Routes } from "react-router-dom";
import ScrollToTop from "./component/scrollToTop";

import { Home } from "./pages/home";
import { Login } from "./pages/Login.jsx";
import { Register } from "./pages/Register.jsx";
import { Worksheet } from "./pages/Worksheet.jsx";
import { Card } from "./pages/Card.jsx";
import { GameRegister } from "./pages/GameRegister.jsx";
import { List } from "./pages/List.jsx";
import injectContext from "./store/appContext";

import { Navbar } from "./component/navbar";
import { Footer } from "./component/footer";

//create your first component
const Layout = () => {
    //the basename is used when your project is published in a subdirectory and not in the root of the domain
    // you can set the basename on the .env file located at the root of this project, E.g: BASENAME=/react-hello-webapp/
    const basename = process.env.BASENAME || "";

    return (
        <div>
            <BrowserRouter basename={basename}>
                <ScrollToTop>
                    <Navbar />
                    <Routes>
                        <Route element={<Register/>} path="/register" />
                        <Route element={<Home />} path="/" />
                        <Route element={<Login />} path="/login" />
                        <Route element={<Worksheet />} path="/worksheet"/>
                        <Route element={<GameRegister/>} path="/gameregister"/>
                        <Route element={<Card />} path="/card" />
                        <Route element={<List/>} path="/list"/>
                        <Route element={<h1>Not found!</h1>} />
                    </Routes>
                    <Footer />
                </ScrollToTop>
            </BrowserRouter>
        </div>
    );
};

export default injectContext(Layout);
