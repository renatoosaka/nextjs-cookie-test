import { IncomingMessage } from "http";
import cookie from 'cookie'

const parseCookies = (req: IncomingMessage) => {
  const data = req ? req.headers.cookie || '' : document.cookie

  if (data) {
    return  cookie.parse(data)
  }

  return null
}

export default parseCookies;