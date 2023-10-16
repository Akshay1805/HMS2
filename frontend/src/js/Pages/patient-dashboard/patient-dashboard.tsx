import React from "react";
import { HealmeLogo } from "../../../constants/constants";
import { HomePagePic } from "../../../constants/constants";

import { useEffect } from "react";
import "./_patient-dashboard.css";
import Cookies from "js-cookie";

const Patient_dash:React.FC = () => {
  var usr =Cookies.get("patname");
  const LogOut = ()=>{
    Cookies.set("patname","err");
    window.location.href = '/patient_login';
}
const ViewAppointments = ()=>{
    window.location.href = '/view_appointments';
}
const getappoin = ()=>{
   
    window.location.href = '/get_appointment';
}
const Seeprescription = ()=>{
   
    window.location.href = '/seeprecription';
}
useEffect(() => {
  //Runs on every render
  usr=Cookies.get("patname");
  if(usr==="err"){
      window.location.href = '/patient_login';
  }
});
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
                <div className="body-picture">
                    <img className="home-picture-img" src={ HomePagePic } alt="home page picture" />
                </div>
                <div className="body-content">
                    <div className="body-content-header">
                        Want Help ?
                    </div>
                    <div className="body-content-header">
                        Sure ...
                    </div>
                    <button type="button" className="sign-in-btns" onClick={getappoin}>
                    Get Appointment
                        </button>
                    <div className="sign-up-panel">
                        <button type="button" className="sign-in-btns" onClick={LogOut}>
                        Log Out
                        </button>
                        <button type="button" className="sign-in-btns" onClick={ViewAppointments}>
                        View Appointments
                        </button>
                        <button type="button" className="sign-in-btns" onClick={Seeprescription}>
                            See Prescriptions
                        </button>
                    </div>
                </div>
            </div>
            <div className="bottom-border">
            </div>
            <div className="copyrights-text">©HEALME TECHNOLOGIES</div>
        </div>
    )
}


export default Patient_dash;