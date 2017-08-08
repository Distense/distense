import { Link } from '../routes'
import Layout from '../components/layout'

export default () => (
  <Layout>
    <div>
      <Link route='profile' params={{ address: '0x098964520943bbf6731aa02ca9c7b1eb8c34e4f9' }}><a>Sample profile</a></Link>
    </div>
  </Layout>
)