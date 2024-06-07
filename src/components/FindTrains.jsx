import React, { useState, useRef, useEffect } from 'react';
import { useNavigate } from "react-router-dom";
import { useAuth0 } from '@auth0/auth0-react';

import '../App.css';

const App = () => {
  const [fromStation, setFromStation] = useState('');
  const [toStation, setToStation] = useState('');
  const [trains, setTrains] = useState([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);
  const [tr, setTr] = useState(null);
  const [route, setRoute] = useState(null)
  const { loginWithRedirect, logout, user, isAuthenticated, isLoading } = useAuth0();
  const [show, setShow] = useState(false)
  const [isTrain, setIsTrain] = useState(false)
  const [isOpen, setIsOpen] = useState(true)
  const [search, setSearch] = useState("")
  const [showFrom, setShowFrom] = useState(false)
  const [showTo, setShowTo] = useState(false)
  const [clickBtn, setClickBtn] = useState(false)
  const ref = useRef(null)

  window.onload = function () {
    setShow(false)
  }

  useEffect(() => {
    console.log("changed")
    if(fromStation==="" || fromStation===null && !clickBtn){
      setShowFrom(false);
    }
    else{
      console.log("Here")
      setShowFrom(true);
    }
    if(toStation==="" || toStation===null){
      setShowTo(false);
    }
    else{
      console.log("Here")
      setShowTo(true);
    }
  })


  const [stations, setStations] = useState({
    "New Delhi": "NDLS",
    "Mumbai Central": "BCT",
    "Chennai Central": "MAS",
    "Howrah Junction": "HWH",
    "Bangalore City Junction": "SBC",
    "Secunderabad Junction": "SC",
    "Kolkata Station": "KOAA",
    "Chhatrapati Shivaji Maharaj Terminus (Mumbai)": "CSMT",
    "Ahmedabad Junction": "ADI",
    "Jaipur Junction": "JP",
    "Hyderabad Deccan Nampally": "HYB",
    "Pune Junction": "PUNE",
    "Patna Junction": "PNBE",
    "Lucknow Charbagh": "LKO",
    "Kanpur Central": "CNB",
    "Bhopal Junction": "BPL",
    "Vadodara Junction": "BRC",
    "Thiruvananthapuram Central": "TVC",
    "Guwahati": "GHY",
    "Nagpur Junction": "NGP",
    "Surat": "ST",
    "Bharuch": "BH",
    "Ankleshwar": "AKV",
    "Anand": "ANND",
    "Nadiad": "ND",
    "Vapi": "VAPI",
    "Borivali": "BVI",
    "Rajkot": "RJT",
    "Bhavnagar": "BVC",
    "Porbandar": "PBR",
    "Gandhinagar": "GNC",
    "Junagadh": "JND",
    "Dwarka": "DWK",
    "Bhuj": "BHUJ",
    "Kutch": "KUTCH",
    "Mundra": "MND",
    "Gandhidham": "GIMB",
    "Jamnagar": "JAM",
  })
  const navigate = useNavigate()

  const handleSearch = async () => {
    console.log("Searching...")

    setLoading(true);
    setError(null);
    try {
      const res = await fetch(`https://railapi-gz1l.onrender.com/trains/betweenStations?from=${fromStation}&to=${toStation}`);
      const response = await res.json()
      console.log(response)
      if (response.json.success) {
        setTrains(response.json.data);
      } else {
        setError('No trains found.');
      }
    } catch (err) {
      setError('Error fetching train data.');
    }
    setLoading(false);
    setIsTrain(true)
  };

  function formatDays(days) {
    let day = "";
    if (days[0] === '1') day = day + "M ";
    if (days[1] === '1') day = day + "T ";
    if (days[2] === '1') day = day + "W ";
    if (days[3] === '1') day = day + "T ";
    if (days[4] === '1') day = day + "F ";
    if (days[5] === '1') day = day + "S ";
    if (days[6] === '1') day = day + "S ";
    return day;
  }

  const handleTrainClick = async (train) => {
    let k = train
    console.log(train)
    let res = await fetch(`https://railapi-gz1l.onrender.com/trains/getTrain?TrainNo=${k}`)
    let data = await res.json();
    console.log(data)
    setTr(data)
  }

  const getRoute = (tNo) => {
    sessionStorage.setItem("trainNo", tNo)
    navigate("/getroute")
  }
  const handleChange = (e) => {
    console.log(e.target.value)
    setSearch(e.target.value)
  }
  const handleFrom = (e) => {
    console.log(e.target.value);
    setFromStation(e.target.value);
    setSearch(e.target.value);
  };
  const handleTo = (e) => {
    console.log(e.target.value);
    setToStation(e.target.value);
    setSearch(e.target.value);
  }
  const handleSelectFrom = (e) => {
    console.log(e.target.id);
    setFromStation(e.target.id);
    setShowFrom(false);
    setShowTo(false);
    setSearch("")
    setClickBtn(true)
  };
  const handleSelectTo = (e) => {
    console.log(e.target.id);
    setToStation(e.target.id);
    setShowFrom(false);
    setShowTo(false);
    setSearch("")
    setClickBtn(true)
  }

  return isAuthenticated ? (
    <><div className="App">
      <h1>Train Schedule</h1>

      <div className="form">
        {
          isAuthenticated && <><button onClick={() => logout()}>Logout</button><br /></>
        }
        {/* <select name="from" id="from" className="mx-2 p-1" open={isOpen} onChange={(e) => setFromStation(e.target.value)}>
          <option value="">FROM</option>
          {Object.entries(stations).map(([stationName, stationCode]) => (
            <option key={stationCode} value={stationCode}>
              {stationName}
            </option>
          ))}
        </select>
        <select name="to" id="to" className="mx-2 p-1" onChange={(e) => setToStation(e.target.value)}>
          <option value="">TO</option>
          {Object.entries(stations).map(([stationName, stationCode]) => (
            <option key={stationCode} value={stationCode}>
              {stationName}
            </option>
          ))}
        </select> */}
        <label htmlFor="">From:</label>
        <input
          style={{borderRadius: "10px", marginLeft: "1rem"}}
          id="fromInput"
          className="from"
          value={fromStation}
          onChange={handleFrom}
          type="text"
        />
        <div className="list">
          {showFrom && <ul>
            {Object.entries(stations).filter(([stationName, stationCode]) => stationName.toLowerCase().includes(search
            .toLowerCase())).map(([stationName, stationCode]) => (
              <li onClick={handleSelectFrom} id={stationCode} key={stationCode}>{stationName}{stationCode}</li>
            ))}
          
          </ul>}
        </div><br />
        <label htmlFor="">To:</label>
        <input
          style={{borderRadius: "10px", marginLeft: "2rem"}}
          id="toInput"
          className="to"
          value={toStation}
          onChange={handleTo}
          type="text"
        />
        <div className="list">
          {showTo && <ul>
            {Object.entries(stations).filter(([stationName, stationCode]) => stationName.toLowerCase().includes(search
            .toLowerCase())).map(([stationName, stationCode]) => (
              <li onClick={handleSelectTo} id={stationCode} key={stationCode}>{stationName}{stationCode}</li>
            ))}
          
          </ul>}
        </div>
        <button onClick={handleSearch}>Search</button>
      </div>
      {loading && <><img height="50px" src='/loader.gif' /><p>Finding trains.....</p></>}
      {error && <p className="error">{error}</p>}
      {!loading && trains.length > 0 && (
        <table>
          <thead>
            <tr>
              <th>Train No</th>
              <th>Train Name</th>
              <th>Source</th>
              <th>Destination</th>
              <th>Departure</th>
              <th>Arrival</th>
              <th>Travel Time</th>
              <th>Running Days</th>
            </tr>
          </thead>
          <tbody>
            {trains.filter((name) => name.train_base.train_name.toLowerCase().includes(search.toLowerCase())).map((train, index) => (
              <React.Fragment key={train.train_base.train_no}>
                <tr onClick={() => handleTrainClick(train.train_base.train_no)}>
                  <td>{train.train_base.train_no}</td>
                  <td>{train.train_base.train_name}</td>
                  <td>{train.train_base.from_stn_name}</td>
                  <td>{train.train_base.to_stn_name}</td>
                  <td>{train.train_base.from_time}</td>
                  <td>{train.train_base.to_time}</td>
                  <td>{train.train_base.travel_time}</td>
                  <td>{formatDays(train.train_base.running_days)}</td>
                  <td><button style={{ width: "100px" }} className='btn btn-dark' onClick={() => getRoute(train.train_base.train_no)}>Get Route</button></td>
                </tr>
                {tr && tr.data && tr.data.train_no === train.train_base.train_no && (
                  <tr>
                    <td colSpan="8">
                      <div className="information-bar">
                        <tr>
                          <td colSpan="8">
                            <div className="information-bar">
                              <h4>Train Info:</h4>
                              <td>Train No: {tr.data.train_no}</td>
                              <td>Train Name: {tr.data.train_name}</td>
                              <td>From: {tr.data.from_stn_name}</td>
                              <td>To: {tr.data.to_stn_name}</td>
                              <td>Type: {tr.data.type}</td>
                              <td>Distance: {tr.data.distance_from_to}</td>
                              <td>Average Speed: {tr.data.average_speed}</td>
                            </div>
                          </td>
                        </tr>
                      </div>
                    </td>
                  </tr>
                )}
              </React.Fragment>
            ))}
          </tbody>
        </table>

      )}
      {isTrain && <label htmlFor="search Train">Search Train By Name: </label>}
      {isTrain && <input ref={ref} onChange={(e) => handleChange(e)} type="text" />}
    </div></>






  ) : (show && <><h3>404 - (Access denied)    Please login or sign up to find trains</h3></>)
};

export default App;
