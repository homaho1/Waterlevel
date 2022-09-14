
import React, { useEffect, useState } from "react";
import './App.css';
// import useAsyncFetch from './useAsyncFetch'; // a custom hook
import Chart from 'chart.js/auto';
import { Bar } from "react-chartjs-2";
import MonthYearPicker from 'react-month-year-picker';

function App() {

  const [showMore, updateShowMore] = useState(false);

  function showMorebuttonAction(){
    updateShowMore(true);
  }

  function showLessbuttonAction(){
    updateShowMore(false);
  }
  
  if(showMore){
    return (
<main> 
    <div id="head"> 
        <h2>Water storage in California reservoirs</h2>
    </div>

    <div id="upperDiv">
        <div id="textIntro">
            <p>
      California's reservoirs are part of a <a href="https://www.ppic.org/wp-content/uploads/californias-water-storing-water-november-2018.pdf">complex water storage system</a>.  The State has very variable weather, both seasonally and from year-to-year, so storage and water management is essential.  Natural features - the Sierra snowpack and vast underground aquifers - provide more storage capacity,  but reservoirs are the part of the system that people control on a day-to-day basis.  Managing the flow of surface water through rivers and aqueducts, mostly from North to South, reduces flooding and attempts to provide a steady flow of water to cities and farms, and to maintain natural riparian habitats.  Ideally, it also transfers some water from the seasonal snowpack into long-term underground storage.  Finally, hydro-power from the many dams provides carbon-free electricity. 
            </p>
        
            <p>
California's water managers monitor the reservoirs carefully, and the state publishes daily data on reservoir storage.
            </p>
        
            <div className="buttonClass">
                <button id="showButton" onClick={showLessbuttonAction}>
                    See less
                </button>
            </div>
        </div>
      
        <div class = "body_img" id="imageDiv">
            <img src="https://cdn.theatlantic.com/thumbor/HYdYHLTb9lHl5ds-IB0URvpSut0=/900x583/media/img/photo/2014/09/dramatic-photos-of-californias-historic-drought/c01_53834006/original.jpg"/>
          <div id="imgCaption">
            Lake Oroville in the 2012-2014 drought. Image credit Justin Sullivan, from <i>The Atlantic</i> article "Dramatic Photos of California's Historic Drought".</div>
        </div>
    </div>

    <WaterDisplay />
</main>
    );
  }else{
    return (
<main>
    <div id="head"> 
        <h2>Water storage in California reservoirs</h2>
    </div>
    
    <div id="upperDiv">
        <div id="textIntro">
            <p>
      California's reservoirs are part of a <a href="https://www.ppic.org/wp-content/uploads/californias-water-storing-water-november-2018.pdf">complex water storage system</a>.  The State has very variable weather, both seasonally and from year-to-year, so storage and water management is essential.  Natural features - the Sierra snowpack and vast underground aquifers - provide more storage capacity,  but reservoirs are the part of the system that people control on a day-to-day basis.  Managing the flow of surface water through rivers and aqueducts, mostly from North to South, reduces flooding and attempts to provide a steady flow of water to cities and farms, and to maintain natural riparian habitats.  Ideally, it also transfers some water from the seasonal snowpack into long-term underground storage.  Finally, hydro-power from the many dams provides carbon-free electricity. 
            </p>
            <p>
California's water managers monitor the reservoirs carefully, and the state publishes daily data on reservoir storage.
            </p>
            <div className="buttonClass">
                <button id="showButton" onClick={showMorebuttonAction}>
                    See more
                </button>
            </div>
        </div>

        <div id="imageDiv">
            <img class = "body_img" src="https://cdn.theatlantic.com/thumbor/HYdYHLTb9lHl5ds-IB0URvpSut0=/900x583/media/img/photo/2014/09/dramatic-photos-of-californias-historic-drought/c01_53834006/original.jpg"/>
        <div id="imgCaption">
            Lake Oroville in the 2012-2014 drought. Image credit Justin Sullivan, from <i>The Atlantic</i> article "Dramatic Photos of California's Historic Drought". </div>
        </div>
    </div>

</main>
  );
  } 
}

function WaterChart(props){
  let level = props.waterLevel;
  
  console.log("in waterchart, month and year is", props.month, props.year);
  // console.log("input =", input);
  let totalCap = [4552000, 3537577, 2447650, 2400000, 2041000, 2030000, 1602000];
  let leftCap = [];
  let curCap = [];
  for (let i = 0; i<7;i++){
    leftCap.push((totalCap[i] - level[i])/100000);
    curCap.push(level[i]/100000);
  }
  let totalCapObj = {label: "totalCap", data: leftCap, backgroundColor:["rgb(120,199,227)"], barPercentage: 0.7};
  let currCapObj = {label: "currCap", data: curCap, backgroundColor: ["rgb(66,145,152)"],barPercentage: 0.7};
  
  let userData = {};
  userData.labels = ["Shasta", "Oroville", "Trinity Lake", "New Melones", "San Luis", "Don Pedro", "Berryessa"];
  userData.datasets = [currCapObj, totalCapObj];

  console.log("userData:", userData);
  let options = {
  plugins: {
    title: {
      display: true,
    },
    legend: {
      display: false
    }
  },
  responsive: true,
  maintainAspectRatio: false,
  scales: {
    x: {
      stacked: true,
      grid: {
        display: false,
      }
    },
    y: {
      stacked: true,
      grid: {
        display: false,
      },
      max: 60
    }
  }
};

  return(
    <div id="barChart">
      <Bar options={options} data={userData} />
    </div>
    // <p>
    // hi
    // </p>
  );
}

function WaterDisplay(){
  console.log("Doing WaterDisplay");
  
  const [showPicker, updateShowPicker] = useState(false); 
  const [month, updateMonth] = useState(4);
  const [year, updateYear] = useState(2022);
  // const [level, setLevel] = useState([]);
  const [level, setLevel] = useState([]);
  

  async function fetchData() {
    // Send request to origin server at appropriate endpoint
  let obj = {"month":month, "year":year};
  let params = {
    method: 'POST', 
    headers: {'Content-Type': 'application/json'},
    body: JSON.stringify(obj)};
    
    let response = await fetch("query/getWaterData",params);
    // console.log("url is:", url,"params is: ", params);
    // Wait for origin server to send back JSON object
    let json = await response.json();

    // Sanity check the contents of the JSON
    console.log(json);
    thenFun(json);
  }

  useEffect(function () {
    console.log("Calling fetch");
    console.log("month is changed to", month, year);
    fetchData();
  }, [month,year]);

// }

  // useAsyncFetch("query/getWaterData",thenFun,catchFun);

  function thenFun (result) {
  // console.log("thenFun", result);
  setLevel(result);
    // render the list once we have it
  }
  function catchFun (error) {
    console.log(error);
  }
  
  console.log("current month", month, "current year", year);
  function showPickerFunc(){
    console.log("i am changing month");
    updateShowPicker(true);
  }


  if(showPicker==false){
    return (
      <div id="lowerDiv">
        <div id="chartDiv">
          <WaterChart month={month} year = {year} waterLevel = {level}> </WaterChart>
        </div>
        
        <div id="bottomRight">
            <p>
                Here's a quick look at some of the data on reservoirs from the <a href="https://cdec.water.ca.gov/index.html">California Data Exchange Center</a>, which consolidates climate and water data from multiple federal and state government agencies, and  electric utilities.  Select a month and year to see storage levels in the eleven largest in-state reservoirs.
            </p>

            <div id="changeMonthDiv">
                Change month:
                <div id="inputDiv">
                <input type="text" name="monthYear" placeholder="April 2022" onClick= {showPickerFunc} />
                </div>
            </div>
        </div>
    </div>
    );
  }else if(showPicker){
    return (
      <div id="lowerDiv">
        <div id="chartDiv">
          <WaterChart  month = {month} year = {year}  waterLevel = {level}> </WaterChart>
        </div>
        
        <div id="bottomRight">
            <p>
                Here's a quick look at some of the data on reservoirs from the <a href="https://cdec.water.ca.gov/index.html">California Data Exchange Center</a>, which consolidates climate and water data from multiple federal and state government agencies, and  electric utilities.  Select a month and year to see storage levels in the eleven largest in-state reservoirs.
            </p>

            <div id="changeMonthDiv">
                Change month:
                <div id="inputDiv">
                <MonthPicker month = {month} year ={year} updateMonth = {updateMonth} updateYear = {updateYear}/>
                </div>
            </div>
        </div>
    </div>
    );
  }
  else{
    console.log("else");
    return(
      <p>
      loading...
      </p>
    );
  }

}

function MonthPicker(props){
  const monthSelected = props.month;
  const yearSelected = props.year;
  const updateMonth = props.updateMonth;
  const updateYear = props.updateYear
  
  return (
    <MonthYearPicker
      caption=""
        selectedMonth={monthSelected}
        selectedYear={yearSelected}
        minYear={2000}
        maxYear={2022}
        onChangeYear = {(year)=>{updateYear(year);}}
        onChangeMonth = {(month)=>{updateMonth(month);}}
      />
  );
}



export default App;