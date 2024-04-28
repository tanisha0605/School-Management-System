import React from 'react';
import ToggleButton from '@mui/material/ToggleButton';
import ToggleButtonGroup from '@mui/material/ToggleButtonGroup';

export default function ToggleGroup({ value, onChange }) {
    return (
        <ToggleButtonGroup
            color="primary"
            value={value}
            exclusive
            onChange={onChange}
            aria-label="Platform"
            style={{
                margin: 5,
                display: 'flex',
                justifyContent: 'center',
            }}
        >
            <ToggleButton value="month">Monthly view</ToggleButton>
            <ToggleButton value="year">Yearly view</ToggleButton>
        </ToggleButtonGroup>
    );
}
