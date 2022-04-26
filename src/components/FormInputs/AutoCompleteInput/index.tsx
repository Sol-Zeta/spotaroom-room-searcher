import React, { useState, useEffect } from 'react';
import TextField from '@mui/material/TextField';
import Autocomplete from '@mui/material/Autocomplete';
import { capitalizeFirstLetter, capitalizeWords } from '../../../utils';

interface IOptions {
  label: string;
  id: string;
}

interface Props {
  defaultValue: IOptions;
  width?: string | number;
  label: string;
  options: IOptions[];
  noOptionsText: string;
  onChange: (value:any) => void;
};

export const AutoCompleteInput = ({defaultValue, width = 300, label, options, noOptionsText, onChange}: Props) => {

  const [inputValue, setInputValue] = useState(defaultValue)

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
      isOptionEqualToValue={()=> true}
      value={inputValue}
      noOptionsText={noOptionsText}
      disablePortal
      getOptionLabel={(option: IOptions) => capitalizeWords(option.label)}
      onChange={(_, value: any) => handleChange(value)}
      id="combo-box-demo"
      options={options}
      sx={{ width }}
      renderInput={(params) => <TextField {...params} label={capitalizeFirstLetter(label)} />}
    />
  );
}

