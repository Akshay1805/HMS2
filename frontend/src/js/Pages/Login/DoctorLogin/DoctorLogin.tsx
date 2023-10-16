import React from "react";
import { useState } from 'react';
import { HealmeLogo } from "../../../../constants/constants";

import "../DoctorLogin/_doctorlogin.css"

import axios from 'axios';
import Cookies from "js-cookie";


const DoctorLogin: React.FC = () =>{
    const [password, setPassword] = useState('');
    const [email, setEmail] = useState('');
    const errmsg=document.getElementById("msg");
    const crtstatus = "OK";
    Cookies.set("docname","err");
    const tem = Cookies.get("docname");
    const handlelogoButtonClick = () => {
        window.location.href = '/home'; // Navigate to the "/doctor" route
      };
      const handleUpClick = () => {
        window.location.href = '/dashboard';

    }
    const handleClick = () => {
        const credentialsent = {
            email: email,
            pass: password,
        };
        axios.post('/docverify', credentialsent)
    .then((response) => {
        Cookies.set("docname",response.data['message']);
        

            window.location.href = '/doctor_dashboard';
    })
    .catch((error) => {
        if(errmsg!=null)
        errmsg.textContent="Wrong credititials";
        console.error('Error sending data to Flask akshay:', error);
    });
        
} 
    return(
        <div className="page-container">
            <img className="logo-img" src={ HealmeLogo } alt="Logo" onClick={handlelogoButtonClick}/>
            <div className="login-page">
                <div className="introduction-text">
                    Welcome to HEALME, Connect to Cure!
                </div>
                <div className="login-box-component flex">                
                    <div className="patient-login-text">
                        Doctor Login 
                    </div>
                    <div id="msg">
                        
                    </div>
                    <div className="credentials">
                            <input
                                className="credential-input-box p-3.5"
                                type="text"
                                placeholder={"Enter your email"} 
                                onChange={(event) => setEmail(event.target.value)}/>
                            <input
                                className="credential-input-box p-3.5"
                                type="password"
                                placeholder={"Password"}
                                onChange={(event) => setPassword(event.target.value)}/>                    
                    </div>
                    <div className="login-in-options">
                        <div className="login-in-btn">
                            <button
                            onClick={handleUpClick}
                            >
                            Sign Up
                            </button>
                        </div>
                        <div className="login-in-btn">
                            <button
                            onClick={handleClick}
                            >
                            Login
                            </button>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    )
}

export default DoctorLogin;