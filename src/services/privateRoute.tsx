import React from "react"
import { NextPageContext } from "next"
import cookies from 'next-cookies'
import { redirectToSignIn } from '../services/redirectToSignIn'

export type PrivateRoute = {
  user: {
    id: string;
    name: string;
    email: string;
  }
}

export function privateRoute(WrappedComponent: any) {
  return class extends React.Component<PrivateRoute> {
    static async getInitialProps(ctx: NextPageContext) {
      const user = cookies(ctx)['user'] 

      if (!user) {
        redirectToSignIn(ctx.res)
      }

      const initialProps = { user }
      console.log(user)
      console.log('initial props private route')

      if (WrappedComponent.getInitialProps) {
        const wrappedProps = await WrappedComponent.getInitialProps(initialProps)

        return { ...wrappedProps, ...initialProps }
      }

      return initialProps;
    }

    render() {
      return <WrappedComponent {...this.props} />
    }
  }
}