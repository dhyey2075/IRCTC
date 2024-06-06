import React, { useState, useEffect } from "react";
import { useAuth0 } from '@auth0/auth0-react';

import "../App.css";

function TicketDetails() {
  const [ticketData, setTicketData] = useState({});
  const [pnr, setPnr] = useState("");
  const [flag, setFlag] = useState(false);
  const [error, setError] = useState("");
  const { loginWithRedirect, logout, user, isAuthenticated, isLoading } = useAuth0();
  const [show, setShow] = useState(false)

    
    window.onload = function(){
      setShow(true)
    }


  useEffect(() => {
    setTicketData({});
  }, []);


    const {
      Pnr,
      TrainNo,
      TrainName,
      Doj,
      From,
      To,
      DepartureTime,
      ArrivalTime,
      Class,
      TrainStatus,
      BookingFare,
      PassengerStatus,
      Rating,
      FoodRating,
      PunctualityRating,
      CleanlinessRating,
    } = ticketData;

  const fetchPNR = async (pnr) => {
    if (error === "") {
      try {
        let url = `https://1n323595-3000.inc1.devtunnels.ms/trains/pnrstatus?pnr=${pnr}`;
        let res = await fetch(url, { method: "GET" });
        if (!res.ok) {
          throw new Error("Network response was not ok");
        }
        let data = await res.json();
        console.log(data);
        if (data.error || data.data.TrainNo === null) {
          setError(data.error);
          console.log("Error", data.error || data.data.TrainNo);
          setTicketData({});
          return;
        }
        // You can update the state with the fetched data if needed
        setTicketData(data.data);
      } catch (error) {
        setError(error);
        console.error("There was a problem with the fetch operation:", error);
      }
    }
  };
  const handleChange = (e) => {
    console.log(pnr);
    setPnr(e.target.value);
  };

  const handleClick = (e) => {
    console.log("Clicked");
    console.log(pnr, "Clicked");
    setFlag(true);
    setError("");
    console.log("Error", error)
    fetchPNR(pnr);
    e.target.click();
  };
  return isAuthenticated ? (
    <div className="">
      <div className="header">
        <h1>Train Ticket Details</h1>
        <label htmlFor="pnrinput">Enter PNR: </label>
        <br />
        <input
          type="text"
          className="pnrinput"
          value={pnr}
          onChange={handleChange}
        />
        <br />
        <p className="pnr">PNR: {Pnr}</p>
        <button onClick={handleClick}>Fetch PNR Details</button>
      </div>
      {error !== "" && (
        <p className="error">
          Invalid PNR or PNR is expired....Please enter a valid PNR
        </p>
      )}
      {pnr !== "" && flag && error === "" && (
        <>
          <div className="section">
            <h2>Train and Journey Details</h2>
            <p>
              <span className="info">Train:</span> {TrainNo} {TrainName}
            </p>
            <p>
              <span className="info">From:</span> {From}
            </p>
            <p>
              <span className="info">To:</span> {To}
            </p>
            <p>
              <span className="info">Departure:</span> {DepartureTime}
            </p>
            <p>
              <span className="info">Arrival:</span> {ArrivalTime}
            </p>
            <p>
              <span className="info">Date of Journey:</span> {Doj}
            </p>
            <p>
              <span className="info">Class:</span> {Class}
            </p>
            <p>
              <span className="info">Status:</span> {TrainStatus}
            </p>
          </div>
          <div className="section">
            <h2>Passenger Information</h2>
            {PassengerStatus &&
              PassengerStatus.map((passenger, index) => (
                <p key={index}>
                  <span className="info">Passenger {passenger.Number}:</span>{" "}
                  Coach: {passenger.Coach}, Berth: {passenger.Berth}, Status:{" "}
                  {passenger.CurrentStatus}
                </p>
              ))}
          </div>
          <div className="section">
            <h2>Additional Information</h2>
            <p>
              <span className="info">Fare:</span> ₹{BookingFare}
            </p>
            <div className="ratings">
              <div className="rating">
                <p>Overall Rating</p>
                <p>{Rating}</p>
              </div>
              <div className="rating">
                <p>Food Rating</p>
                <p>{FoodRating}</p>
              </div>
              <div className="rating">
                <p>Punctuality Rating</p>
                <p>{PunctualityRating}</p>
              </div>
              <div className="rating">
                <p>Cleanliness Rating</p>
                <p>{CleanlinessRating}</p>
              </div>
            </div>
          </div>
        </>
      )}
    </div>
  ) : (show && <><h3>404 - (Access denied)    Please login or sign up to find trains</h3></>)
}
export default TicketDetails;
