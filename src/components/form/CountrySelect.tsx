import Select, {
  components,
  type OptionProps,
  type SingleValueProps,
} from "react-select";

import { COUNTRIES, type CountryOption } from "@/lib/constants/countries";

interface CountrySelectProps {
  id?: string;
  label?: string;
  value?: string;
  error?: string;
  isDisabled?: boolean;
  className?: string;
  onChange: (countryCode: string) => void;
}

function CountryOptionComponent(props: OptionProps<CountryOption, false>) {
  return (
    <components.Option {...props}>
      <div className="flex items-center gap-3">
        <span
          className={`fi fi-${props.data.value.toLowerCase()} rounded-sm`}
        />
        <span>{props.data.label}</span>
      </div>
    </components.Option>
  );
}

function CountrySingleValue(props: SingleValueProps<CountryOption, false>) {
  return (
    <components.SingleValue {...props}>
      <div className="flex items-center gap-3">
        <span
          className={`fi fi-${props.data.value.toLowerCase()} rounded-sm`}
        />
        <span>{props.data.label}</span>
      </div>
    </components.SingleValue>
  );
}

export default function CountrySelect({
  id = "countryCode",
  label,
  value,
  error,
  isDisabled = false,
  className = "",
  onChange,
}: CountrySelectProps) {
  return (
    <div className={`space-y-2 ${className}`}>
      {label && (
        <label htmlFor={id} className="block text-sm font-medium text-gray-700">
          {label}
        </label>
      )}

      <Select<CountryOption, false>
        inputId={id}
        options={COUNTRIES}
        value={COUNTRIES.find((country) => country.value === value) ?? null}
        onChange={(option) => onChange(option?.value ?? "")}
        isSearchable
        isDisabled={isDisabled}
        isClearable={false}
        placeholder="Select a country..."
        classNamePrefix="react-select"
        components={{
          Option: CountryOptionComponent,
          SingleValue: CountrySingleValue,
        }}
      />

      {error && <p className="text-sm text-red-500">{error}</p>}
    </div>
  );
}
