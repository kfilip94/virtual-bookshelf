import { getSession, signOut, useSession } from 'next-auth/client';
import React from 'react';
import Layout from 'components/layout/layout'

export default function Library ({ content, session }) {
  // If no session exists, display access denied message
  if (!session) { return  <div>Access Denied</div> }

  return (
    <Layout>
      {content &&
        <div>
          <h3>My library:</h3>
          <div>{JSON.stringify(content)}</div>
        </div>
      }
    </Layout>
  )
}

export async function getServerSideProps(context) {
  const session = await getSession(context);
  let content = null;

  if (session) {
    const accessToken = session.user && session.user.accessToken; 
    const myLibraryData = await fetch(
      'https://www.googleapis.com/books/v1/mylibrary/bookshelves',
      { 
        method: 'get', 
        headers: new Headers({
          'Authorization': `Bearer ${accessToken}`,
          'Content-Type': 'application/json',
          
        })
      }
    )
    content = await myLibraryData.json();
  }
  return {
    props: {
      session,
      content
    }
  }
}