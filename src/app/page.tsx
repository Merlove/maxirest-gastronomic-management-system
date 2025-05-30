import { LoginForm } from "@/components/auth/login-form"

export default function HomePage() {
  return (
    <main className="min-h-screen flex flex-col items-center justify-center bg-black p-4">
      <div className="text-center mb-8">
        <h1 className="text-4xl font-bold text-white mb-2">MaxiRest</h1>
        <p className="text-gray-400">Sistema de Gestión Gastronómica</p>
      </div>
      <LoginForm />
    </main>
  )
}
