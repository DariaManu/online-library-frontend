import React from "react";
import {useContext} from "react";
import {AuthContext} from "../auth/AuthContextProvider";
import {Navigate, NavLink} from "react-router";

export const ApplicationNavBar = () => {
    const {auth, logout} = useContext(AuthContext);

    if (auth === null) {
        return <Navigate to={"/login"} />
    }

    return (
        <div className="applicationNavBar">
            <div className="applicationNavBarUserInfo">
                <div className="applicationNavBarText">
                    {auth.firstName} {auth.lastName}
                </div>

                <div className="applicationNavBarElement">
                    <NavLink to="/login" onClick={logout} style={{ textDecoration: 'none' }}>
                        <div className="applicationNavBarText">
                            Logout
                        </div>
                    </NavLink>
                </div>
            </div>
        </div>
    )
}