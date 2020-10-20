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
      </Head>

      <main>
        <h1 className="title">
          Your virtual bookshelf
        </h1>
        <Link href="/login"><a>Login</a></Link>
        <Link href="/library"><a>Library</a></Link>
      </main>     
    </div>
  )
}
