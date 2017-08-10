import Head from 'next/head'

export default ({ title, children }) => (
  <Head>
    <title>{ title ? `${title} - Distense` : 'Distense' }</title>
    <meta charSet='utf-8' />
    <meta name='viewport' content='initial-scale=1.0, width=device-width' />
    <link rel='shortcut icon' type='image/png' href='/favicon.png' />
    {children}
  </Head>
)