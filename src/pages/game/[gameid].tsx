import Head from "next/head";



export default function Game() {
  return (
    <>
      <Head>
        <title>Game</title>
        <meta name="description" content="" />
        <link rel="icon" href="/favicon.ico" />
      </Head>
      <main className="flex min-h-screen flex-col items-center justify-center bg-gradient-to-b from-[#2e026d] to-[#15162c]">
        <h1 className="text-5xl font-extrabold tracking-tight text-white sm:text-[5rem]">
          Monolpy
        </h1>
      </main>
    </>
  );
}
