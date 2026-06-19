import React from 'react'
import { Link } from 'react-router-dom'

export default function SignUp(){
  return (
    <div className="min-h-screen flex flex-col items-center justify-center p-6 pt-24">
      <div className="text-center text-white w-full max-w-[820px]">
        <div className="mx-auto w-16 h-16 rounded-lg bg-white/8 flex items-center justify-center">💼</div>
        <h1 className="mt-3 text-2xl font-semibold">BudgetFlow</h1>
        <p className="text-sm opacity-90">Smart finances for everyone</p>
      </div>

      <div className="relative bg-white rounded-2xl shadow-xl w-[420px] p-8 mt-10">
        <div className="flex gap-3 mb-4">
          <Link to="/signin" className="flex-1 py-2 rounded-lg bg-gray-100 text-center text-gray-500">Sign In</Link>
          <div className="flex-1 py-2 rounded-lg bg-white text-center font-medium">Sign Up</div>
        </div>

        <label className="block text-sm font-semibold text-gray-800 mb-2">Full Name</label>
        <input className="w-full rounded-xl bg-gray-100 p-3 mb-4" type="text" placeholder="Alex Morgan" />

        <label className="block text-sm font-semibold text-gray-800 mb-2">Email Address</label>
        <input className="w-full rounded-xl bg-gray-100 p-3 mb-4" type="email" placeholder="alex.morgan@email.com" />

        <label className="block text-sm font-semibold text-gray-800 mb-2">Password</label>
        <input className="w-full rounded-xl bg-gray-100 p-3 mb-4" type="password" placeholder="••••••••" />

        <button className="w-full bg-gradient-to-b from-[#1f63e0] to-[#155bd6] text-white py-3 rounded-xl font-semibold">Create Account</button>

        <div className="flex items-center my-4 text-gray-400">
          <div className="flex-1 h-px bg-gray-100" />
          <div className="px-3 text-sm">or continue with</div>
          <div className="flex-1 h-px bg-gray-100" />
        </div>

        <div className="flex gap-3">
          <div className="flex-1 bg-white rounded-xl border p-3 text-center">Google</div>
          <div className="flex-1 bg-white rounded-xl border p-3 text-center">Apple</div>
        </div>
      </div>
    </div>
  )
}
