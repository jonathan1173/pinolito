import { useState } from 'react'
import { useAuth } from '../hooks/useAuth'

export default function RegisterForm() {
  const { register, error, loading } = useAuth()
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')
  const [message, setMessage] = useState('')

  const handleSubmit = async (e) => {
    e.preventDefault()
    const success = await register(email, password)
    if (success) setMessage('Revisa tu correo para confirmar tu cuenta')
  }

  return (
    <form onSubmit={handleSubmit}>
      <h2>Registro</h2>
      <input type="email" placeholder="Correo" onChange={(e) => setEmail(e.target.value)} />
      <input type="password" placeholder="Contraseña" onChange={(e) => setPassword(e.target.value)} />
      <button type="submit" disabled={loading}>Registrarse</button>
      {error && <p>{error}</p>}
      {message && <p>{message}</p>}
      <p>¿Ya tienes cuenta? <a href="/">Inicia sesión</a></p>
    </form>
  )
}
