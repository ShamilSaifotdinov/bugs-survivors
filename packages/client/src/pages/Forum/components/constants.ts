type User = {
  id: string
  avatar: string
  name: string
}

type ForumData = {
  forum: string
  topic_count: number
  answers_count: number
}

type ForumColumn = {
  id: keyof ForumData
  label: string
  className?: string
}

export const forumColumns: readonly ForumColumn[] = [
  { id: 'forum', label: 'FORUM' },
  { id: 'topic_count', label: 'TOPIC COUNT', className: 'tc_align_right' },
  { id: 'answers_count', label: 'ANSWERS COUNT', className: 'tc_align_right' },
]

type ForumSubjectData = {
  name: string
  creator: User
  answers_count: number
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
    id: 'answers_count',
    label: 'ANSWERS COUNT',
    headerClassName: 'tc_align_right',
    bodyClassName: 'tc_align_right',
  },
]

type ForumTopicData = {
  author: User
  answer: string
}

type ForumTopicColumn = {
  id: keyof ForumTopicData
  className: string
}

export const forumTopicColumns: readonly ForumTopicColumn[] = [
  { id: 'author', className: 'author_cell' },
  { id: 'answer', className: 'answer_cell' },
]
