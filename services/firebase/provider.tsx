import { initializeApp } from 'firebase/app'
import {
  Auth,
  connectAuthEmulator,
  getAuth,
  onAuthStateChanged,
  signInWithEmailAndPassword,
  signOut,
  UserCredential,
} from 'firebase/auth'
import React from 'react'

import { isDev } from '../../utils'
import { FIREBASE_TOKEN_STORAGE_KEY, FIREBASE_UID_STORAGE_KEY } from './config'

const firebaseConfig = {
  apiKey: process.env.NEXT_PUBLIC_FIREBASE_API_KEY,
  authDomain: process.env.NEXT_PUBLIC_FIREBASE_AUTH_DOMAIN,
}

const firebaseApp = initializeApp(firebaseConfig)
export const firebaseAuth = getAuth(firebaseApp)

if (isDev) {
  connectAuthEmulator(
    getAuth(firebaseApp),
    process.env.NEXT_PUBLIC_FIREBASE_AUTH_DOMAIN_EMULATOR
  )
}

interface FirebaseContextProps {
  auth: Auth
  login: (email: string, password: string) => Promise<UserCredential>
  logout: () => Promise<void>
  refreshToken: () => Promise<string | undefined>
  token: string | null
}

export const FirebaseContext = React.createContext<FirebaseContextProps>({
  auth: firebaseAuth,
  login: async () => ({} as UserCredential),
  logout: async () => {
    // Nothing
  },
  refreshToken: async () => undefined,
  token: null,
})

interface FirebaseProviderProps {
  children: React.ReactNode
}

export const FirebaseProvider = ({ children }: FirebaseProviderProps) => {
  const [token, setToken] = React.useState<string | null>(
    localStorage.getItem(FIREBASE_TOKEN_STORAGE_KEY)
  )

  React.useEffect(() => {
    onAuthStateChanged(firebaseAuth, async (user) => {
      if (user) {
        const token = await user.getIdToken()
        handleTokenChange(token, user.uid)
      } else {
        handleTokenChange()
      }
    })
  }, [])

  const login = React.useCallback(
    (email: string, password: string) =>
      signInWithEmailAndPassword(firebaseAuth, email, password),
    []
  )

  const logout = React.useCallback(() => signOut(firebaseAuth), [])

  const refreshToken = React.useCallback(async () => {
    const newToken = await firebaseAuth.currentUser?.getIdToken(true)
    handleTokenChange(newToken, firebaseAuth.currentUser?.uid)
    return newToken
  }, [])

  return (
    <FirebaseContext.Provider
      value={{
        auth: firebaseAuth,
        login,
        logout,
        refreshToken,
        token,
      }}
    >
      {children}
    </FirebaseContext.Provider>
  )

  function handleTokenChange(token?: string, uid?: string) {
    if (isDev) {
      console.info('>>>JWT<<<')
      console.info(token)
    }

    // persist token and uid in local storage
    if (token && uid) {
      localStorage.setItem(FIREBASE_TOKEN_STORAGE_KEY, token)
      localStorage.setItem(FIREBASE_UID_STORAGE_KEY, uid)
    } else {
      localStorage.removeItem(FIREBASE_TOKEN_STORAGE_KEY)
      localStorage.removeItem(FIREBASE_UID_STORAGE_KEY)
    }
    setToken(token || null)
  }
}
