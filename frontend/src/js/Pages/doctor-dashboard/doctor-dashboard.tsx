import React from "react";
import { HealmeLogo } from "../../../constants/constants";
import { HomePagePic } from "../../../constants/constants";

import { useEffect } from "react";
import "./_doctor-dashboard.css";
import Cookies from "js-cookie";

const Doctor_dash:React.FC = () => {
  var usr =Cookies.get("docname");
  const viewdocappoin =()=>{
      window.location.href = '/view_doc_appointment';
  }
  const LogOut = ()=>{
      Cookies.set("docname","err");
      window.location.href = '/doctor_login';
  }
  const SetTiming = ()=>{
      window.location.href = '/doctor_set_timing';
  }
  useEffect(() => {
      //Runs on every render
      usr=Cookies.get("docname");
      if(usr==="err"){
          window.location.href = '/doctor_login';
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
                    
                    <div className="sign-up-panel">
                        <button type="button" className="sign-in-btns" onClick={LogOut}>
                        Log Out
                        </button>
                        <button type="button" className="sign-in-btns" onClick={SetTiming}>
                        Set timing
                        </button>
                        <button type="button" className="sign-in-btns" onClick={viewdocappoin}>
                        View Todays apppointments
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


export default Doctor_dash;