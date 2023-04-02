import Select from 'react-select';
interface SimpleSelectProps {
    select_options: { value: string; label: string }[];
    handleSelectChange: (e: SelectOption) => void
    label: string
}
export type SelectOption = { value: string; label: string } | null;

export function SimpleSelect({label,select_options,handleSelectChange}:SimpleSelectProps){


return (
 <div className='w-full h-full flex items-center justify-center'>
        <Select
            aria-label={label}
            options={select_options}
            defaultValue={select_options[0]}
            name={label}
            className="w-[90%] p-[6px] m-1 text-black
            rounded-sm dark:bg-slate-900 "
            onChange={(e) => {
                if (e) {
                    handleSelectChange(e)
                }
            }}

        />
 </div>
);
}


{/* <SimpleSelect
    label="floor-select"
    select_options={floor_options}
    handleSelectChange={handleSelectChange} />
const handleSelectChange = (e: SelectOption) => {
    if (e) {
        setFloor(e)
    }
} */}
