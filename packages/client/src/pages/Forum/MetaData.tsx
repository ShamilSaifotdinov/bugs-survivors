import { Helmet } from 'react-helmet'

type IProps = {
  title: string
}

export default function MetaData({ title }: IProps) {
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
