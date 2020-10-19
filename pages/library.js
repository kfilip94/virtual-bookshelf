import { getSession, signOut, useSession } from 'next-auth/client';
import React from 'react';
// import Layout from '../components/layout'
// import AccessDenied from '../components/access-denied'

export default function Library ({ content, session, token }) {
  // If no session exists, display access denied message
  if (!session) { return  <div>Access Denied</div> }

  // If session exists, display content
  return (
    <div>
      <h1>Protected Page</h1>
      <p><strong>{content}</strong></p>
      Signed in as {session.user.email} <br/>
      <button onClick={() => signOut({ callbackUrl: `${process.env.NEXTAUTH_URL}/login` })}>Sign out</button>
    </div>
  )
}

export async function getServerSideProps(context) {
  const session = await getSession(context);
  console.log('session xd:' ,session);

  let content = null;
  if (session) {
    const hostname = process.env.NEXTAUTH_URL || 'http://localhost:3000'
    const options = { headers: { cookie: context.req.headers.cookie } }
    const res = await fetch(`${hostname}/api/examples/protected`, options)
    const json = await res.json()
    if (json.content) { content = json.content }

    const accessToken = session.user && session.user.accessToken; 
    fetch(
      'https://www.googleapis.com/books/v1/mylibrary/bookshelves',
      { 
        method: 'get', 
        headers: new Headers({
          'Authorization': `Bearer ${accessToken}`,
          'Content-Type': 'application/json'
        })
      }
    )
    .then(data => data.json())
    .then(parsed => console.log({ parsed }))

  }
  return {
    props: {
      session,
      content
    }
  }
}