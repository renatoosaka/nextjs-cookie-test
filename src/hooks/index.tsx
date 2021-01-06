import { AuthProvider  } from './auth'

const ApplicationProvider: React.FC = ({ children }) => {
  return (
    <AuthProvider>
      {children}
    </AuthProvider>
  )
}

export default ApplicationProvider;