import Layout from '../components/layout'

export default ({ url: { query: { address } } }) => (
  <Layout title={address}>
    <div>Address: {address}</div>
  </Layout>
)