import React from 'react';
import Box from '@mui/material/Box';
import InputLabel from '@mui/material/InputLabel';
import MenuItem from '@mui/material/MenuItem';
import FormControl from '@mui/material/FormControl';
import Select from '@mui/material/Select';
import { capitalizeWords } from '../../../utils';

interface IOptions {
    label: string,
    id: string
}

interface Props {
    value: string;
    label: string;
    options: IOptions[];
    onChange: (value: string) => void;
}

export const SelectInput = ({value, label, options, onChange}: Props) => {

  return (
    <Box sx={{ minWidth: 120 }}>
      <FormControl fullWidth>
        <InputLabel id="demo-simple-select-label">{capitalizeWords(label)}</InputLabel>
        <Select
          labelId="demo-simple-select-label"
          id="demo-simple-select"
          value={value}
          label={label}
          onChange={(event: any) => onChange(event.target.value)}
        >
            {options.map((e: IOptions)=>(
                <MenuItem key={`${e.label}-option`} value={e.id}>{e.label}</MenuItem>
            ))}
          <MenuItem value={10}>Ten</MenuItem>
          <MenuItem value={20}>Twenty</MenuItem>
          <MenuItem value={30}>Thirty</MenuItem>
        </Select>
      </FormControl>
    </Box>
  );
}
