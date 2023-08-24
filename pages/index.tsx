import LandingPage from "@/components/landing";
import Head from "next/head";

export default function Home() {
  return (
    <>
      <Head>
        <title>Wotion - Widgets for Notion</title>
        <meta
          name="description"
          content="A library of dynamic widgets made for use in your Notion Docs."
        />
        <meta name="viewport" content="width=device-width, initial-scale=1" />
        <link rel="icon" href="/logo.png" />
      </Head>

      <main>
        <LandingPage />
      </main>
    </>
  );
}
