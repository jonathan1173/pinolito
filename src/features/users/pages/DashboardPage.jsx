import { useUser } from '../hooks/useUser'

export default function DashboardPage() {
  const { user } = useUser()

  if (!user) return <p>Cargando usuario...</p>

  const firstName = user.user_metadata.first_name
  const lastName = user.user_metadata.last_name

  return (
    <div>
      <h1>
        Bienvenido, {firstName && lastName ? `${firstName} ${lastName}` : user.email}
      </h1>
    </div>
  )
}
