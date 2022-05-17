import type { NextPage } from 'next'

import { AchievementsList } from '../components/AchievementsList'
import { Main, Section, SiderLayout } from '../components/Layout'
import { withAuth } from '../services/firebase'
import { useCompanyAchievementsQuery } from '../services/lfca-backend'

const Achievements: NextPage = () => {
  const [{ data }] = useCompanyAchievementsQuery()

  return (
    <SiderLayout>
      <Main>
        <Section title="Achievements" titleSize="big">
          <AchievementsList
            achievements={data?.company.program.achievements || []}
          />
        </Section>
      </Main>
    </SiderLayout>
  )
}

export default withAuth(Achievements)
