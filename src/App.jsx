import React, { useState, useEffect } from 'react';
import './reset.css'
import './App.css';
import useAsyncFetch from './useAsyncFetch'; // a custom hook
import BarChart from "./BarChart";
import MonthPicker from './MonthPicker';
import PropTypes from 'prop-types'; //for month-year-picker

function App() {
  const[seeButton, setSeeButton] = useState("See less")
  
  let [date, setDate] = useState({'year': 2022, 'month': 4});
  let months = [ "January", "February", "March", "April", "May", "June", 
      "July", "August", "September", "October", "November", "December" ];
  
  function changeYear(y) {
    console.log("change date to ", date.month, "/", y);
    setDate({'year': y, 'month': date.month},);
  }
  
  function changeMonth(m) {
    console.log("change date to ", m, "/", date.year);
    setDate({'year': date.year, 'month': m});
  }
  
  function SeeMoreButton() {
    if(seeButton == "See more")
      return (
        <button id="seeButton" onClick={function() {setSeeButton("See less");}}>See less</button>
      )
    else
      return (
        <button id="seeButton" onClick={function() {setSeeButton("See more");}}>See more</button>
      )
  }
  function Hidden() {    
    if(seeButton == "See more")
      return (
        <div className="hidden">
          <WaterDisplay date={date}/>
          <div className="hiddenRight">
            <p id="hiddenP">
              Here's a quick look at some of the data on reservoirs from the <a href="https://cdec.water.ca.gov/index.html">California Data Exchange Center</a>, which consolidates climate and water data from multiple federal and state government agencies, and  electric utilities.  Select a month and year to see storage levels in the eleven largest in-state reservoirs.
            </p>
            <div className="monthPicker">
              <p id="changeMonth">Change month:</p>
              <MonthPicker
                date = {date}
                yearFun = {changeYear}
                monthFun = {changeMonth}
              />
            </div>
          </div>
        </div>
      )
    else
      return (
        <div></div>
      )
  }
  

  function WaterChart(reservoirs) {
    let bS = 0.6; //bar percentage size
    let res = reservoirs.reservoirs;
    let chartData = {
        labels: res.map(data => data.name),
        datasets: [
          {
            label: "Current Capacity",
            data: res.map(data => data.value),
            barPercentage: bS,
            backgroundColor: ['rgb(66, 145, 152)'],  
          },
          {
            label: "Total Capacity",
            barPercentage: bS,
            data: [45.52, 35.38, 24.48, 24, 10.62, 20.3, 16.02],
            backgroundColor: ['rgb(120, 199, 227)'],
          },
        ],
      };
      return (
        <div className="chart"> 
          <BarChart chartData={chartData}/> 
        </div>
      )
  }

  function WaterDisplay(date) {
    console.log("in WaterDisplay");
    // state var reservoirs will contain the array of water storage data
    // (e.g. an element {stationId: "SHA", name: "Shasta", value: 340})
    const [reservoirs, setReservoirs] = useState([]);
    // call the custom fetch hook, passing the date and the callback functions it can use
    useAsyncFetch(`/query/getList`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(date.date)
    }, thenFetch, catchFetch); 
    
    function thenFetch (res) {
      console.log("thenFetch");
      setReservoirs(res);
    }
    
    function catchFetch (error) {
      console.log(error);
    }
  
    // will re-render once state variable reservoirs changes
    if (reservoirs) {
      return (
          <WaterChart reservoirs={reservoirs}> </WaterChart>
      )
    } else {
      return (<p>
        loading...
      </p>);
    }
  }

  // build the entire
  return (
      <div>
        <hr id="stripe" />
        <main>
          <div className="header">
            <h1>Water storage in California reservoirs</h1>
          </div>
          <div className="alwaysShown">
            <div className="paraButton">
              <p id="paragraph1">
                California's reservoirs are part of a <a href="https://www.ppic.org/wp-content/uploads/californias-water-storing-water-november-2018.pdf">complex water storage system</a>.  The State has very variable weather, both seasonally and from year-to-year, so storage and water management is essential.  Natural features - the Sierra snowpack and vast underground aquifers - provide more storage capacity,  but reservoirs are the part of the system that people control on a day-to-day basis.  Managing the flow of surface water through rivers and aqueducts, mostly from North to South, reduces flooding and attempts to provide a steady flow of water to cities and farms, and to maintain natural riparian habitats.  Ideally, it also transfers some water from the seasonal snowpack into long-term underground storage.  Finally, hydro-power from the many dams provides carbon-free electricity.
              </p><p id="paragraph2">
                California's water managers monitor the reservoirs carefully, and the state publishes daily data on reservoir storage.
              </p>
              <SeeMoreButton />
            </div>
            <div className="imgCap">
              <img src="https://cdn.theatlantic.com/thumbor/HYdYHLTb9lHl5ds-IB0URvpSut0=/900x583/media/img/photo/2014/09/dramatic-photos-of-californias-historic-drought/c01_53834006/original.jpg"/>
              <figcaption className="captions">Lake Oroville in the 2012-2014 drought. Image credit Justin Sullivan, from The Atlatic article Dramatic Photos of California's Historic Drought.</figcaption>
            </div>
          </div>
          <Hidden />
        </main>
      </div>
    );
  }

export default App;