import Head from 'next/head'
import React from 'react'
import { signIn, signOut, useSession } from 'next-auth/client'
import Link from 'next/link'

export default function Home() {
  const [ session, loading ] = useSession()

  return (
    <div className="container">
      <Head>
        <title>Virtual bookshelf</title>
        <link rel="icon" href="/favicon.ico" />
        {/* <meta
          name="google-signin-client_id"
          content={process.env.NEXT_PUBLIC_OAUTH_CLIENT_ID}
        /> */}
      </Head>

      <main>
        <h1 className="title">
          Your virtual bookshelf
        </h1>
        <Link href="/login"><a>Login</a></Link>
        <Link href="/library"><a>Library</a></Link>
        {
        // !session && <>
        //   Not signed in <br/>
        //   {/* <button onClick={signIn}>Sign in</button> */}
        //   <button onClick={() => signIn('google', ({ callbackUrl: `${process.env.NEXTAUTH_URL}/library` }))}>Sign in</button>
        // </>}
        // {session && <>
        //   Signed in as {session.user.email} <br/>
        //   <button onClick={() => signOut({ callbackUrl: `${process.env.NEXTAUTH_URL}/login` })}>Sign out</button>
        // </>
        }
      </main>     
      {/* <script src="https://apis.google.com/js/platform.js" async defer></script> */}

    </div>
  )
}
