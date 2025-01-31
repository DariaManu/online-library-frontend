import React from "react";
import {Bounce, toast} from "react-toastify";

export const handleNotification = (text) => {
    toast.info(text, {
        position: "top-center",
        autoClose: 5000,
        hideProgressBar: false,
        closeOnClick: true,
        pauseOnHover: true,
        draggable: false,
        progress: undefined,
        theme: "light",
        transition: Bounce
    })
}