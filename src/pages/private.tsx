import { GetServerSideProps } from 'next';
import parseCookies from '../utils/parseCookies'

interface PrivateProps {
  user?: any
}

export function Private({ user }: PrivateProps) {
  return (
    <>
      <h1>Private</h1>
      <p>{user && JSON.stringify(user)}</p>
    </>
  )
}

export default Private;

export const getServerSideProps: GetServerSideProps<PrivateProps> = async ({ req, res }) => {
  const cookies = parseCookies(req)

  if (!cookies) {
    return {
      redirect: {
        destination: '/signin',
        statusCode: 307
      }
    }
  }


  const user = cookies && cookies.user ? JSON.parse(cookies.user) : null

  return {
    props: {
      user
    },
  }
}