import './App.css'
import { Home } from './pages'
import { init as apiInit } from './service/api'

apiInit()

function App() {

  return (<Home />)
}

export default App
