import { useState } from 'react'
import { useAuth } from '../hooks/useAuth'

export default function RegisterForm() {
  const { register, error, loading } = useAuth()
  const [firstName, setFirstName] = useState('')
  const [lastName, setLastName] = useState('')
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')
  const [message, setMessage] = useState('')

  const handleSubmit = async (e) => {
    e.preventDefault()
    const success = await register(email, password, firstName, lastName)
    if (success) setMessage('Revisa tu correo para confirmar tu cuenta')
  }

  return (
    <form 
      onSubmit={handleSubmit}
      className="bg-[#ffffff] shadow-xl rounded-xl p-8 w-full max-w-md flex flex-col gap-4"
    >
      <h2 className="text-2xl font-bold text-center text-[#8c52ff] mb-2">Registro</h2>

      <input
        type="text"
        placeholder="Nombre"
        className="border border-[#8c52ff] rounded-lg p-2 focus:outline-none focus:ring-2 focus:ring-[#39c2ff]"
        onChange={(e) => setFirstName(e.target.value)}
      />
      <input
        type="text"
        placeholder="Apellido"
        className="border border-[#8c52ff] rounded-lg p-2 focus:outline-none focus:ring-2 focus:ring-[#39c2ff]"
        onChange={(e) => setLastName(e.target.value)}
      />
      <input
        type="email"
        placeholder="Correo electrónico"
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
        {loading ? 'Cargando...' : 'Registrarse'}
      </button>

      {error && <p className="text-center text-[#ff3069] text-sm mt-1">{error}</p>}
      {message && <p className="text-center text-[#39c2ff] text-sm mt-1">{message}</p>}

      <p className="text-center text-sm text-[#8c52ff]">
        ¿Ya tienes cuenta?{' '}
        <a 
          href="/login" 
          className="font-semibold text-[#fecf3d] hover:text-[#ff3069] transition-colors"
        >
          Inicia sesión
        </a>
      </p>
    </form>
  )
}
