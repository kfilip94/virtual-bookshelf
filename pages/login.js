import { signIn } from 'next-auth/client'

export default function Login() {
    return (
      <>
        <h1>Access Denied</h1>
        <p>
          <a href="/api/auth/signin"
             onClick={(e) => {
             e.preventDefault()
             signIn('google', { callbackUrl: `${process.env.NEXTAUTH_URL}/library` })
          }}>Log in</a>
        </p>
      </>
    )
  }
