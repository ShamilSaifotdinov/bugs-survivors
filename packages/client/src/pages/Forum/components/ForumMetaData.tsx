import { Helmet } from 'react-helmet'

type IProps = {
  title: string
}

export default function ForumMetaData({ title }: IProps) {
  return (
    <>
      <Helmet>
        <meta charSet="utf-8" />
        <title>{title}</title>
        <meta name="description" content={title} />
      </Helmet>
    </>
  )
}
