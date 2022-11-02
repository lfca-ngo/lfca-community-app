import {
  CheckOutlined,
  DeleteOutlined,
  ExportOutlined,
  UserOutlined,
} from '@ant-design/icons'
import { Avatar, Button, List, message, Popconfirm, Tooltip } from 'antd'

import {
  EventParticipantFragment,
  EventParticipantStatus,
  useRemoveEventParticipantMutation,
  useUpdateEventParticipantStatusMutation,
} from '../../services/lfca-backend'
import {
  eventParticipantStatusIcon,
  readableEventParticipantStatus,
} from '../../utils/events'

interface AdminEventParticipantItemProps {
  eventId: string
  participant: EventParticipantFragment
}

export const AdminEventParticipantItem = ({
  eventId,
  participant,
}: AdminEventParticipantItemProps) => {
  const [
    { fetching: fetchingUpdateEventParticipantStatus },
    updateEventParticipantStatus,
  ] = useUpdateEventParticipantStatusMutation()
  const [{ fetching: fetchingRemoveEventParticipant }, removeEventParticipant] =
    useRemoveEventParticipantMutation()

  const handleRemove = async () => {
    const res = await removeEventParticipant({
      input: {
        eventId,
        isExternal: participant.isExternal,
        userId: participant.user.id,
      },
    })

    if (res.error) {
      message.error(res.error.message)
    }
  }

  const handleAccept = async () => {
    const res = await updateEventParticipantStatus({
      input: {
        eventId,
        isExternal: participant.isExternal,
        status: EventParticipantStatus.AWAITING_USER_RSVP,
        userId: participant.user.id,
      },
    })

    if (res.error) {
      message.error(res.error.message)
    }
  }

  const isDeleted =
    'company' in participant.user && !!participant.user.deletedAt

  return (
    <List.Item
      actions={[
        <Popconfirm
          cancelText="No"
          key="delete"
          okText="Yes"
          onConfirm={handleRemove}
          placement="left"
          title="Are you sure to remove this user from the event?"
        >
          <Button
            icon={<DeleteOutlined />}
            loading={fetchingRemoveEventParticipant}
            size="small"
            type="ghost"
          />
        </Popconfirm>,
        participant.status ===
        EventParticipantStatus.AWAITING_ADMIN_APPROVAL ? (
          <Tooltip>
            <Button
              icon={<CheckOutlined />}
              key="approve"
              loading={fetchingUpdateEventParticipantStatus}
              onClick={handleAccept}
              size="small"
              type="primary"
            />
          </Tooltip>
        ) : (
          <Tooltip
            title={`${readableEventParticipantStatus(participant.status)}${
              participant.notes ? `: ${participant.notes}` : ''
            }`}
          >
            <Button
              disabled
              icon={eventParticipantStatusIcon(participant.status)}
              key="status"
              size="small"
              type="default"
            />
          </Tooltip>
        ),
      ]}
    >
      {'company' in participant.user ? (
        <List.Item.Meta
          avatar={
            <Avatar
              icon={!participant.user?.picture && <UserOutlined />}
              size={45}
              src={participant.user?.picture}
              style={{ backgroundColor: '#6A1246' }}
            />
          }
          description={participant.user?.company?.name}
          style={isDeleted ? { opacity: '0.3' } : undefined}
          title={`${isDeleted ? 'DELETED: ' : ''} ${
            participant.user?.firstName
          } ${participant.user?.lastName}`}
        />
      ) : (
        <List.Item.Meta
          avatar={
            <Avatar
              icon={<ExportOutlined />}
              size={45}
              style={{ backgroundColor: '#6A1246' }}
            />
          }
          description="external"
          title={participant.user.email}
        />
      )}
    </List.Item>
  )
}
