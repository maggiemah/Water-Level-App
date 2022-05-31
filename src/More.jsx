import React from "react";
import './App.css';

function SeeMoreButton() {
    return (
      <button onClick={function() {setSeeButton("See More")}}>See More</button>
    )
  }

function MoreWords() {
  return (
  <div>
   <p>
Here's a quick look at some of the data on reservoirs from the <a href="https://cdec.water.ca.gov/index.html">California Data Exchange Center</a>, which consolidates climate and water data from multiple federal and state government agencies, and  electric utilities.  Select a month and year to see storage levels in the eleven largest in-state reservoirs.
</p>
<img src="https://cdn.theatlantic.com/thumbor/HYdYHLTb9lHl5ds-IB0URvpSut0=/900x583/media/img/photo/2014/09/dramatic-photos-of-californias-historic-drought/c01_53834006/original.jpg
"/>
Lake Oroville in the 2012-2014 drought. Image credit Justin Sullivan, from The Atlatic article Dramatic Photos of California's Historic Drought.
  </div>
  )
}


export default App;