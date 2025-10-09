import { useEffect, useState } from 'react'
import { supabase } from '../../../services/supabaseClient'

export function useUser() {
  const [user, setUser] = useState(null)

  useEffect(() => {
    // Obtener el usuario actual
    const getUser = async () => {
      const { data } = await supabase.auth.getUser()
      setUser(data.user)
    }

    getUser()

    // Escuchar cambios en la sesión (login, logout)
    const { data: listener } = supabase.auth.onAuthStateChange((_event, session) => {
      setUser(session?.user ?? null)
    })

    // Limpiar listener al desmontar
    return () => listener.subscription.unsubscribe()
  }, [])

  return { user }
}
