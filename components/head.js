import Head from "next/head";
import React from "react";
import {
  APP_URL,
  HEAD_DESCRIPTION_CN,
  HEAD_DESCRIPTION_EN,
  HEAD_TITLE_CN,
  HEAD_TITLE_EN,
  META_IMAGE,
} from "../components/settings";

function GetHead() {
  return (
    <div>
      <Head>
        <meta charSet="utf-8" />
        <meta name="viewport" content="width=device-width, initial-scale=1" />
        <meta name="theme-color" content="#000000" />

        {/* Primary Meta Tags */}
        <meta name="title" content={HEAD_TITLE_CN + " " + HEAD_TITLE_EN} />
        <meta
          name="description"
          content={HEAD_DESCRIPTION_CN + " " + HEAD_DESCRIPTION_EN}
        />

        {/* Open Graph / Facebook */}
        <meta property="og:type" content="website" />
        <meta property="og:url" content={APP_URL} />
        <meta
          property="og:title"
          content={HEAD_TITLE_CN + " " + HEAD_TITLE_EN}
        />
        <meta
          property="og:description"
          content={HEAD_DESCRIPTION_CN + " " + HEAD_DESCRIPTION_EN}
        />
        <meta property="og:image" content={META_IMAGE} />

        {/* Twitter */}
        <meta property="twitter:card" content="summary_large_image" />
        <meta property="twitter:url" content={APP_URL} />
        <meta
          property="twitter:title"
          content={HEAD_TITLE_CN + " " + HEAD_TITLE_EN}
        />
        <meta
          property="twitter:description"
          content={HEAD_DESCRIPTION_CN + " " + HEAD_DESCRIPTION_EN}
        />
        <meta property="twitter:image" content={META_IMAGE} />
        <title>
          {HEAD_TITLE_CN} {HEAD_TITLE_EN}
        </title>
        <link rel="icon" href="/favicon/favicon.ico" />
        <link
          rel="apple-touch-icon"
          sizes="57x57"
          href="/favicon/apple-icon-57x57.png"
        />
        <link
          rel="apple-touch-icon"
          sizes="60x60"
          href="/favicon/apple-icon-60x60.png"
        />
        <link
          rel="apple-touch-icon"
          sizes="72x72"
          href="/favicon/apple-icon-72x72.png"
        />
        <link
          rel="apple-touch-icon"
          sizes="76x76"
          href="/favicon/apple-icon-76x76.png"
        />
        <link
          rel="apple-touch-icon"
          sizes="114x114"
          href="/favicon/apple-icon-114x114.png"
        />
        <link
          rel="apple-touch-icon"
          sizes="120x120"
          href="/favicon/apple-icon-120x120.png"
        />
        <link
          rel="apple-touch-icon"
          sizes="144x144"
          href="/favicon/apple-icon-144x144.png"
        />
        <link
          rel="apple-touch-icon"
          sizes="152x152"
          href="/favicon/apple-icon-152x152.png"
        />
        <link
          rel="apple-touch-icon"
          sizes="180x180"
          href="/favicon/apple-icon-180x180.png"
        />
        <link
          rel="icon"
          type="image/png"
          sizes="192x192"
          href="/favicon/android-icon-192x192.png"
        />
        <link
          rel="icon"
          type="image/png"
          sizes="32x32"
          href="/favicon/favicon-32x32.png"
        />
        <link
          rel="icon"
          type="image/png"
          sizes="96x96"
          href="/favicon/favicon-96x96.png"
        />
        <link
          rel="icon"
          type="image/png"
          sizes="16x16"
          href="/favicon/favicon-16x16.png"
        />
      </Head>
    </div>
  );
}

export default GetHead;
