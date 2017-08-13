import React from 'react'
import Head from 'next/head'

const FONT_STACK = '-apple-system, BlinkMacSystemFont, sans-serif'

export default ({ title, children }) => (
  <Head>
    <title>{ title ? `${title} - Distense` : 'Distense' }</title>
    <meta charSet='utf-8' />
    <meta name='viewport' content='initial-scale=1.0, width=device-width' />
    <link rel='shortcut icon' type='image/png' href='/favicon.png' />
    <link href='//maxcdn.bootstrapcdn.com/font-awesome/4.7.0/css/font-awesome.min.css' rel='stylesheet' />
    <link href='//fonts.googleapis.com/css?family=Quicksand' rel='stylesheet' />
    {children}

    <style>{`
      html {
        font-size: 90%;
      }

      body {
        margin: 0;
        background: #fff;
        font-family: ${FONT_STACK};
      }

      h1, h2, h3, h4 {
        font-weight: normal;
        margin: 0;
        font-family: Quicksand
      }

      hr {
        border: none;
        height: 1px;
        background: #ccc;
      }

      a {
        text-decoration: none;
        color: #3CA3DC;
      }

      img {
        display: block;
      }

      input {
        font-family: ${FONT_STACK};
        font-size: 1rem;
        padding: 0.5rem;
        border: none;
        outline: none;
        transition: all 0.3s;
      }

      button {
        background: none;
        border: none;
        outline: none;
        cursor: pointer;
        transition: all 0.3s;
        padding: 0;
      }
    `}</style>
  </Head>
)