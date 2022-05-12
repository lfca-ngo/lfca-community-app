import type { GetStaticProps, NextPage } from 'next'

import { ActionsCarousel } from '../../components/ActionsCarousel'
import { ActionsList } from '../../components/ActionsList'
import Logout from '../../components/Auth/Logout'
import { Main, Section, Sider, SiderLayout } from '../../components/Layout'
import { fetchAllActions } from '../../services/contentful'
import { ACTIONS_NAV } from '../../utils/navs'

const Home: NextPage = (props: any) => {
  const { byTags } = props.actions
  const highlightedActions = byTags['Tech'] // @TODO: replace with recommended, required, expired

  return (
    <SiderLayout nav={ACTIONS_NAV}>
      <Main>
        <Section title="Dashboard" titleSize="big">
          <ActionsCarousel actions={highlightedActions} />
        </Section>
        <Section bordered={false} title="Browse all actions">
          <ActionsList actionsByTags={byTags} />
          <Logout />
        </Section>
      </Main>
      <Sider>
        <Section>
          <Section title="Rewards">Something</Section>
        </Section>
      </Sider>
    </SiderLayout>
  )
}

export const getStaticProps: GetStaticProps = async () => {
  const actions = await fetchAllActions()

  return {
    props: {
      actions,
    },
  }
}

export default Home
