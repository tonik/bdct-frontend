import axios from 'axios'

import { User } from '../../interfaces'
import Layout from '../../components/Layout'
import ListDetail from '../../components/ListDetail'

const StaticPropsDetail = async ({ params,
}: {
  params: { id: string }
}) => {
  const id = params.id
  const item = (await axios.get<User>(`http://localhost:4000/users/${id}`)).data;
  return (
    <Layout
      title={`${
        item ? item.name : 'User Detail'
      } | Next.js + TypeScript Example`}
    >
      {item && <ListDetail item={item} />}
    </Layout>
  )
}

export default StaticPropsDetail
