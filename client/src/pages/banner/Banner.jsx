import React from 'react'

function Banner() {
  return (
    <div className='flex flex-col items-center justify-center w-full h-screen space-y-5 text-2xl font-semibold'>
      <h1>Select any user for chat</h1>
      <h1>Thankyou for using our chat application</h1>
      <img src='chatApp.png' alt='chat application' />
    </div>
  )
}

export default Banner
