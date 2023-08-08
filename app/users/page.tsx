import Link from 'next/link'
import axios from 'axios'

import { User } from '../interfaces'
import Layout from '../../app/components/Layout'
import List from '../components/List'

const WithStaticProps = async () => {
  const items = (await axios.get<User[]>('http://localhost:4000/users')).data;

  return (
  <Layout title="Users List | Next.js + TypeScript Example">
    <h1>Users List</h1>
    <p>
      Example fetching data from inside <code>getStaticProps()</code>.
    </p>
    <p>You are currently on: /users</p>
    <List items={items} />
    <p>
      <Link href="/">Go home</Link>
    </p>
  </Layout>
)}

export default WithStaticProps
