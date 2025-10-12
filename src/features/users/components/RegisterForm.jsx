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
    <form onSubmit={handleSubmit}>
      <h2>Registro</h2>

      <input
        type="text"
        placeholder="Nombre"
        onChange={(e) => setFirstName(e.target.value)}
      />
      <input
        type="text"
        placeholder="Apellido"
        onChange={(e) => setLastName(e.target.value)}
      />
      <input
        type="email"
        placeholder="Correo electrónico"
        onChange={(e) => setEmail(e.target.value)}
      />
      <input
        type="password"
        placeholder="Contraseña"
        onChange={(e) => setPassword(e.target.value)}
      />

      <button type="submit" disabled={loading}>Registrarse</button>
      {error && <p style={{ color: 'red' }}>{error}</p>}
      {message && <p style={{ color: 'green' }}>{message}</p>}

      <p>¿Ya tienes cuenta? <a href="/">Inicia sesión</a></p>
    </form>
  )
}
