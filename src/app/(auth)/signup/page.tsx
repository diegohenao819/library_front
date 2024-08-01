import { SignUpForm } from "@/components/SignUpForm"


const page = () => {
  return (
    <div className="container max-w-md flex flex-col items-center justify-center h-screen">
        <h1 className="text-4xl font-bold mb-8">Registrarse</h1>
        <SignUpForm />
    </div>
  )
}

export default page