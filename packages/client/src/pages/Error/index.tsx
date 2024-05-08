import { Button } from '@mui/material'

type PageProps = {
  title: string
}

const Page = ({ title }: PageProps) => {
  return (
    <section>
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
