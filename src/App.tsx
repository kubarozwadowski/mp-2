import { useEffect, useState } from 'react'
import Deals from './components/Deals'
import type { Deal } from './types/Deal'

const API_URL = 'https://agentdeals.dev/api/offers?limit=12'

function App() {
  const [deals, setDeals] = useState<Deal[]>([])
  const [isLoading, setIsLoading] = useState(true)
  const [error, setError] = useState('')

  useEffect(() => {
    async function fetchDeals() {
      try {
        const response = await fetch(API_URL)

        if (!response.ok) {
          throw new Error('The deals could not be loaded.')
        }

        const data: { offers: Deal[] } = await response.json()
        setDeals(data.offers)
      } catch (caughtError) {
        setError(
          caughtError instanceof Error
            ? caughtError.message
            : 'Something went wrong.',
        )
      } finally {
        setIsLoading(false)
      }
    }

    fetchDeals()
  }, [])

  return (
    <Deals deals={deals} isLoading={isLoading} error={error} />
  )
}

export default App
