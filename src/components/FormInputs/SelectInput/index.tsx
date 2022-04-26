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
    width?: number | string;
    options: IOptions[];
    onChange: (value: string) => void;
}

export const SelectInput = ({value, label, width = 120, options, onChange}: Props) => {

  return (
    <Box sx={{ width }}>
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
        </Select>
      </FormControl>
    </Box>
  );
}
