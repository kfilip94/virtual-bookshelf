import Head from 'next/head'

export default function Home() {
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
      </main>     
    </div>
  )
}
