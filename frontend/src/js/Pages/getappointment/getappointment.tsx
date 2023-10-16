import React from "react";
import { HealmeLogo } from "../../../constants/constants";
import { HomePagePic } from "../../../constants/constants";

import "./_getappointment.css";
import Cookies from "js-cookie";

const GetAppointment:React.FC = () => {
    const Logout = ()=>{
        Cookies.set("patname", "err");
        window.location.href = '/patient_login';
    }
    const Godash = ()=>{
        window.location.href = '/patient_dashboard';
    }
    const handleDoctorButtonClick = (x:string) => {
        Cookies.set('doctype',x);
        window.location.href = '/doctor-select'; // Navigate to the "/doctor" route
      };
    
    return (
        <div className="home-page-container">
            <div className="header-container">
                <div className="logo-container">
                    <img className="logo-img" src={ HealmeLogo } alt="Logo" />
                </div>
                <button type="button" className="doctor-btn" onClick={Logout}>
                         Log out
                    </button>
                    <button type="button" className="doctor-btn" onClick={Godash}>
                         home
                    </button>
            </div>
            <div className="body-container">
                <div className="body-content">
                    <div className="options-panel">
                        <button type="button" className="doctor-btn" onClick={()=>handleDoctorButtonClick('Dentist')}>
                            Dentist
                        </button>
                        <button type="button" className="doctor-btn" onClick={()=>handleDoctorButtonClick('Dermatology')}>
                            Dermatology
                        </button>
                        <button type="button" className="doctor-btn" onClick={()=>handleDoctorButtonClick('Cardiology')}>
                            Cardiology
                        </button>
                        <button type="button" className="doctor-btn" onClick={()=>handleDoctorButtonClick('ENT')}>
                            ENT
                        </button>
                    </div>
                </div>
                <div className="body-picture">
                    <img className="home-picture-img" src={ HomePagePic } alt="home page picture" />
                </div>
            </div>
            <div className="bottom-border">
            </div>
            <div className="copyrights-text">©HEALME TECHNOLOGIES</div>
        </div>
    )
}

export default GetAppointment;