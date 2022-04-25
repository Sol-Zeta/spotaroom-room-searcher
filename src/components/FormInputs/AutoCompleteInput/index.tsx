import React, { useState } from 'react';
import TextField from '@mui/material/TextField';
import Autocomplete from '@mui/material/Autocomplete';

interface IOptions {
  label: string;
  id: string;
}

interface Props {
  value: IOptions;
  width?: string | number;
  label: string;
  options: IOptions[];
  noOptionsText: string;
  onChange: (value:any) => void;
};

export const AutoCompleteInput = ({value, width = 300, label, options, noOptionsText, onChange}: Props) => {

  const [inputValue, setInputValue] = useState({label: '', id: ''})

  const handleChange = (value: IOptions) => {
    if(value !== null){
      setInputValue(value)
      onChange(value.id)
    } else {
      setInputValue(options[0])
      onChange('any_city')
    }
  }
  

  return (
    <Autocomplete
      value={inputValue}
      noOptionsText={noOptionsText}
      disablePortal
      getOptionLabel={(option: IOptions) => option.label}
      onChange={(_, value: any) => handleChange(value)}
      id="combo-box-demo"
      options={options}
      sx={{ width }}
      renderInput={(params) => <TextField {...params} label={label} />}
    />
  );
}

