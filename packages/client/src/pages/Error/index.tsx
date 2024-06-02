import { Helmet } from 'react-helmet'
import { Button } from '@mui/material'

type PageProps = {
  title: string
}

const Page = ({ title }: PageProps) => {
  return (
    <section>
      <Helmet>
        <meta charSet="utf-8" />
        <title>Error</title>
        <meta name="description" content="Error" />
      </Helmet>
      <div className="container">
        <h1>{title}</h1>
        <Button variant="contained" href="/">
          Back to main menu
        </Button>
      </div>
    </section>
  )
}

export default Page
