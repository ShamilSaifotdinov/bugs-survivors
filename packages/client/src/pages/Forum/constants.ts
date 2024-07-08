export type User = {
  id: string
  avatar: string
  login: string
}

export type ForumData = {
  id: string
  name: string
  creator: User
  comments_count: number
}

type ForumColumn = {
  id: keyof ForumData
  label: string
  headerClassName?: string
  bodyClassName?: string
}

export const forumColumns: readonly ForumColumn[] = [
  { id: 'name', label: 'NAME' },
  { id: 'creator', label: 'CREATOR', headerClassName: 'creator_header' },
  {
    id: 'comments_count',
    label: 'COMMENTS COUNT',
    headerClassName: 'tc_align_right',
    bodyClassName: 'tc_align_right',
  },
]

export type TopicData = {
  id: number
  creator: Partial<User>
  content: string
  replies_count: number
  emoji: Emoji[] | []
}

type TopicColumn = {
  id: Exclude<keyof TopicData, 'emoji'>
  className: string
}

export type Emoji = {
  count: number
  emoji: string
}

export const topicColumns: readonly TopicColumn[] = [
  { id: 'creator', className: 'author_cell' },
  { id: 'content', className: 'answer_cell' },
]
