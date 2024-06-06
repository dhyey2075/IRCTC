import React, { useState } from 'react';
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
  const [search, setSearch] = useState("")

    
  window.onload = function(){
    setShow(false)
  }

  const [stations, setStations] = useState([
    "ST", "ADI", "BRC", "NVS", "RJT", "ANND", "VAPI", "ND", "BH", "BL", "PNU", "AKV", "JAM", "UDN", "BIM", "GIMB", "BHUJ", "VG", "MSH", "DHD", "SUNR", "SIOB", "MAN", "MHD", "BTD", "DWK", "KSB", "MYG", "JND", "KIM", "VRL", "UVD", "UBR", "BVC", "PBR", "GDA", "WKR", "HAPA", "SBIB", "BCOB", "CYI", "KMBL", "UJA", "DHG", "SID", "GDL", "THAN", "JLR", "BKNG", "BLDI", "KSD", "DRL", "PLJ", "AI", "VRR", "MALB", "AML", "WSJ", "AJE", "CLDY", "MLHA", "NUD", "MRL", "DISA", "HVD", "SBT", "RDHP", "LMK", "PDH", "KBRV", "BHTA", "BNVD", "VS", "BJD", "VDA", "SNLR", "LPJ", "DEOR", "ABD", "PAD", "KLL", "NIU", "PAO", "BLD", "PPD", "SMLA", "CVR", "SAU", "GNC", "SJN", "AAR", "SAT", "LTR", "JDH", "MTHP", "RWO", "BAH", "CHP", "SYN", "UA", "ITA", "VRX", "KHDB", "LKZ", "PDF", "DL", "KEMA", "JKA", "GOP", "BMSB", "BIO", "MOL", "PLM", "ANAS", "RUT", "CPN", "GTT", "DJI", "CE", "BHY", "SKR", "BDDR", "PFL", "BJW", "COE", "KRSA", "WAB", "MAM", "RNO", "JDN", "OKHA", "SMNH", "DLJ", "SRGT", "SOJN", "JVN", "VYA", "DQN", "SGD", "SVKD", "LMO", "LM", "RLA", "DAS", "SCH", "BVP", "WC", "BHET", "WTJ", "BIY", "DGI", "MVI", "RUR", "PTN", "CHM", "KNLS", "SOA", "VTJ", "NGA", "ALB", "UJ", "MID", "ALMR", "ACL", "GNST", "JRS", "VDH", "ATUL", "CDA", "LTD", "BJUD", "KDMR", "KSE", "KDI", "GER", "KMLI", "BUBR", "TBV", "NZG", "MDRA", "KSUA", "KTAL", "SDHR", "SDGM", "ADD", "SYQ", "KTNA", "CASA", "VTA", "JUL", "VJK", "SHLV", "VVV", "SNSN", "CBCC", "KDSD", "KVNJ", "BILK", "BKRL", "CHIB"
  ])
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

  const getRoute = (tNo)=>{
    sessionStorage.setItem("trainNo", tNo)
    navigate("/getroute")
  }
  const handleChange = (e)=>{
    console.log(e.target.value)
    setSearch(e.target.value)
  }

  return isAuthenticated ? (
    <><div className="App">
    <h1>Train Schedule</h1>
    
    <div className="form">
      <select name="from" id="from" className="mx-2 p-1" onChange={(e) => setFromStation(e.target.value)}>
        <option value="">FROM</option>
        {stations.map((st) => <option key={st} value={st}>{st}</option>)}
      </select>
      <select name="to" id="to" className="mx-2 p-1" onChange={(e) => setToStation(e.target.value)}>
        <option value="">TO</option>
        {stations.map((st) => <option key={st} value={st}>{st}</option>)}
      </select>
      <button onClick={handleSearch}>Search</button>
    </div>
    {loading && <><img height="50px" src='../../loader.gif'/><p>Finding trains.....</p></>}
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
        {trains.filter((name) => name.train_base.train_name.includes(search)).map((train, index) => (
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
      <td><button style={{width:"100px"}} className='btn btn-dark' onClick={() => getRoute(train.train_base.train_no)}>Get Route</button></td>
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
    <label htmlFor="search Train">Search Train By Name: </label>
    <input onChange={(e)=>handleChange(e)} type="text" />
  </div></>






  ) : (show && <><h3>404 - (Access denied)    Please login or sign up to find trains</h3></>)
};

export default App;
