import React from 'react'
import CreateUser from '../Users/CreateUser'
import LoginUser from '../Users/LoginUser'

export default function LoginPage() {


  return (
    <div className="container flex column center">
        <CreateUser />
        <LoginUser /> 
    </div>
  )
}
