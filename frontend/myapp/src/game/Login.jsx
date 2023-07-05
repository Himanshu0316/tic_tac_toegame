import React from 'react'

const Login = ({setPage}) => {
  return (
    <div>
        <button onClick={()=>{setPage(false)}}>signup</button>
    </div>
  )
}

export default Login