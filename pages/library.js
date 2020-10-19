import { getSession, signOut, useSession } from 'next-auth/client';
import React from 'react';
// import Layout from '../components/layout'
// import AccessDenied from '../components/access-denied'

export default function Library ({ content, session, data }) {
  // If no session exists, display access denied message
  if (!session) { return  <div>Access Denied</div> }
  console.log('MY LIBRARY DATA:',data)
  // If session exists, display content
  return (
    <div>
      <h1>Protected Page</h1>
      <p><strong>{content}</strong></p>
      Signed in as {session.user.email} <br/>
      <button onClick={() => signOut({ callbackUrl: `${process.env.NEXTAUTH_URL}/login` })}>Sign out</button>
      {data &&
        <div>
          <h3>My library:</h3>
          <div>{JSON.stringify(data)}</div>
        </div>
      }
    </div>
  )
}

export async function getServerSideProps(context) {
  const session = await getSession(context);
  console.log('session xd:' ,session);

  let content = null;
  let myLibraryDataJSON = null;

  if (session) {
    const hostname = process.env.NEXTAUTH_URL || 'http://localhost:3000'
    const options = { headers: { cookie: context.req.headers.cookie } }
    const res = await fetch(`${hostname}/api/examples/protected`, options)
    const json = await res.json()
    if (json.content) { content = json.content }

    const accessToken = session.user && session.user.accessToken; 
    const myLibraryData = await fetch(
      'https://www.googleapis.com/books/v1/mylibrary/bookshelves',
      { 
        method: 'get', 
        headers: new Headers({
          'Authorization': `Bearer ${accessToken}`,
          'Content-Type': 'application/json'
        })
      }
    )
    myLibraryDataJSON = await myLibraryData.json();

  }
  return {
    props: {
      session,
      content,
      data: myLibraryDataJSON
    }
  }
}