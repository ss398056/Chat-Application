import React from 'react'
import { SyncLoader } from "react-spinners";

function ScreenLoader({loading}) {
  return (
      <SyncLoader className='bg-white bg-opacity-70 z-50 h-screen w-full justify-center flex fixed z-9999 items-center' color='#111827' loading={loading} size={20} margin={5}/>
  )
}

export default ScreenLoader
