import Head from "next/head";

const Meta = ({pageTitle}:any) => {

    return (
        <>
        <Head>
          <title>{ pageTitle }</title>
          <meta name="description" content="Simple Game to reveal the nouns or names" />
          <meta name="viewport" content="width=device-width, initial-scale=1" />
          <link rel="icon" href="/favicon.ico" />
        </Head>
        </>
    )
}

Meta.defaultProps = {
  pageTitle: "Revnomen"
}
export default Meta