import Head from 'next/head'

export default ({ title, children }) => (
  <Head>
    <title>{ title ? `${title} - Distense` : 'Distense' }</title>
    <meta charSet='utf-8' />
    <meta name='viewport' content='initial-scale=1.0, width=device-width' />
    <link rel='shortcut icon' type='image/png' href='/favicon.png' />
    <link href='//fonts.googleapis.com/css?family=Basic' rel='stylesheet' />
    {children}

    <style>{`
      body {
        margin: 0;
        background: #fff;
        font-family: Basic;
      }

      h1, h2, h3, h4 {
        font-weight: normal;
        margin: 0;
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

      .center {
        margin: auto;
      }
    `}</style>
  </Head>
)