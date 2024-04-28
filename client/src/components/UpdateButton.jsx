import React from 'react'
import { Button } from '@mui/material'

function UpdateButton({onClick}) {
  return (
    <div>
        <Button variant="contained" onClick={onClick}>Update</Button>
    </div>
  )
}

export default UpdateButton