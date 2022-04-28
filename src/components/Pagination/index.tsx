import React from "react";
import Pagination from "@mui/material/Pagination";
import Stack from "@mui/material/Stack";

interface Props {
  totalPages: number;
  activePage: number;
  onChange: (value: number) => void;
}

export const PaginationComponent = ({
  totalPages,
  activePage,
  onChange,
}: Props) => {
  const handleChange = (event: any, value: number) => {
    onChange(value);
  };

  return (
    <Stack spacing={2}>
      <Pagination
        count={totalPages}
        page={activePage}
        onChange={handleChange}
      />
    </Stack>
  );
};
