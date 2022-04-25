import React from 'react';

interface Props {
    value?: string;
    onChange: (value: string) => void;
    onEnterKey: () => void;
}

const TextInput = ({value, onChange, onEnterKey}: Props) => {
  return (
    <div>
        <input 
            type="text" 
            value={value}
            onChange={(e) => onChange(e.target.value)}
            onKeyDown={(e)=> e.key === 'Enter' && onEnterKey()}
        />
    </div>
  )
}

export default TextInput;
