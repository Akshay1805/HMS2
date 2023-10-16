import React, { useEffect,useState } from "react";
import { HealmeLogo } from "../../../constants/constants";
import { DocPic } from "../../../constants/constants";
import './_Viewdoctorappointment.css';
import Cookies from "js-cookie";
import axios from "axios";

const Viewdoctorappointment:React.FC = () => {
    const usr = Cookies.get("docname");
    const [data, setdata] = useState([ { 'name':'err','time':'err','date':'err','special':'err'}, ]);
    const [delflag, setdelflag]=useState('0');
    const Logout = ()=>{
        Cookies.set("docname", "err");
        window.location.href = '/doctor_login';
    }
    const Godash = ()=>{
        window.location.href = '/doctor_dashboard';
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
        'docname':Cookies.get('docname')
      }

      useEffect(() => {
        // Fetch data from your API or source and update the state
        if (usr === "err") {
        window.location.href = '/doctor_login';
          }
        const fetchData = async () => {
            axios.post('/fetchappointmentdoctor', detail)
            .then((response) => {
                setdata(response.data);
               
                
            })
            .catch((error) => {
               
            });
        };
      
        fetchData(); // Call the fetch data function when the component mounts
      }, [usr,delflag]); 
      const [selectedFile, setSelectedFile] = useState<File | null>(null);
      const [message, setMessage] = useState(""); // State for the message
    
      const handleFileChange = (event: React.ChangeEvent<HTMLInputElement>) => {
        const file = event.target.files && event.target.files[0];
        setSelectedFile(file);
      };
    
     
    
      const handleFileUpload = (x:any) => {
        if (selectedFile) {
          const formData = new FormData();
          formData.append("pdfFile", selectedFile);
          setMessage(x.name +x.time+x.date);
          // Append the message to the FormData
          formData.append("message", message);
          formData.append("name", x.name);
          formData.append("time", x.time);
          formData.append("date", x.date);

    
          axios
            .post("/upload", formData, {
              headers: {
                "Content-Type": "multipart/form-data",
              },
            })
            .then((response) => {
              alert("File uploaded successfully");
              // You can handle success here, e.g., show a success message to the user
            })
            .catch((error) => {
              console.error("File upload failed", error);
              // Handle errors, e.g., show an error message to the user
            });
        }
      };
    
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
                           Patient name: {item.name}
                        </div>
                        <div>
                            Time :{item.time}
                        </div>
                        <div>
                            date :{item.date}
                        </div>
                        
                    </div>
                    <div>
      <h1>Upload a PDF file</h1>
      <form encType="multipart/form-data">
        <input
          type="file"
          name="pdfFile"
          onChange={handleFileChange}
        />
        
        <button type="button" onClick={()=>handleFileUpload(item)}>
          Upload Prescription
        </button>
      </form>
    </div>

            </div>
            ))}


        </div>
       
    </div>
    )
}

export default Viewdoctorappointment;