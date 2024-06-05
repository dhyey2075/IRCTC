import { React, useState } from 'react'
import { Link } from 'react-router-dom'

const Route = () => {
  const [tNo, setTNo] = useState(sessionStorage.getItem("trainNo"))
  const [data, setData] = useState(null)
  const fetchdata = async (no)=>{
    let res = await fetch(`https://railapi-gz1l.onrender.com/trains/getroute?trainNo=${no}`)
    let dat = await res.json();
    console.log("data", data)
    console.log("dat",dat)
    setData(dat.data)
    console.log("data",data)
  }
  fetchdata(tNo);
  return (
    <div className="route-info">
      <h1>Train Route Information</h1>
      <button className='btn btn-dark'><a href="/gettrains">Back to Trains</a></button>
      <table>
        <thead>
          <tr>
            <th>Source Station Name</th>
            <th>Source Station Code</th>
            <th>Arrival</th>
            <th>Departure</th>
            <th>Distance (km)</th>
            <th>Day</th>
            <th>Zone</th>
          </tr>
        </thead>
        <tbody>
          {data && data!=="Train not found" && data.map((station, index) => (
            <tr key={station.arrive}>
              <td>{station.source_stn_name}</td>
              <td>{station.source_stn_code}</td>
              <td>{station.arrive}</td>
              <td>{station.depart}</td>
              <td>{station.distance}</td>
              <td>{station.day}</td>
              <td>{station.zone}</td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}

export default Route
