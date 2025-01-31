import React from "react";
import {toast} from "react-toastify";

export const handleError = (text) =>
    toast.error(text, {
        position: "top-center",
        autoClose: 5000
    });