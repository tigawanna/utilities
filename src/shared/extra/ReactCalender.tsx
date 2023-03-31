import Calendar, { CalendarTileProperties } from 'react-calendar';
import { isSameDay } from "date-fns";
import './calender.css'
interface ReactCalenderProps {
minDate:Date
maxDate:Date
}

export function ReactCalender({minDate,maxDate}:ReactCalenderProps){
const dateRange = getDateRange(minDate,maxDate);

    function tileClassName({ date, view }: CalendarTileProperties) {
        if (view === 'month') {
            // if (isSameDay(date,minDate)) return 'min-date-tile';
            // if (isSameDay(date,maxDate)) return 'max-date-tile';
            if (dateRange.find(dDate => isSameDay(dDate, date))) {
                return 'selected-tile';
            }
            return "normal-tile"
     }
    return ""
    }


return (
 <div className='w-full h-full flex items-center justify-center'>
        <Calendar
            value={new Date()}
            minDate={minDate}
            maxDate={maxDate}
            tileClassName={tileClassName}
           
        />
 </div>
);
}






function getDateRange(start: Date, end: Date): Date[] {
    const dateArray = [];
    let currentDate = new Date(start);

    while (currentDate <= end) {
        dateArray.push(new Date(currentDate));
        currentDate.setDate(currentDate.getDate() + 1);
    }

    return dateArray;
}
