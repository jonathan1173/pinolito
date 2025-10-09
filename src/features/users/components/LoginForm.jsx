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
    <form onSubmit={handleSubmit}>
      <h2>Iniciar Sesión</h2>
      <input type="email" placeholder="Email" onChange={(e) => setEmail(e.target.value)} />
      <input type="password" placeholder="Contraseña" onChange={(e) => setPassword(e.target.value)} />
      <button type="submit" disabled={loading}>Entrar</button>
      {error && <p>{error}</p>}
      <p>¿No tienes cuenta? <a href="/register">Regístrate</a></p>
    </form>
  )
}
