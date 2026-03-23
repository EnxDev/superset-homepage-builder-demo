// Import from the new modular architecture
import { HomepageBuilder } from './pages'
import { Analytics } from '@vercel/analytics/react'

function App() {
  return (
    <>
      <HomepageBuilder />
      <Analytics />
    </>
  )
}

export default App
