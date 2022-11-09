import { Button, Space, Tag } from 'antd'

import { trackEvent } from '../../../services/analytics'
import { withAuth } from '../../../utils/with-auth'
import { InviteTeam } from '../../InviteTeam'
import { DefaultStepProps } from './..'

const InviteContent = ({ onNext, onPrev, title }: DefaultStepProps) => {
  const goNext = () => {
    // completed form
    trackEvent({
      name: 'completedInvitationStep',
    })
    onNext?.()
  }

  return (
    <div>
      <Tag className="super-text">{title}</Tag>
      <h1>{`Get your team on board! 💪🏽`}</h1>
      <div className="description">
        {`Climate action is team work. Assemble your A team and invite them to join the platform and take action together.`}
      </div>

      <InviteTeam />

      <Space style={{ marginTop: '20px' }}>
        <Button onClick={goNext} size="large" type="primary">
          Continue
        </Button>
        <Button onClick={onPrev} size="large" type="link">
          Back
        </Button>
      </Space>
    </div>
  )
}

export const Invite = withAuth(InviteContent)

export const InviteSide = () => {
  return null
}
