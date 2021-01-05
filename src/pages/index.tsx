import { useCallback } from "react"
import { GetServerSideProps } from "next"
import { useCookies } from 'react-cookie'
import { useRouter } from 'next/router'

import Link from 'next/link'

import parseCookies from '../utils/parseCookies'

interface HomeProps {
  isLogged: boolean;
  user: any;
}

export default function Home({ isLogged, user }: HomeProps) {
  const router = useRouter();
  const [cookie, setCookie, removeCookie] = useCookies(["user"])

  const handleSignOut = useCallback(() => {
    removeCookie("user")
    router.push('/signin')
  }, [])

  return (
    <div>
      <h1>Home</h1>
      <p>{isLogged  && 'Logged in'}</p>
      <p>{!isLogged && 'Not logged'}</p>
      <p>Server Side{user && JSON.stringify(user)}</p>
      {isLogged && <button type="button" onClick={handleSignOut}>logout</button>}
      {!isLogged && (
        <Link href="/signin">
          <a>SignIn</a>
        </Link>
      )}
    </div>
  )
}


export const getServerSideProps: GetServerSideProps<HomeProps> = async ({ req }) => {
  const cookie = parseCookies(req)
  const user = cookie && cookie.user ? JSON.parse(cookie.user) : null;

  return {
    props: {
      isLogged: !!user,
      user
    }
  }
}