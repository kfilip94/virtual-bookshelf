import { getSession, signOut } from 'next-auth/client';
import React from 'react';
// import Layout from '../components/layout'
// import AccessDenied from '../components/access-denied'

export default function Library ({ content, session }) {
  // If no session exists, display access denied message
  if (!session) { return  <div>Access Denied</div> }

  // React.useEffect(() => {
  //   fetch('https://books.google.com/books?uid=116440559585501851076&hl=pl').then(data => {
  //     console.log('elo data', data);
  //   });
  // });

  // If session exists, display content
  return (
    <div>
      <h1>Protected Page</h1>
      <p><strong>{content}</strong></p>
      Signed in as {session.user.email} <br/>
      <button onClick={() => signOut({ callbackUrl: `${process.env.NEXTAUTH_URL}/login` })}>Sign out</button>
      <iframe src="/api/examples/jwt"/>

    </div>
  )
}

export async function getServerSideProps(context) {
  const session = await getSession(context)
  let content = null

  if (session) {
    const hostname = process.env.NEXTAUTH_URL || 'http://localhost:3000'
    const options = { headers: { cookie: context.req.headers.cookie } }
    const res = await fetch(`${hostname}/api/examples/protected`, options)
    const json = await res.json()
    if (json.content) { content = json.content }
  }
  console.log('Content',content)
  return {
    props: {
      session,
      content
    }
  }
}