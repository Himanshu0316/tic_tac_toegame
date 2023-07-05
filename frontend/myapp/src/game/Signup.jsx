import React from 'react'

const Signup = ({setPage}) => {
  return (
    <div>
        <button onClick={()=>{setPage(true)}}>Login</button>
    </div>
  )
}

export default Signup