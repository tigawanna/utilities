import { SelectOption, SimpleSelect } from "../../shared/form/SimpleSelect";
import { period_month_options, period_year_options } from "./bill_options";

interface PeriodPickerProps {
period:{month:number,year:number}
setPeriod:React.Dispatch<React.SetStateAction<{month:number,year:number}>>
}

export function PeriodPicker({period,setPeriod}:PeriodPickerProps){
    const handleMonthChange = (e:SelectOption) => {
        if (e) {
            setPeriod(prev=>{
                return {...prev,month:parseInt(e.value)}
            })
        }
    } 
    const handleYearChange = (e: SelectOption) => {
        if (e) {
            setPeriod(prev => {
                return { ...prev,year: parseInt(e.value) }
            })
        }
    }
return (
    <div className='w-full h-full sticky top-10 flex flex-col items-center justify-center'>
    <div className="sticky top-10 ">{period.month} / {period.year}</div>
    <div className="w-full flex justify-center items-center gap">
    
    <SimpleSelect
    label="month-select"
    select_options={period_month_options}
    defaultValue={{value:period.month.toString(),label:period.month.toString()}}
    handleSelectChange={handleMonthChange} />
    
    <SimpleSelect
    label="year-select"
    select_options={period_year_options}
    defaultValue={{value:period.year.toString(),label:period.year.toString()}}
    handleSelectChange={handleYearChange} />

    </div>

 </div>
);
}
