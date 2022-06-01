import React, { useState, useEffect } from 'react';
import './reset.css'
import './App.css';
import useAsyncFetch from './useAsyncFetch'; // a custom hook
import BarChart from "./BarChart";
// import MonthYearPicker from 'react-month-year-picker';
import MonthPicker from './MonthPicker';
import PropTypes from 'prop-types'; //for month-year-picker

/* TODO List:
1. make the chart look pretty
  -> add the margins before/after first/last bars respectively
  -> remove the legend
  -> change the axes color/width
  -> adjust width/height in css
2. call useAsyncFetch every time the date changes (it changes by month-picker)
  -> probably by effect hook useEffect
  -> this should update the chart when a new date is selected
3. add the mobile/tablet view + more CSS magic
*/

function App() {
  const[seeButton, setSeeButton] = useState("See less")
  // state var reservoirs will contain the water storage data
  // reservoirs is an array of objects (e.g. {stationId: "SHA", name: "Shasta", value: 340})
  const [reservoirs, setReservoir] = useState([]);
  const [chartData, setChartData] = useState([{
    datasets: []
  }]);

  let [date, setDate] = useState({'year': 2022, 'month': 4});
  let months = [ "January", "February", "March", "April", "May", "June", 
      "July", "August", "September", "October", "November", "December" ];
  function changeYear(y) {
    console.log("change date to ", date.month, "/", y);
    setDate({'year': y, 'month': date.month});
  }
  function changeMonth(m) {
    console.log("change date to ", m, "/", date.year);
    setDate({'year': date.year, 'month': m});
  }
  // call the custom fetch hook, passing the date and the callback functions it can use
  // function initialize() {
    useAsyncFetch(`/query/getList`,
    {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(date)
    }, thenFetch, catchFetch); 
  // }  
  // useEffect(initialize, []);
  function thenFetch (res) {
    console.log("thenFetch");
    setReservoir (res);
    //res = [obj] (e.g. {stationId: "SHA", name: "Shasta", value: 340})
    for(let i = 0; i < result.length; i++) {
      setChartData ({
        labels: res.map(data => data.name),
        datasets: [
          {
            label: "Current Capacity",
            data: res.map(data => data.value),
            barPercentage: 0.75,
            backgroundColor: ['rgb(66, 145, 152)'],
          },
          {
            label: "Total Capacity",
            barPercentage: 0.75,
            data: [45.52, 35.38, 24.48, 24, 10.62, 20.3, 16.02],
            backgroundColor: ['rgb(120, 199, 227)'],
          },
        ],
      })
    }
  }
  function catchFetch (error) {
    console.log(error);
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
      let Names = [];
      let Values = [];
      for (let i = 0; i < reservoirs.length; i++) {
        Names.push(reservoirs[i].name);
        Values.push(reservoirs[i].value/100000);
      }
  
    const [newData, setChartData] = useState({
      labels: Names,
      datasets: [
        {
          label: "Current Capacity",
          data: Values,
          barPercentage: 0.75,
          backgroundColor: ['rgb(66, 145, 152)'],
        },
        {
          label: "Total Capacity",
          barPercentage: 0.75,
          data: [45.52, 35.38, 24.48, 24, 10.62, 20.3, 16.02],
          backgroundColor: ['rgb(120, 199, 227)'],
        },
      ],
    });
    
    // if(seeButton == "See more")
      return (
        <div className="hidden">
          <div className="chart"> 
            <BarChart chartData={newData}/> 
          </div>
          <div className="hiddenRight">
            <div>
              <p id="hiddenP">
                Here's a quick look at some of the data on reservoirs from the <a href="https://cdec.water.ca.gov/index.html">California Data Exchange Center</a>, which consolidates climate and water data from multiple federal and state government agencies, and  electric utilities.  Select a month and year to see storage levels in the eleven largest in-state reservoirs.
              </p>
            </div>
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
    // else
    //   return (
    //     <div></div>
    //   )
  }
  
  function MonthPickerTmp() {
    return (
      <div className="monthPicker">
        <div className="dateText">April 2022</div>
        <div className="dateBox">month picker</div>
      </div>
    )
  }
  
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