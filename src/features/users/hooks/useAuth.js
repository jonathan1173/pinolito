import { useState } from 'react'
import { supabase } from '../../../services/supabaseClient'

export function useAuth() {
  const [error, setError] = useState(null)
  const [loading, setLoading] = useState(false)

  const login = async (email, password) => {
    setLoading(true)
    const { error } = await supabase.auth.signInWithPassword({ email, password })
    setLoading(false)
    if (error) setError(error.message)
    return !error
  }

  const register = async (email, password) => {
    setLoading(true)
    const { error } = await supabase.auth.signUp({ email, password })
    setLoading(false)
    if (error) setError(error.message)
    return !error
  }

  return { login, register, error, loading }
}
