import { privateRoute } from '../services/privateRoute'
import { useAuth } from '../hooks/auth'

function Profile({ user }) {
  const { isLogged } = useAuth();

  return (
    <>
      <h1>Profile</h1>
      {String(isLogged)}
      {JSON.stringify(user)}
    </>
  )
}

export default privateRoute(Profile)