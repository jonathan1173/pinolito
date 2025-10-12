import { useState } from 'react'
import { supabase } from '../../../services/supabaseClient'

export function useAuth() {
  const [error, setError] = useState(null)
  const [loading, setLoading] = useState(false)

  // =========================
  // LOGIN
  // =========================
  const login = async (email, password) => {
    setLoading(true)
    setError(null)

    const { data, error: loginError } = await supabase.auth.signInWithPassword({
      email,
      password
    })

    setLoading(false)
    if (loginError) {
      setError(loginError.message)
      return false
    }

    return true
  }

  // =========================
  // REGISTRO
  // =========================
  const register = async (email, password, firstName, lastName) => {
    setLoading(true)
    setError(null)

    // 1️⃣ Crear usuario en Supabase Auth
    const { data: signUpData, error: signUpError } = await supabase.auth.signUp({
      email,
      password,
      options: {
        data: { first_name: firstName, last_name: lastName }
      }
    })

    if (signUpError) {
      setLoading(false)
      setError(signUpError.message)
      return false
    }

    // 2️⃣ Insertar registro en tabla 'usuarios' (sin duplicar)
    if (signUpData?.user?.id) {
      const { error: insertError } = await supabase
        .from('usuarios')
        .insert([{ auth_uuid: signUpData.user.id }])
        .select() // opcional, devuelve el registro insertado

      if (insertError) {
        setError(insertError.message)
        setLoading(false)
        return false
      }
    }

    setLoading(false)
    return true
  }

  // =========================
  // LOGOUT
  // =========================
  const logout = async () => {
    setLoading(true)
    const { error: logoutError } = await supabase.auth.signOut()
    setLoading(false)
    if (logoutError) setError(logoutError.message)
  }

  // =========================
  // RETORNO DEL HOOK
  // =========================
  return {
    login,
    register,
    logout,
    error,
    loading
  }
}
