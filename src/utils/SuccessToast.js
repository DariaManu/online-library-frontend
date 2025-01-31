import React from "react";
import {toast} from "react-toastify";

export const handleSuccess = (text) => {
    toast.success(text, {
        position: "top-center",
        autoClose: 5000
    })
}