import React, { useEffect } from "react";
import { HealmeLogo } from "../../../constants/constants";
import { DocPic } from "../../../constants/constants";
import './_Confirmtiming.css';
import Cookies from "js-cookie";
import axios from "axios";

const Confirmtiming:React.FC = () => {
    const Logout = ()=>{
        Cookies.set("patname", "err");
        window.location.href = '/patient_login';
    }
    const Godash = ()=>{
        window.location.href = '/patient_dashboard';
    }
    
      const confirmButtonClick = () => {
        const detail = {
            "usr": Cookies.get('docselect'),
            "time": Cookies.get('selectedtiming'),
            "date":Cookies.get('selecteddate'), // Get the date part as a string
            "patname":Cookies.get("patname")
          };
        axios.post('/confirmappointment', detail)
    .then((response) => {
        Cookies.set("docname",response.data['message']);
            
    
                window.location.href = '/patient_dashboard';
                alert("Booked");
    })
    .catch((error) => {
       
    });
        
}
  
  
    return (
        <div className="confirm-timing-home-page-container">
            <div className="confirm-timing-header-container">
                <div className="confirm-timing-logo-container">
                    <img className="confirm-timing-logo-img" src={ HealmeLogo } alt="Logo" />
                </div>
                    <button type="button" className="confirm-timing-doctor-btn" onClick={Logout}>
                         Log out
                    </button>
                    <button type="button" className="confirm-timing-doctor-btn" onClick={Godash}>
                         home
                    </button>
            </div>
           
            <div className="confirm-timing-body-container" id='list'>
                <div className="confirm-timing-doctor-confirm-panel" >
                    <div className="confirm-timing-doc-photo">
                         <img className="confirm-timing-doc" src= { DocPic } alt="Pic of the doctor" />
                    </div>
                    <div className="confirm-timing-appointment-description">
                        <div>
                        {Cookies.get('docselect')}
                        </div>
                        <div>  
                        {Cookies.get('doctype')}
                        </div>
                        <div>  
                            {Cookies.get('selectedtiming')} 
                        </div>
                        <div>  
                            {Cookies.get('selecteddate')} 
                        </div>
                    </div>
                    <button type="button" className="confirm-timing-doctor-btn" onClick={confirmButtonClick}>
                         Confirm Appointment
                    </button>
                </div>
                
            </div>
        </div>
    )
}

export default Confirmtiming;