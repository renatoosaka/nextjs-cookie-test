import { createContext, useCallback, useContext, useState } from "react";
import { useCookies } from 'react-cookie'

interface User {
  id: string;
  name: string;
  email: string;
}

interface SignInCredentials {
  email: string;
  password: string;
}

interface AuthData {
  isLogged: boolean;
  user: User | null
  signIn(credentials: SignInCredentials): Promise<void>;
  signOut(): void;
}

const AuthContext = createContext({} as AuthData)

export const AuthProvider: React.FC = ({ children }) => {
  const [cookie, setCookie, removeCookie] = useCookies(["user"])
  const [user, setUser] = useState<User | null>(() => {
    if (cookie.user) {
      return cookie.user
    }

    return null;
  })
  
  
  const signIn = useCallback(async ({ email }: SignInCredentials): Promise<void> => {
    const userData = {
      id: '123-456-789',
      name: 'João Kleber',
      email,
    }
    const delay = new Promise(resolve => setTimeout(resolve, 1000))
    await delay;
    
    setUser(userData)
    setCookie("user", JSON.stringify(userData), {
      path: '/',
      sameSite: true,
      maxAge: 60 * 60
    })    
  }, [])

  const signOut = useCallback(() => {
    setUser(null)
    removeCookie("user")
  }, [])

  return (
    <AuthContext.Provider value={{ isLogged: !!user, user, signIn, signOut }}>
      {children}
    </AuthContext.Provider>
  )
}

export const useAuth = () => useContext(AuthContext)
