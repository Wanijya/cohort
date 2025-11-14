import React from 'react'

const layout = ({children}) => {
  return (
    <div>
        <div className="w-full py-3 bg-red-600 text-xl text-white font-bold flex gap-11">
            <h5>Sale is live</h5>
            <h5>Sale is live</h5>
            <h5>Sale is live</h5>
            <h5>Sale is live</h5>
            <h5>Sale is live</h5>
            <h5>Sale is live</h5>
            <h5>Sale is live</h5>
            <h5>Sale is live</h5>
            <h5>Sale is live</h5>
            <h5>Sale is live</h5>
            <h5>Sale is live</h5>
        </div>
        {children}
    </div>
  )
}

export default layout