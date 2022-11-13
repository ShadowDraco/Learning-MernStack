import React from 'react'

export default function Loading() {
  return (
    <div className='container loading'>
        <div className="lds-ripple"><div></div><div></div></div>
        <div>Loading...</div>
    </div>
  )
}
