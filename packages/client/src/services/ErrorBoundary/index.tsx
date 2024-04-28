import { Link, Typography } from '@mui/material'
import React, { ReactNode, ErrorInfo } from 'react'

type ErrorBoundaryProps = {
  children?: ReactNode
}

const ErrorComponent = () => {
  return (
    <section>
      <div
        className="container"
        style={{ textAlign: 'center', paddingTop: '10rem' }}>
        <Typography color="black">Something went wrong</Typography>
        <Link href="/">Go home</Link>
      </div>
    </section>
  )
}

class ErrorBoundary extends React.Component<ErrorBoundaryProps> {
  state = {
    hasError: false,
    error: { message: '', stack: '' },
    info: { componentStack: '' },
  }

  static getDerivedStateFromError = (error: Error) => {
    console.log(error)

    return { hasError: true }
  }

  componentDidCatch = (error: Error, info: ErrorInfo) => {
    console.log(error, info)

    this.setState({ error, info })
  }

  render() {
    try {
      const { hasError, error, info } = this.state
      console.log(error, info)
      const { children } = this.props

      return hasError ? <ErrorComponent /> : children
    } catch {
      return <ErrorComponent />
    }
  }
}

export default ErrorBoundary
