import * as React from 'react';
import ToggleButton from '@mui/material/ToggleButton';
import ToggleButtonGroup from '@mui/material/ToggleButtonGroup';
export default function ToggleGroup() {
  const [alignment, setAlignment] = React.useState('month');

  const handleChange = (event, newAlignment) => {
    setAlignment(newAlignment);
  };

  return (
    <ToggleButtonGroup
      color="primary"
      value={alignment}
      exclusive
      onChange={handleChange}
      aria-label="Platform"
      style={{
        margin:5,
        display: 'flex',
        justifyContent: 'center',
      }}
    >
      <ToggleButton value="month">Monthly view</ToggleButton>
      <ToggleButton value="year">Yearly view</ToggleButton>
    </ToggleButtonGroup>
  );
}