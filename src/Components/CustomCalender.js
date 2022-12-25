import React, { useEffect, useState } from 'react';
import moment from "moment-business-days";
import Calendar from 'react-calendar';
import CompanyService from '../services/institute.service';
import { getCustomHolidays } from './util';

function CustomCalender({activeStartDate, value}) {
  const [customHolidays, setCustomHolidays] = useState([]);
    useEffect(()=>{
        CompanyService.getHolidays().then(d=>{
          setCustomHolidays(d);
        })
        
    }, [])
    moment.updateLocale('us', {
      holidays : customHolidays,
      holidayFormat: 'MM-DD-YYYY'
   });

   const disableHolidays =(date)=>{
    var some = customHolidays?.some(
       x => new Date(x).getDate() === date.getDate() &&
       date.getFullYear() === new Date(x).getFullYear() &&
    date.getMonth() === new Date(x).getMonth()
       );
    return some;
  }
  return (
    <Calendar
      value={value}
      activeStartDate = {activeStartDate}
      tileDisabled = {({date, view }) =>  (view === 'month') && (disableHolidays(date))}
    />
  );
}
export default CustomCalender;