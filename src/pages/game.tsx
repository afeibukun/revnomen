import Head from "next/head";
import Link from "next/link";
import Image from "next/image";
import { Inter } from "next/font/google";
import styles from "@/styles/Home.module.css";

import AppBranding from "@/components/AppBranding";
import HiddenLetterInput from "@/components/HiddenLetterInput";
import HiddenContentCategoryName from "@/components/HiddenContentCategoryName";
import UserAvatarGroup from "@/components/UserAvatarGroup";
import ScoreCard from "@/components/ScoreCard";
import GenericButton from "@/components/GenericButton";
import LinkButton from "@/components/LinkButton";

const inter = Inter({ subsets: ["latin"] });

export default function Home() {
  return (
    <>
      <Head>
        <title>Game - RevName</title>
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

          <section className="main-game">
            <div>
              <div className="section-header">
                <div className="py-5 mb-12 rounded-md bg-gray-300">
                  <div className="game-info">
                    <div>
                      <p className="font-bold text-xl text-center">
                        Tomi&apos;s Turn
                      </p>
                    </div>
                  </div>
                </div>
              </div>
              <div className="hidden-name-box">
                <div className="p-12 mb-12 rounded-md bg-gray-300">
                  <div className="hidden-name-category category-01">
                    <div className="flex mb-5">
                      <div className="category-name">
                        <div>
                           <HiddenContentCategoryName>Person</HiddenContentCategoryName>
                        </div>
                      </div>
                      <div className="hidden-name-container">
                        <div className="flex gap-x-6">
                          <div className="hidden-name-letter">
                            <div>
                              <HiddenLetterInput categoryLabel="Cat 01 Letter 01" />
                            </div>
                          </div>
                          <div className="hidden-name-letter">
                            <div>
                              <HiddenLetterInput categoryLabel="Cat 01 Letter 02" />
                            </div>
                          </div>
                          <div className="hidden-name-letter">
                            <div>
                              <HiddenLetterInput categoryLabel="Cat 01 Letter 03" />
                            </div>
                          </div>
                          <div className="hidden-name-letter">
                            <div>
                              <HiddenLetterInput categoryLabel="Cat 01 Letter 04" />
                            </div>
                          </div>
                          <div className="hidden-name-letter">
                            <div>
                              <HiddenLetterInput categoryLabel="Cat 01 Letter 05" />
                            </div>
                          </div>
                          <div className="hidden-name-letter">
                            <div>
                              <HiddenLetterInput categoryLabel="Cat 01 Letter 06" />
                            </div>
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>

                  <div className="hidden-name-category category-02">
                    <div className="flex">
                      <div className="category-name">
                        <div>
                        <HiddenContentCategoryName>Country</HiddenContentCategoryName>
                        </div>
                      </div>
                      <div className="hidden-name-container">
                        <div className="flex gap-x-6">
                          <div className="hidden-name-letter">
                            <div>
                              <HiddenLetterInput categoryLabel="Cat 02 Letter 01" />
                            </div>
                          </div>
                          <div className="hidden-name-letter">
                            <div>
                              <HiddenLetterInput categoryLabel="Cat 02 Letter 02" />
                            </div>
                          </div>
                          <div className="hidden-name-letter">
                            <div>
                              <HiddenLetterInput categoryLabel="Cat 02 Letter 03" />
                            </div>
                          </div>
                          <div className="hidden-name-letter">
                            <div>
                              <HiddenLetterInput categoryLabel="Cat 02 Letter 04" />
                            </div>
                          </div>
                          <div className="hidden-name-letter">
                            <div>
                              <HiddenLetterInput categoryLabel="Cat 02 Letter 05" />
                            </div>
                          </div>
                          <div className="hidden-name-letter">
                            <div>
                              <HiddenLetterInput categoryLabel="Cat 02 Letter 06" />
                            </div>
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              </div>

              <div className="winner-box">
                <div className="flex justify-center items-center py-28 rounded-md mb-12 bg-gray-200">
                  <h1 className="text-8xl font-bold">Tomi Wins</h1>
                </div>
              </div>

              <div className="score-board">
                <div className="flex mb-12 rounded-md bg-gray-200 ">
                  <div className="board-labels">
                    <div className="px-6">
                      <div className="players-labels">
                        <div className="py-7">
                          <h4 className="text-xl">Players</h4>
                        </div>
                      </div>
                      <div className="points-labels">
                        <div className="mt-1.5">
                          <h4 className="text-xl">Points</h4>
                        </div>
                      </div>
                    </div>
                  </div>
                  <div className="player-scores">
                    <div className="flex gap-x-5">
                      <ScoreCard initials="AD" userName="Ade" points="20"/>
                      <ScoreCard initials="TO" userName="Tomi" points="0" winner={true}/>
                      <ScoreCard initials="TE" userName="Temi" points="0"  />
                    </div>
                  </div>
                </div>
              </div>

              <div className="button-group">
                <div>
                  <div className="button-group-game">
                    <div>
                      <div>
                        <GenericButton buttonLabel="Submit" />
                      </div>
                    </div>
                  </div>
                  <div className="button-group-finished">
                    <div className="flex gap-x-6 justify-center">
                      <LinkButton url="/">Go Home</LinkButton>
                      <LinkButton url="/start">Start a New Game</LinkButton>
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
