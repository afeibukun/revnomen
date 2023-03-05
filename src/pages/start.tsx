import Head from "next/head";
import Link from "next/link";
import Image from "next/image";
import { Inter } from "next/font/google";
import styles from "@/styles/utils.module.css";

import AppBranding from "@/components/AppBranding";
import UserAvatarGroup from "@/components/UserAvatarGroup";
import LinkButton from "@/components/LinkButton";
import GenericButton from "@/components/GenericButton";

const inter = Inter({ subsets: ["latin"] });

export default function Home() {
  return (
    <>
      <Head>
        <title>Start Game - RevName</title>
        <meta name="description" content="Reveal names of names" />
        <meta name="viewport" content="width=device-width, initial-scale=1" />
        <link rel="icon" href="/favicon.ico" />
      </Head>
      <main className="pb-8">
        <div className="container min-h-screen max-w-4xl mx-auto">
          <header className="app-header">
            <div className="mt-8">
              <div className="app-branding">
                <div className="py-12">
                  <AppBranding />
                </div>
              </div>
            </div>
          </header>
          <section className="getting-started-section">
            <div className="h-96 flex items-center justify-center mb-12 rounded-md bg-gray-300 ">
              <div className="text-group">
                <div>
                  <h4 className="text-3xl font-medium">Getting Started</h4>
                </div>
              </div>
            </div>
          </section>
          <section className="user-registration">
            <div>
              <div className="section-header">
                <div className="text-center mb-12">
                  <h2 className="text-3xl font-bold">Add Players</h2>
                </div>
              </div>
              <div className="registration-group">
                <div>
                  <form action="" className="registration-form">
                    <div>
                      <div className="name-input">
                        <div className="mb-4">
                          <label
                            htmlFor="player_name"
                            className="text-3xl font-medium"
                          >
                            Player Name
                          </label>
                          <input
                            type="text"
                            id="player_name"
                            name="player_name"
                            className="inline-block w-full py-5 px-2 rounded-md bg-gray-300 text-3xl"
                          />
                        </div>
                      </div>
                      <div className="form-button mb-12">
                        <button
                          type="submit"
                          className="inline-block py-6 px-20 rounded-lg text-2xl font-semibold bg-gray-300"
                        >
                          Save
                        </button>
                      </div>
                    </div>
                  </form>
                </div>
              </div>
            </div>
          </section>
          <section className="">
            <div>
              <div className={`${styles.waitingArea} waiting-area mb-12`}>
                <div className="flex gap-x-12 p-10 rounded-md bg-gray-200">
                  <div className="registered-user inline-block">
                    <div className="relative">
                      <div className="mb-4">
                        <UserAvatarGroup initials="AD" userName="Ade" />
                      </div>
                      <div className={`${styles.userAction} user-action`}>
                        <div className="p-3.5 rounded-md bg-gray-400">
                          <ul className="flex gap-x-2">
                            <li className="hidden">
                              <span>Ade</span>
                            </li>
                            <li>
                              <a>Update</a>
                            </li>
                            <li>
                              <a>Delete</a>
                            </li>
                          </ul>
                        </div>
                      </div>
                    </div>
                  </div>

                  <div className="registered-user inline-block">
                    <div className="">
                      <div className="mb-4">
                        <UserAvatarGroup initials="TO" userName="Tomi" />
                      </div>

                      <div className={`${styles.userAction} user-action hidden`}>
                        <div className="p-3.5 rounded-md bg-gray-400">
                          <ul className="flex gap-x-2">
                            <li className="hidden">
                              <span>Tomi</span>
                            </li>
                            <li>
                              <a>Update</a>
                            </li>
                            <li>
                              <a>Delete</a>
                            </li>
                          </ul>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              </div>

              <div className="button-group">
                <div>
                  <div className="button-group-01">
                    <div>
                      <GenericButton buttonLabel="Continue" />
                    </div>
                  </div>
                  <div className="button-group-02">
                    <div className="flex justify-between">
                      <LinkButton url="/game">Proceed to Game</LinkButton>
                      <GenericButton buttonLabel="Go Back" />
                      
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </section>
        </div>
      </main>
    </>
  );
}
