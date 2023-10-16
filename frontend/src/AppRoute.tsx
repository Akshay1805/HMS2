import React, { useState } from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Applink from "./Applink";
import Doctor_dash from "../src/js/Pages/doctor-dashboard/doctor-dashboard";
import DoctorLogin from "../src/js/Pages/Login/DoctorLogin/DoctorLogin";
import PatientLogin from "../src/js/Pages/Login/PatientLogin/PatientLogin";
import Home from './js/Pages/Home/Home';
import Patient_dash from './js/Pages/patient-dashboard/patient-dashboard';
import Doc_setting from './js/Pages/Doctor-settiming/doctor-settiming';
import GetAppointment from './js/Pages/getappointment/getappointment';
import Doc_select from './js/Pages/doc-select/doc-select';
import Confirmtiming from './js/Pages/Confirmtiming/Confirmtiming';
import View_appointment from './js/Pages/ViewAppointment/ViewAppointment';
import Setappointtiming from './js/Pages/Setappointtiming/Setappointtiming';
import Test from './js/Pages/tem/tem';
import Seeprecription from './js/Pages/Seeprescription/seeprescription';
import Viewdoctorappointment from './js/Pages/Viewdoctorappointment/Viewdoctorappointment';
//import ProtectedRoute from './ProtectedRoute'; // Import the ProtectedRoute component

function App() {
  
  
  // Your authentication logic should set isAuthenticated to true upon successful login

  return (
    <Router>
      <Routes>
        <Route path='/' element={<Applink />} />
        <Route path='/doctor_login' element={<DoctorLogin />} />
        <Route path='/patient_login' element={<PatientLogin />} />
        <Route path='/home' element={<Home />} />
        <Route path='/patient_dashboard' element={<Patient_dash />} />
        <Route path='/doctor_set_timing' element={<Doc_setting />} />        <Route
          path='/doctor_dashboard' element={<Doctor_dash/>}/>
        <Route path='/get_appointment' element={<GetAppointment />} />
        <Route path='/doctor-select' element={<Doc_select />} />
        <Route path='/confirm-timing' element={<Confirmtiming />} /> 
        <Route path='/test' element={<Test />} /> 
        <Route path='/seeprecription' element={<Seeprecription />} /> 
        <Route path='/view_doc_appointment' element={<Viewdoctorappointment />} /> 
        <Route path='/select-timing' element={<Setappointtiming />} />
        <Route path='/view_appointments' element={<View_appointment />} /> 
      </Routes>
      
    </Router>
  );
}

export default App;
