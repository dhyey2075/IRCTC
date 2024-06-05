import { useState } from 'react'
import TicketDetails from './components/TicketDetails.jsx';
import FindTrains from "./components/FindTrains.jsx"
import { useAuth0 } from '@auth0/auth0-react';
import "./App.css"

function App() {
  const [count, setCount] = useState(0)
  const { isAuthenticated, loginWithRedirect, logout, user } = useAuth0();

  return (
    <>
      <div className="container">
      {/* <TicketDetails className="App" /> */}
      <Home isAuthenticated={isAuthenticated} loginWithRedirect={loginWithRedirect} logout={logout} user={user}/>
      </div>
    </>
  )
}

export default App
