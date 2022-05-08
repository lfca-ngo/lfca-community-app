import type { NextPage, GetStaticProps } from 'next'
import { Button, Tabs, List } from 'antd'
import { SiderLayout } from '../components/Layout'
import { fetchAllActions } from '../services/contentful'
import { ActionCard } from '../components/ActionCard'
import { ALL_ACTIONS } from '../services/contentful/fetch-all-actions'

const { TabPane } = Tabs


const Home: NextPage = (props: any) => {
  const { byTags } = props.actions
  return (
    <SiderLayout breadcrumbs={[{ text: 'Home', link: '/admin' }]}>
      <h1>Hi Anna, take the next step</h1>
      <Tabs defaultActiveKey={ALL_ACTIONS}>
        {Object.keys(byTags).map((tag: string) => {
          const actions = byTags[tag]
          return (
            <TabPane tab={tag} key={tag}>
              <List pagination={{ pageSize: 10 }} dataSource={actions} renderItem={(item: any) => {
                return (
                  <List.Item>
                    <ActionCard action={item} />
                  </List.Item>
                )
              }
              } />
            </TabPane>
          )
        })}
      </Tabs>

    </SiderLayout>
  )
}

export const getStaticProps: GetStaticProps = async (context) => {
  const actions = await fetchAllActions()

  return {
    props: {
      actions
    }
  }
}

export default Home
