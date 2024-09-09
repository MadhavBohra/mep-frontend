import React from 'react'
import { Stack } from '@mui/material'
import { InfinitySpin } from 'react-loader-spinner'

const Loader = () => {
  return (
    <Stack direction='row' justifyContent='center' alignItems='center' width='100%' height='100%'>
        <InfinitySpin color='gray'></InfinitySpin>
    </Stack>
  )
}

export default Loader