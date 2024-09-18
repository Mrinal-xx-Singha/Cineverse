import React, { useState } from 'react'
import { Link } from 'react-router-dom';
import { useAuthStore } from '../store/authUser';

const LoginPage = () => {
  // States for Login 
  const [email,setEmail]=useState("")
  const [password,setPassword]=useState("")

  const {login}=useAuthStore()
  // Login Function
  const handleLogIn = (e) =>{
    e.preventDefault()
    login({email,password})
    
  }
  return (
    <div className="h-screen w-full hero-bg">
      <header className="max-w-6xl mx-auto flex items-center justify-between p-4">
        <Link to={"/"}>
          <h1 className="text-white font-bold text-2xl cursor-pointer ">
            CINE VERSE
          </h1>
        </Link>
      </header>

      <div className="flex justify-center items-center mt-20 mx-3">
        <div className="w-full max-w-md p-8 space-y-6 bg-black/60 rounded-lg shadow-md">
          <h1 className="text-white text-center font-bold text-2xl fon-bold mb-4">
            LOG IN
          </h1>
          <form className="space-y-4 " onSubmit={handleLogIn}>
            {/* Email */}
            <div>
              <label
                htmlFor="email"
                className="text-sm font-md text-gray-300 block"
              >
                Email
              </label>
              <input
                type="email"
                className="w-full px-3 py-2 mt-1 border border-gray-700 rounded-md bg-transparent text-white focus:outline-none focus:ring"
                placeholder="you@example.com"
                id="email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
              />
            </div>

            {/* Password */}

            <div>
              <label
                htmlFor="password"
                className="text-sm font-md text-gray-300 block"
              >
                Password
              </label>
              <input
                type="password"
                className="w-full px-3 py-2 mt-1 border border-gray-700 rounded-md bg-transparent text-white focus:outline-none focus:ring"
                placeholder="********"
                id="password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
              />
            </div>

            <button
              className="w-full py-2 bg-red-600 text-white font-semibold 
            rounded-md hover:bg-red-700 
            "
            >
              LOG IN
            </button>
          </form>
          <div className="text-center text-gray-400">
           Don&apos;t have an account  ?{" "}
            <Link
              to={"/signup"}
              className="text-red-500 hover:underline cursor-pointer"
            >
              Sign Up
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
}

export default LoginPage