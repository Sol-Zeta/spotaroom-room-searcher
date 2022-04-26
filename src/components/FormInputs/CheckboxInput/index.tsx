import React, { useReducer } from "react";
import Checkbox from "@mui/material/Checkbox";
import styles from "./CheckboxInput.module.scss";

interface IOptions {
  label: string;
  id: string;
}

interface ISelectedOption {
  value: string;
  selected: boolean;
}

interface Props {
  title?: string;
  options: IOptions[] | [];
  selected: string[];
  onChange: (value: string[]) => void;
}

export const CheckboxInput = ({
  title,
  options,
  selected,
  onChange,
}: Props) => {
  const setSelectedOption = (option: any) => [""];
  const [selectedOptions, dispatch] = useReducer(setSelectedOption, selected);

  const onValuesChange = (value: string, checked: boolean) =>
    checked
      ? onChange([...selected, value])
      : onChange(selected.filter((e: string) => e !== value));

  const renderCheckbox = () =>
    options.map((e: IOptions, i: number) => {
      const props = { inputProps: { "aria-label": e.label, value: e.id } };
      return (
        <div key={i} className={styles.option_container}>
          <p>{e.label}</p>
          <Checkbox
            sx={{
                color: '#006917',
                '&.Mui-checked': {
                  color: '#008f2a',
                },
              }}
            key={i}
            {...props}
            defaultChecked={selected.includes(e.id)}
            onChange={(e) => onValuesChange(e.target.value, e.target.checked)}
          />
        </div>
      );
    });

  return (
    <div className={styles.container}>
      <p className={styles.title}>{title}</p>
      <div className={styles.options_container}>{renderCheckbox()}</div>
    </div>
  );
};
