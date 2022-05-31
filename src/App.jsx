import React, { useState } from 'react';
import './reset.css'
import './App.css';
import useAsyncFetch from './useAsyncFetch'; // a custom hook
// import BarChart from "./components/BarChart";
import { Bar } from "react-chartjs-2";
import Chart from 'chart.js/auto';
import MonthYearPicker from 'react-month-year-picker';
import PropTypes from 'prop-types'; //for month-year-picker

/* TODO List:
2. create the chart using Chart.js <Bar data={chartData} /> near line 77
   -> follow the example from discussion/use Chart.js documentation
   -> light blue = capacity of reservoir (hard-coded https://cdec.water.ca.gov/reportapp/javareports?name=ResInfo)
   -> dark green = amount of water stored in the chosen month
3. add month-year picker, send a new AJAX request when the month changes
4. add the mobile/tablet view + more CSS magic
*/

function App() {
  const[seeButton, setSeeButton] = useState("See less")
  // state var reservoirs will contain the water storage data
  // reservoirs is an array of objects (e.g. {stationId: "SHA", name: "Shasta", value: 340})
  const [reservoirs, setReservoir] = useState([]);
  const [chartData, setChartData] = useState([{
    datasets: []
  }]);

  const [date, setDate] = useState({'year': 2022, 'month': 4});
  
  // call the custom fetch hook, passing the date and the callback functions it can use
  useAsyncFetch(`/query/getList`,
  {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify(date)
  }, thenFetch, catchFetch); 
  
  function thenFetch (res) {
    setReservoir (res);
    //res = [obj] (e.g. {stationId: "SHA", name: "Shasta", value: 340})
    for(let i = 0; i < result.length; i++) {
      setChartData ({
        labels: res.map(data => data.name),
        // labels: ["Shasta", "Oroville", "Trinity Lake", "New Melones", "San Luis", "Don Pedro", "Berryessa"],
        datasets: [{
          data: res.map(data => data.value),
        }]
      })
    }
  }
  function catchFetch (error) {
    console.log(error);
  }

  function SeeMoreButton() {
    if(seeButton == "See more")
      return (
        <button onClick={function() {setSeeButton("See less");}}>See less</button>
      )
    else
      return (
        <button onClick={function() {setSeeButton("See more");}}>See more</button>
      )
  }
  function Hidden() {
    let data = reservoirs.map(r => <li key={r.toString()}>{r.name} ({r.stationId}): {r.value}</li>)
    if(seeButton == "See more")
      return (
        <div className="hidden">
          <div className="chart"> 
            <ol>{data}</ol>
          </div>
          <div className="hiddenRight">
            <HiddenText />
            <div className="monthPicker">
              <MonthPicker />
            </div>
          </div>
        </div>
      )
    else
      return (
        <div></div>
      )
  }
  function HiddenText() {
    if(seeButton == "See more") {
      return(
        <div>
          <p id="hiddenP">
            Here's a quick look at some of the data on reservoirs from the <a href="https://cdec.water.ca.gov/index.html">California Data Exchange Center</a>, which consolidates climate and water data from multiple federal and state government agencies, and  electric utilities.  Select a month and year to see storage levels in the eleven largest in-state reservoirs.
          </p>
        </div>
      )
    }
    else
      return(<div></div>)
  }
  function MonthPicker() {
    if(seeButton == "See more") {
      return (
        <div className="monthPicker">
          <p id="changeMonth">Change month:</p>
          <div className="dateText">April 2022</div>
          <div className="dateBox">month picker</div>
        </div>
      )
    }
    else
      return (
        <div></div>
      )
  }
  
  return (
    <main>
      <hr id="stripe" />
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
  );
}

export default App;