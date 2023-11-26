import { SelectOption } from "@/components/form/react-select/SimpleSelect";
import { Input } from "@/components/shadcn/ui/input";
import { Select, SelectContent, SelectGroup, SelectItem, SelectLabel, SelectTrigger, SelectValue } from "@/components/shadcn/ui/select";

interface SelectPlusInputProps {
  handleSelectChange: (e: SelectOption) => void;
  defaultValue?: SelectOption;
}

export function SelectPlusInput({handleSelectChange,defaultValue}:SelectPlusInputProps){
return (
  <div className="w-full h-full flex items-center justify-center">
    <Select onValueChange={(value) => handleSelectChange({value,label:value})} defaultValue={defaultValue?.value}>
      <SelectTrigger className="w-[180px]">
        <SelectValue placeholder="Select a fruit" />
      </SelectTrigger>
      <SelectContent>
        <SelectGroup>
          <Input 
          onChange={(e) => handleSelectChange({value:e.target.value,label:e.target.value})}
          
          />
          <SelectLabel>Fruits</SelectLabel>
          <SelectItem value="apple">Apple</SelectItem>
          <SelectItem value="banana">Banana</SelectItem>
          <SelectItem value="blueberry">Blueberry</SelectItem>
          <SelectItem value="grapes">Grapes</SelectItem>
          <SelectItem value="pineapple">Pineapple</SelectItem>
        </SelectGroup>
      </SelectContent>
    </Select>
  </div>
);
}
