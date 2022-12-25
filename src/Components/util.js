import moment from "moment-business-days";
moment.updateLocale('us', {
  workingWeekdays: [1, 2, 3, 4, 5],
});
export const getTotalDays = (endDate, startDate) => {
    let days = moment(endDate).businessDiff(moment(startDate)) + 1;
	return days
}

export const getBusinessDates = (startDate, endDate) => {
    let count = 0;
    let curDate = startDate;
    let weekend_one = 6;
    let weekend_two = 0;
         while (curDate <= endDate) {
       const dayOfWeek = new Date(curDate).getDay();
    if ( dayOfWeek!== weekend_one && dayOfWeek !== weekend_two){
        count++;
    }
     curDate = moment(curDate).add(1, "day").format("YYYY-MM-DD");
     }
     return count;
  }

export const getEndDate = (startDate, totalDays) => {
    
    let endDate = moment(startDate)
					.businessAdd(totalDays - 1, "day")
					.format("YYYY-MM-DD");

        return endDate
}
export const getStartDate = (endDate, totalDays) => {
    let startDate = moment(endDate)
					.businessAdd(-(totalDays - 1), "day")
					.format("YYYY-MM-DD");

        return startDate
}

export const isNullUndefEmptyStr = (obj) => {
    debugger;
    Object.values(obj).every(value => {
        if (value === null || value === undefined || value === '') {
          return true;
        }
        return false;
      });
}
   
