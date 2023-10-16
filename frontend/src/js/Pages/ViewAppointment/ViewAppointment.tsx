import React, { useEffect,useState } from "react";
import { HealmeLogo } from "../../../constants/constants";
import { DocPic } from "../../../constants/constants";
import './_ViewAppointment.css';
import Cookies from "js-cookie";
import axios from "axios";

const View_appointment:React.FC = () => {
    const usr = Cookies.get("patname");
    const [data, setdata] = useState([ { 'name':'err','time':'err','date':'err','special':'err'}, ]);
    const [delflag, setdelflag]=useState('0');
    const Logout = ()=>{
        Cookies.set("patname", "err");
        window.location.href = '/patient_login';
    }
    const Godash = ()=>{
        window.location.href = '/patient_dashboard';
    }
    const deleteappointment = (n:string,t:string,d:string) => {

        const detleteappoint={
            'name':n,
            'time':t,
            'date':d,
        }
        axios.post('/deleteappointment', detleteappoint)
            .then((response) => {
                alert('deleted');
                setdelflag('1');
                setdelflag('0');
  
            })
            .catch((error) => {
               
            }); // place whatever site you want to navigate to 
      };
      const detail ={
        'patname':Cookies.get('patname')
      }
      useEffect(() => {
        // Fetch data from your API or source and update the state
        if (usr === "err") {
            window.location.href = '/patient_login';
          }
        const fetchData = async () => {
            axios.post('/fetchappointment', detail)
            .then((response) => {
                setdata(response.data);
               
                
            })
            .catch((error) => {
               
            });
        };
      
        fetchData(); // Call the fetch data function when the component mounts
      }, [usr,delflag]); 
  
    return (
        <div className="home-page-container">
        <div className="header-container">
            <div className="logo-container">
                <img className="logo-img" src={HealmeLogo} alt="Logo" />
            </div>
            <button type="button" className="doctor-btn" onClick={Logout}>
                         Log out
                    </button>
                    <button type="button" className="doctor-btn" onClick={Godash}>
                         home
                    </button>
        </div>
        
        <div className="appbody-container" id='list'>
            {data.map((item, index) => (
            <div className="doctor-confirm-panel" key={index}>
                    <div className="doc-photo">
                        <img className="doc" src={DocPic} alt="Pic of the doctor" />
                    </div>
                    <div className="appointment-description">
                        <div>
                            {item.name}
                        </div>
                        <div>
                            {item.time}
                        </div>
                        <div>
                            {item.date}
                        </div>
                        <div>
                            {item.special}
                        </div>
                    </div>
                    <button type="button" className="doctor-btn" onClick={()=>deleteappointment(item.name,item.time,item.date)}>
                         delete
                    </button>
            </div>
            ))}


        </div>
       
    </div>
    )
}

export default View_appointment;