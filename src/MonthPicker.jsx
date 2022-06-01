import React, {useState} from 'react';
// an third-party component from NPM
import MonthYearPicker from 'react-month-year-picker';

function MonthPicker(props) {
let date = props.date;

const [visible,updateVisible] = useState(false);

function showFun () {
  updateVisible(true);
}

function pickedYear (year) {
  updateVisible(false);
  props.yearFun(year);
}

function pickedMonth (month) {
  updateVisible(false);
  props.monthFun(month);
}

  let months = [ "January", "February", "March", "April", "May", "June", 
      "July", "August", "September", "October", "November", "December" ];
  if (visible) {
return (
      <div>
        <MonthYearPicker
          caption=""
          selectedMonth={date.month}
          selectedYear={date.year}
          minYear={2000}
          maxYear={2022}
          onChangeYear = {pickedYear}
          onChangeMonth = {pickedMonth}
        />
      </div> );
  } else {
    return (
      <button className="dateText" onClick={showFun}>{months[date.month-1]} {date.year}</button>
    )
  }
}

export default MonthPicker;