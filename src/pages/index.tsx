import Head from 'next/head'
import Link from 'next/link'
import Image from 'next/image'
import { Inter } from 'next/font/google'
import styles from '@/styles/Home.module.css'

const inter = Inter({ subsets: ['latin'] })

export default function Home() {
  return (
    <>
      <Head>
        <title>RevName App</title>
        <meta name="description" content="Reveal names of names" />
        <meta name="viewport" content="width=device-width, initial-scale=1" />
        <link rel="icon" href="/favicon.ico" />
      </Head>
      <main className="">
        <div className='container min-h-screen mx-auto'>
          <section className='app-intro h-screen flex flex-col justify-center items-center'>
            <div>
              <div className="text-group">
                <div className='text-center'>
                  <h1 className='mb-5 text-8xl font-bold' >Welcome</h1>
                  <h3 className="mb-7 text-4xl font-medium">to Revname Game</h3>
                </div>
              </div>
              <div className="button-group">
                <div className='text-center'>
                  <Link href="/start" className='inline-block py-6 px-20 rounded-lg text-2xl font-semibold bg-gray-300'>Start New Game</Link>
                </div>
              </div>
            </div>
          </section>
        </div>
      </main>
    </>
  )
}
