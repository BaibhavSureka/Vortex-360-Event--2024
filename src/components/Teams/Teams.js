import React, { useState, useEffect } from 'react'
import { useNavigate } from "react-router-dom";
import isLoggedIn from "../../auth/isLoggedIn";
import { Navigate, Outlet } from "react-router-dom";
import axios from "axios";
import Cookies from "universal-cookie";
function Teams() {
    const cookies = new Cookies();
    const navigate = useNavigate()
    async function fetchData(getting) {
        var config = {
            headers: { "Accept": "/", "token": `${ getting }`
    }
}
console.log(config);
let response = await axios.get('http://localhost:5000/teams/read', config);
if (response.status === 200) {
    if (response.data.success) {
        navigate("/user/teamprofile")
    }
    else {
        navigate("/user/teamreg")
    }
}
    }
async function retrieve() {
    let getting = await cookies.get("jwt_authorization")
    cookies.get({
        name: "jwt_authorization",
    })
    if (getting) {
        console.log(getting);
        fetchData(getting);
        console.log("Redirected");
    }
    else {
        console.log("error");
    }
}
useEffect(() => {
    retrieve()
}, [])


return <div>
    {isLoggedIn() ? <Outlet /> : <Navigate to="/login" />}
</div>;
}

export default Teams;