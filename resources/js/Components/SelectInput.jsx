import { Select, Option } from "@material-tailwind/react";

export default function SelectInput({ dataOptions,  fieldLabel = 'name', fieldValue = 'id',  ...props }) {
  const options = dataOptions?.map(item => ({
    value: item[fieldValue],
    label: item[fieldLabel],
  }));

  return (
    <div className="mb-3">
      <Select {...props}>
        {options.map((option) => (
          <Option key={`${option.value}-${option.label}`} value={option.value}>
            {option.label}
          </Option>
        ))}
      </Select>
    </div>
  );
}
