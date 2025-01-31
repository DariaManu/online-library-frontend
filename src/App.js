import React from "react";
import "../node_modules/bootstrap/dist/css/bootstrap.min.css"
import "react-toastify/dist/ReactToastify.css"
import './App.css';
import {AuthContextProvider} from "./auth/AuthContextProvider";
import {BrowserRouter, Route, Routes} from "react-router";
import {LoginComponent} from "./auth/LoginComponent";
import {RegisterComponent} from "./auth/RegisterComponent";
import {HomePageComponent} from "./home/HomePageComponent";
import {ToastContainer} from "react-toastify";

function App() {
  return (
    <AuthContextProvider>
        <BrowserRouter>
            <Routes>
                <Route
                    path="/login" element={<LoginComponent/>}
                ></Route>
                <Route
                    path="/" exact element={<LoginComponent/>}
                ></Route>
                <Route
                    path="/register" element={<RegisterComponent/>}
                ></Route>
                <Route
                    path="/home" element={<HomePageComponent/>}
                ></Route>
            </Routes>
        </BrowserRouter>
        <ToastContainer/>
    </AuthContextProvider>
  );
}

export default App;
