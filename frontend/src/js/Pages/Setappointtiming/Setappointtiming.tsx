import React, { useEffect, useState } from "react";
import Cookies from "js-cookie";
import axios from "axios";
import "./_Setappointtiming.css";

const Setappointtiming: React.FC = () => {
  const [selectedDate, setSelectedDate] = useState(new Date());
  const t9 = '9:00:00';
  const t93 = '9:30:00';
  const t10 = '10:00:00';
  const t103 = '10:30:00';
  const usr = Cookies.get("patname");
  const secdoc = Cookies.get("docselect");
  const [s9, setS9] = useState<boolean>(true);
  const [s93, setS93] = useState<boolean>(true);
  const [s10, setS10] = useState<boolean>(true);
  const [s103, setS103] = useState<boolean>(true);
  
const Godash = ()=>{
    window.location.href = '/patient_dashboard';
}
  useEffect(() => {
    updateTiming();
    if (usr === "err") {
      window.location.href = '/patient_login';
    }
  }, [usr, selectedDate]);

  const LogOut = () => {
    Cookies.set("patname", "err");
    window.location.href = '/patient_login';
  };

  const fetchTiming = (y: string) => {
    const detail = {
      "usr": secdoc,
      "time": y,
      "date": selectedDate.toISOString().split('T')[0] // Get the date part as a string
    };

    return axios.post('/fetchfreetiming', detail)
      .then(response => {
        if (response.data.message === '1') {
          return true;
        } else {
          return false;
        }
      })
      .catch(error => {
        console.error('Error sending data to Flask akshay:', error);
        return false;
      });
  };

  const updateTiming = async () => {
    const newS9 = await fetchTiming(t9);
    setS9(newS9);
    const newS93 = await fetchTiming(t93);
    setS93(newS93);
    const newS10 = await fetchTiming(t10);
    setS10(newS10);
    const newS103 = await fetchTiming(t103);
    setS103(newS103);
  };

  const handleClick = (x: boolean, y: string) => {
    if(!x){
      alert("Slot not available");
    }
    else{
    Cookies.set('selectedtiming',y);
    Cookies.set('selecteddate',selectedDate.toISOString().split('T')[0]);
    window.location.href = '/confirm-timing';
    }
  };

  const validateDate = (y: any) => {
    const currentDate = new Date();
    const inputDate = new Date(y);

    if (inputDate >= currentDate) {
      setSelectedDate(inputDate);
    } else {
      alert("Please select a date not before the current date.");
    }
  };

  return (
    <div>
      <div>view time slot for</div>
      <div>Set timing page for {usr}</div>
      <div>You are a doctor pola</div>
      <div>
        <button className="LogoutButton" onClick={LogOut}>
          Log Out
        </button>
        <button className="GoDashButton" onClick={Godash}>
          Log Out
        </button>
      </div>
      <div className="container">
        <h1>Enter Date and Time</h1>
        <form>
          <label>Date:</label>
          <input
            type="date"
            id="dateInput"
            name="dateInput"
            value={selectedDate.toISOString().split('T')[0]}
            onChange={(e) => validateDate(e.target.value)}
          />
        </form>
      </div>
      <div>
        <body>
          <h2>Set Your Availability {selectedDate.toISOString().split('T')[0]} for Doctor {secdoc}</h2>
          <table>
            <thead>
              <tr>
                <th>Time Slot</th>
                <th>Availability</th>
              </tr>
            </thead>
            <tbody>
              <tr>
                <td>9:00 AM - 9:30 AM</td>
                <td>
                  <button className={s9 ? "available" : "not-available"} onClick={() => handleClick(s9, t9)}>
                    {s9 ? "Available" : "Not-available"}
                  </button>
                </td>
              </tr>
              <tr>
                <td>9:30 AM - 10:00 AM</td>
                <td>
                  <button className={s93 ? "available" : "not-available"} onClick={() => handleClick(s93, t93)}>
                    {s93 ? "Available" : "Not-available"}
                  </button>
                </td>
              </tr>
              <tr>
                <td>10:00 AM - 10:30 AM</td>
                <td>
                  <button className={s10 ? "available" : "not-available"} onClick={() => handleClick(s10, t10)}>
                    {s10 ? "Available" : "Not-available"}
                  </button>
                </td>
              </tr>
              <tr>
                <td>10:30 AM - 11:00 AM</td>
                <td>
                  <button className={s103 ? "available" : "not-available"} onClick={() => handleClick(s103, t103)}>
                    {s103 ? "Available" : "Not-available"}
                  </button>
                </td>
              </tr>
            </tbody>
          </table>
        </body>
      </div>
    </div>
  );
};

export default Setappointtiming;
