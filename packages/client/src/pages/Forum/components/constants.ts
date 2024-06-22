type User = {
  id: string
  avatar: string
  login: string
}

type ForumData = {
  forum: string
  topic_count: number
  comments_count: number
}

type ForumColumn = {
  id: keyof ForumData
  label: string
  className?: string
}

export const forumColumns: readonly ForumColumn[] = [
  { id: 'forum', label: 'FORUM' },
  { id: 'topic_count', label: 'TOPIC COUNT', className: 'tc_align_right' },
  {
    id: 'comments_count',
    label: 'COMMENTS COUNT',
    className: 'tc_align_right',
  },
]

export type ForumSubjectData = {
  id: string
  name: string
  creator: User
  comments_count: number
}

type ForumSubjectColumn = {
  id: keyof ForumSubjectData
  label: string
  headerClassName?: string
  bodyClassName?: string
}

export const forumSubjectColumns: readonly ForumSubjectColumn[] = [
  { id: 'name', label: 'NAME' },
  { id: 'creator', label: 'CREATOR', headerClassName: 'creator_header' },
  {
    id: 'comments_count',
    label: 'COMMENTS COUNT',
    headerClassName: 'tc_align_right',
    bodyClassName: 'tc_align_right',
  },
]

export type ForumTopicData = {
  id: number
  creator: Partial<User>
  content: string
}

type ForumTopicColumn = {
  id: keyof ForumTopicData
  className: string
}

export const forumTopicColumns: readonly ForumTopicColumn[] = [
  { id: 'creator', className: 'author_cell' },
  { id: 'content', className: 'answer_cell' },
]
