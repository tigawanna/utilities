import { SelectOption, SimpleSelect } from "../../shared/form/SimpleSelect";
import { period_month_options, period_year_options } from "./bill_options";

export interface BillsPeriod {
    curr_month: number;
    curr_year: number;
    prev_month: number;
    prev_year: number;
}
interface PeriodPickerProps {
    period: BillsPeriod
    setPeriod: React.Dispatch<React.SetStateAction<BillsPeriod>>
}

export function PeriodPicker({ period, setPeriod }: PeriodPickerProps) {

    const handleMonthChange = (e: SelectOption) => {
        if (e) {
            setPeriod(prev => {
                return { ...prev, curr_month: parseInt(e.value) }
            })
        }
    }
    const handleYearChange = (e: SelectOption) => {
        if (e) {
            setPeriod(prev => {
                return { ...prev, curr_year: parseInt(e.value) }
            })
        }
    }
    const handlePrevMonthChange = (e: SelectOption) => {
        if (e) {
            setPeriod(prev => {
                return { ...prev, prev_month: parseInt(e.value) }
            })
        }
    }
    const handlePrevYearChange = (e: SelectOption) => {
        if (e) {
            setPeriod(prev => {
                return { ...prev, prev_year: parseInt(e.value) }
            })
        }
    }
    return (
        <div className='w-full h-full sticky top-10 flex flex-col items-center justify-center'>
            <div className="sticky top-10 ">{period.curr_month}/{period.curr_year} ||  {period.prev_month}/{period.prev_year}</div>
            
            <div className='w-full h-full flex flex-wrap items-center justify-center'>
            
               
                <div className="min-w-[30%] flex justify-center items-center">
                <h3>CURR</h3>
                <SimpleSelect
                    label="month-select"
                    select_options={period_month_options}
                    defaultValue={{ value: period.curr_month.toString(), label: period.curr_month.toString() }}
                    handleSelectChange={handleMonthChange} 
                    />

                <SimpleSelect
                    label="year-select"
                    select_options={period_year_options}
                    defaultValue={{ value: period.curr_year.toString(), label: period.curr_year.toString() }}
                    handleSelectChange={handleYearChange} />
                </div>

            
                 <div className="min-w-[30%] flex justify-center items-center">
                    <h3>PREV</h3>
                <SimpleSelect
                    label="prev-month-select"
                    select_options={period_month_options}
                    defaultValue={{ value: period.prev_month.toString(), label: period.prev_month.toString() }}
                    handleSelectChange={handlePrevMonthChange} />

                <SimpleSelect
                    label="prev-year-select"
                    select_options={period_year_options}
                    defaultValue={{ value: period.prev_year.toString(), label: period.prev_year.toString() }}
                    handleSelectChange={handlePrevYearChange} />
            </div>
        

            </div>

        </div>
    );
}
