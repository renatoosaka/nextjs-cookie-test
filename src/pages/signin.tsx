import { useCallback } from "react"

import { useRouter } from 'next/router'

// import { useCookies } from 'react-cookie'
// import { GetServerSideProps } from "next";

import { useAuth } from '../hooks/auth'

// import parseCookies from '../utils/parseCookies'

export default function SignIn() {
  const router = useRouter();
  const { signIn, signOut, isLogged, user } = useAuth();  

  const handleSignIn = useCallback(async () => {
    await signIn({ email: 'joao@email.com', password: '123456' })

    console.log(isLogged)
    isLogged && router.push('/')
  }, [])

  const handleSignOut = useCallback(() => {
    signOut()
  }, [])

  
  return (
    <>
      <h1>SignIn</h1>
      <button type="button" onClick={handleSignIn}>sign in</button>
      <button type="button" onClick={handleSignOut}>sign out</button>
      {JSON.stringify(user)}
    </>
  )
}

// export const getServerSideProps: GetServerSideProps = async ({ req }) => {
//   const cookie = parseCookies(req)

//   console.log(cookie)

//   if (cookie) {
//     return {
//       redirect: {
//         destination: '/',
//         statusCode: 307
//       }
//     }
//   }

//   return {
//     props: {}
//   }
// }