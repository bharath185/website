'use client'

import React, { createContext, useContext, useState, useEffect } from 'react'
import { User } from '@/types'

interface AuthContextType {
  user: User | null
  loading: boolean
  isAuthModalOpen: boolean
  authMode: 'login' | 'register'
  openAuthModal: (mode?: 'login' | 'register') => void
  closeAuthModal: () => void
  setAuthMode: (mode: 'login' | 'register') => void
  login: (email: string, password: string) => Promise<{ success: boolean; error?: string }>
  register: (name: string, email: string, password: string, phone?: string) => Promise<{ success: boolean; error?: string }>
  logout: () => Promise<void>
  checkUser: () => Promise<void>
}

const AuthContext = createContext<AuthContextType | undefined>(undefined)

export function AuthProvider({ children }: { children: React.ReactNode }) {
  const [user, setUser] = useState<User | null>(null)
  const [loading, setLoading] = useState(true)
  const [isAuthModalOpen, setIsAuthModalOpen] = useState(false)
  const [authMode, setAuthMode] = useState<'login' | 'register'>('login')

  const checkUser = async () => {
    try {
      setLoading(true)
      const res = await fetch('/api/auth/me')
      if (res.ok) {
        const data = await res.json()
        setUser(data.user || null)
      } else {
        setUser(null)
      }
    } catch {
      setUser(null)
    } finally {
      setLoading(false)
    }
  }

  useEffect(() => {
    checkUser()
  }, [])

  const openAuthModal = (mode: 'login' | 'register' = 'login') => {
    setAuthMode(mode)
    setIsAuthModalOpen(true)
  }

  const closeAuthModal = () => {
    setIsAuthModalOpen(false)
  }

  const login = async (email: string, password: string) => {
    try {
      const res = await fetch('/api/auth/login', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ email, password })
      })
      const data = await res.json()
      if (!res.ok) {
        return { success: false, error: data.error || 'Login failed' }
      }
      setUser(data.user)
      closeAuthModal()
      return { success: true }
    } catch (err) {
      console.error('Login error:', err)
      return { success: false, error: 'Network error. Please try again.' }
    }
  }

  const register = async (name: string, email: string, password: string, phone?: string) => {
    try {
      const res = await fetch('/api/auth/register', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ name, email, password, phone })
      })
      const data = await res.json()
      if (!res.ok) {
        return { success: false, error: data.error || 'Registration failed' }
      }
      setUser(data.user)
      closeAuthModal()
      return { success: true }
    } catch (err) {
      console.error('Registration error:', err)
      return { success: false, error: 'Network error. Please try again.' }
    }
  }

  const logout = async () => {
    try {
      await fetch('/api/auth/logout', { method: 'POST' })
      setUser(null)
    } catch (err) {
      console.error('Logout error:', err)
    }
  }

  return (
    <AuthContext.Provider
      value={{
        user,
        loading,
        isAuthModalOpen,
        authMode,
        openAuthModal,
        closeAuthModal,
        setAuthMode,
        login,
        register,
        logout,
        checkUser
      }}
    >
      {children}
    </AuthContext.Provider>
  )
}

export function useAuth() {
  const context = useContext(AuthContext)
  if (!context) {
    throw new Error('useAuth must be used within an AuthProvider')
  }
  return context
}
