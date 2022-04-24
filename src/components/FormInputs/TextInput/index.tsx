import React from 'react';

interface Props {
    value?: string;
    onChange: (value: string) => void;
}

const TextInput = ({value, onChange}: Props) => {
  return (
    <div>
        <input 
            type="text" 
            value={value}
            onChange={(e) => onChange(e.target.value)}
        />
    </div>
  )
}

export default TextInput;
