import React from "react"
import { ProfileForm } from "@/components/ProfileForm" // Adjust the path to where your ProfileForm component is located

const LoginPage: React.FC = () => {
  return (
    <div className="container max-w-md flex flex-col items-center justify-center h-screen">
      <h1 className="text-4xl font-bold mb-8">Login</h1>
      <ProfileForm />
    </div>
  )
}

export default LoginPage
