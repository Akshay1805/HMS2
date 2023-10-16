import React from "react";
import { HealmeLogo } from "../../../constants/constants";
import { HomePagePic } from "../../../constants/constants";

import "./_home.css";

const Home:React.FC = () => {

    const handleDoctorButtonClick = () => {
        window.location.href = '/doctor_login'; // Navigate to the "/doctor" route
      };
    
      const handlePatientButtonClick = () => {
        window.location.href = '/patient_login'; // Navigate to the "/patient" route
      };
    
    return (
        <div className="home-page-container">
            <div className="header-container">
                <div className="logo-container">
                    <img className="logo-img" src={ HealmeLogo } alt="Logo" />
                </div>
                <div>

                </div>
            </div>
            <div className="body-container">
                <div className="body-content">
                    <div className="body-content-header">
                        Consulting Made Easy
                    </div>
                    <div className="sign-up-panel">
                        <button type="button" className="sign-in-btns" onClick={handleDoctorButtonClick}>
                            Doctor
                        </button>
                        <button type="button" className="sign-in-btns" onClick={handlePatientButtonClick}>
                            Patient
                        </button>
                    </div>
                </div>
                <div className="body-picture">
                    <img className="home-picture-imgg" src={ HomePagePic } alt="home page picture" />
                </div>
            </div>
            <div className="bottom-border">
            </div>
            <div className="copyrights-text">©HEALME TECHNOLOGIES</div>
        </div>
    )
}

export default Home;