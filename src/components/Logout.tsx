'use client'

import { logout } from '../app/login/actions' 

export function LogoutButton() {
  return (
    <button 
      onClick={() => logout()}
      className="px-4 py-2 bg-red-500 text-white rounded hover:bg-red-600"
    >
      Logout
    </button>
  )
}