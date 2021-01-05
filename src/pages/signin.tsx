import { useCallback } from "react"

import { useRouter } from 'next/router'

import { useCookies } from 'react-cookie'
import { GetServerSideProps } from "next";

import parseCookies from '../utils/parseCookies'

export default function SignIn() {
  const router = useRouter();
  const [cookie, setCookie] = useCookies(['user'])

  const handleSignIn = useCallback(() => {
    const userData = {
      id: '1234-5678-90',
      name: 'Username',
      email: "user@email.com"
    }

    setCookie("user", JSON.stringify(userData), {
      path: '/',
      sameSite: true,
      maxAge: 60 * 60
    })
    
    router.push('/')
  }, [])

  return (
    <>
      <h1>SignIn</h1>
      <button type="button" onClick={handleSignIn}>login</button>
    </>
  )
}

export const getServerSideProps: GetServerSideProps = async ({ req }) => {
  const cookie = parseCookies(req)

  console.log(cookie)

  if (cookie) {
    return {
      redirect: {
        destination: '/',
        statusCode: 307
      }
    }
  }

  return {
    props: {}
  }
}