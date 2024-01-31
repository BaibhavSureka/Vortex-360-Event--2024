// NewProfile.jsx
import React, { useState } from 'react';
import './newprofile.css';
import isLoggedIn from '../../auth/isLoggedIn';
import { Navigate, Outlet } from 'react-router-dom';
import { useEffect } from 'react';
import axios from "axios";
import Cookies from "universal-cookie";
import { useNavigate } from "react-router-dom";

const NewProfile = () => {
  const cookies = new Cookies();

  

  const initialUserData = {
    "name": "Sriram",
    "reg_number": "21BDG0921",
    "gender": "male",
    "email": "sriram.r2021a@vitstudent.ac.in",
    "phone_number": "9821314536",
    "vit_email": "sriram.r2021a@vitstudent.ac.in"
  };

  const [edit, setEdit] = useState(false);
  const [userData, setUserData] = useState(initialUserData);

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setUserData({ ...userData, [name]: value });
  };

  const renderFields = [
    { label: "Name", key: "name" },
    { label: "Register number", key: "reg_number" },
    { label: "Gender", key: "gender" },
    { label: "Email", key: "email" },
    { label: "VIT Email", key: "vit_email" },
    { label: "Mobile Number", key: "phone_number" }
  ];

  async function fetchData(getting) {
    var config = {
      headers: { "Accept": "/", "token": `${ getting }`
  }
}
console.log(config);
let response = await axios.get('http://localhost:5000/profile/read', config);
    if (response.status === 201) {
    setUserData(response.data)
}
    }

  const handleSaveChanges = () => {
    // You can add logic here to save changes to the backend if needed
    setEdit(false);
    // Display a success message or perform additional actions as needed
  };

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

  return (
    <div className="body gradient-background">
      <div className="profile">
        <div>
          <h1>Profile</h1>
        </div>
        {renderFields.map((field) => (
          <div className="text-box" key={field.key}>
            <label>{field.label} :</label>
            {edit ? (
              <input
                type="text"
                name={field.key}
                value={userData[field.key]}
                onChange={handleInputChange}
                className="input"
              />
            ) : (
              <div className="input">{userData[field.key]}</div>
            )}
          </div>
        ))}
        <div>
          {edit ? (
            <button className="button" onClick={handleSaveChanges}>
              Save Changes
            </button>
          ) : (
            <button className="button" onClick={() => setEdit(true)}>
              Edit Profile
            </button>
          )}
        </div>
        {isLoggedIn() ? <Outlet/> : <Navigate to="/login" />}
      </div>
    </div>
  );
};

export default NewProfile;
