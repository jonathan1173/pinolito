import { useState } from 'react'
import { useAuth } from '../hooks/useAuth'

export default function LoginForm() {
  const { login, error, loading } = useAuth()
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')

  const handleSubmit = async (e) => {
    e.preventDefault()
    const success = await login(email, password)
    if (success) window.location.href = '/dashboard'
  }

  return (
    <form 
      onSubmit={handleSubmit}
      className="bg-[#ffffff] shadow-xl rounded-xl p-8 w-full max-w-md flex flex-col gap-4"
    >
      <h2 className="text-2xl font-bold text-center text-[#8c52ff] mb-2">Iniciar Sesión</h2>
      
      <input 
        type="email" 
        placeholder="Email" 
        className="border border-[#8c52ff] rounded-lg p-2 focus:outline-none focus:ring-2 focus:ring-[#39c2ff]"
        onChange={(e) => setEmail(e.target.value)} 
      />
      <input 
        type="password" 
        placeholder="Contraseña"
        className="border border-[#8c52ff] rounded-lg p-2 focus:outline-none focus:ring-2 focus:ring-[#39c2ff]"
        onChange={(e) => setPassword(e.target.value)} 
      />

      <button 
        type="submit" 
        disabled={loading}
        className="bg-[#39c2ff] text-[#ffffff] font-semibold py-2 rounded-lg hover:bg-[#8c52ff] transition-colors"
      >
        {loading ? 'Cargando...' : 'Entrar'}
      </button>

      {error && (
        <p className="text-center text-[#ff3069] text-sm mt-2">{error}</p>
      )}

      <p className="text-center text-sm text-[#8c52ff]">
        ¿No tienes cuenta?{' '}
        <a 
          href="/register" 
          className="font-semibold text-[#fecf3d] hover:text-[#ff3069] transition-colors"
        >
          Regístrate
        </a>
      </p>
    </form>
  )
}
