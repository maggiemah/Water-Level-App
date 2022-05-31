// import BarChart from './CJSBarChart';
import { Bar } from "react-chartjs-2";
import Chart from 'chart.js/auto';

function App() {

  // keep track of whether we have the school list yet or not
  // state variable is seeSchools, 
  // and setting function is setSchools
  // "false" is initial value
  const [seeSchools, setSchools] = useState(false);

   const [colors,setColor] = useState("steelblue");

    // change color and trigger an re-render
  function changeColor(newColor) {
      setColor(newColor);
    }

  
  // button just resets the state variable
  // since component is re-rendered when state or props change, 
  // this will re-render and insert the SchoolList component
  function buttonAction() {
    setSchools(true);
  }


  if (seeSchools) {

  return (
    // the chart code and the AJAX call to get data
    // are both in the SchoolDisplay component
    <SchoolDisplay />
    )
  }
  
  else return (
    <main>
      It can be hard to tell the real cost of college, because students get very different financial aid packages.  For instance, say you come from a family with an income in the $39,000-$75,000 range. According to the "College Scorecard" database, you would pay...
      <div className="buttonHolder">
        <button id="redButton" onClick={buttonAction}>
          Click for Data
      </button>
      </div>
    </main>
  )
}

// A component that puts school data into a bar chart
function SchoolChart(props) {
  const nicknames = new Map();
  nicknames.set(0, 'UC Davis');
  nicknames.set(1, 'Stanford');
  nicknames.set(2, 'Cal Poly-SLO');
  
  if (props.schools) {
    let n = props.schools.length;
    console.log(props.schools);

    // objects containing row values
    let stickerObj = {label: "Sticker Price",data: [], backgroundColor: ["pink"]}
    let midIncObj = {label: "Middle Income Family Price", data: [], backgroundColor: ["red"]}
    let labels = [];
    for (let i=0; i<n; i++) {
      stickerObj.data.push(props.schools[i].sticker);
      midIncObj.data.push(props.schools[i].midIncome);
      labels.push(nicknames.get(i));
    }


  let userData = {};
  userData.labels = labels;
  userData.datasets = [stickerObj, midIncObj];

console.log(userData);
let options = {
  plugins: {
    title: {
      display: true,
      text: 'Sticker vs. Middle Income Family Prices',
    },
  },
  responsive: true,
  maintainAspectRatio: false,
  scales: {
    x: {
      grid: {
        display: false
      }
    },
    y: {
      grid: {
        display: false
      }
    }
  }
};


      return (
        <div id="chart-container">
          <Bar options={options} data={userData} />
        </div>
      )
  }
}

// A component that fetches its own data
function SchoolDisplay() {

  console.log("in SchoolDisplay");

  // static var will contain the list of schools
  const [schools, setSchools] = useState([]);

  // call the custom fetch hook, passing it the callback functions that it can use
  useAsyncFetch("query/getList", {}, thenFun, catchFun);

  function thenFun (result) {
    setSchools(result);
    // render the list once we have it
  }
  function catchFun (error) {
    console.log(error);
  }

  // will re-render once state variable schools changes
  if (schools) {
  return (
    <main>
      <SchoolChart schools={schools}> </SchoolChart>
    </main>
  )
  } else {
    return (<p>
      loading...
    </p>);
  }
// make list of li elements -- we are only interested in the names of the schools, so extract that from each element in schools
  /*
  let itemElems = [];
  for (let i = 0; i < schools.length; i++){
    let sch = schools[i];
    itemElems.push(<li key={i}> {sch.name+","+sch.midIncome+","+sch.sticker} </li>);
  }
*/
}

export default App;
