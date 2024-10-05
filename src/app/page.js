// src/app/page.js
import Head from 'next/head';
import ItemList from '../components/ItemList'; // Importing the ItemList component

export default function Home() {
  return (
    <div>
      <Head>
        <title>Item List</title>
        <meta name="description" content="A list of items fetched from an API" />
        <link rel="icon" href="/favicon.ico" />
      </Head>
      <main style={{ padding: '20px' }}>
        <h1>Item List</h1>
        <ItemList />
      </main>
    </div>
  );
}
