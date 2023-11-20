import { FormEvent, useState } from "react";
import { useClickAway } from '@uidotdev/usehooks';

type DropdownInputProps = {
  value: string;
  options: string[];
  onChange: (option: string) => void;
  label?: string;
  placeholder?: string;
  error?: string;
  isLoading?: boolean;
};

function DropdownInput({
  label,
  value,
  onChange,
  options,
  error
}: DropdownInputProps) {
  const [isOpen, setIsOpen] = useState<boolean>(false);
  const [inputValue, setInputValue] = useState<string>(value);
  const ref = useClickAway<HTMLInputElement>(() => {
    setIsOpen(false);
  });

  const handleSelect = (option: string) => {
    setInputValue(option);
    onChange(option);
    setIsOpen(false);
  };

  const handleChange = (e: FormEvent<HTMLInputElement>) => {
    setInputValue(e.currentTarget.value);
    onChange(e.currentTarget.value);
  };

  const handleClick = () => {
    setIsOpen(true);
  };

  const filteredOptions = options.filter(option =>
    option.toLowerCase().includes(inputValue.toLowerCase())
  );

  const renderedOptions = filteredOptions.map(option => {
    return (
      <div
        className="pl-4 pt-1 pb-1 hover:bg-gray-100"
        key={option}
        onClick={() => handleSelect(option)}
      >
        {option}
      </div>
    );
  });

  return (
    <div>
      {label &&
        <label>{label}</label>
      }
      <div>
        <input
          className={`flex items-center h-10 border-black border rounded mr-2 w-48 p-5 ${error && 'border-rose-500'}`}
          value={inputValue}
          onChange={handleChange}
          onClick={handleClick}
        />

        {error !== null &&
          <div className="text-rose-500 text-xs absolute">{error}</div>
        }

        {isOpen &&
          <div ref={ref}>
            <div className="absolute rounded mr-2 w-48 bg-white max-h-48 overflow-scroll overflow-y-scroll border border-black">
              {renderedOptions}
            </div>
          </div>
        }
      </div>
    </div>
  );
}

export default DropdownInput;