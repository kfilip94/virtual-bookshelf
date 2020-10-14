import { signIn } from 'next-auth/client'

export default function Login() {
    return (
      <>
        <h1>Access Denied</h1>
        <p>
          <a href="/api/auth/signin"
             onClick={(e) => {
             e.preventDefault()
             signIn('google', { callbackUrl: 'http://localhost:3000/library' })
          }}>You must be signed in to view this page</a>
        </p>
      </>
    )
  }
