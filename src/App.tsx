import './App.css'
import { Home } from './pages'
import { init as apiInit } from './service/api'
import 'react-toastify/dist/ReactToastify.css';

apiInit()

function App() {

  return (<Home />)
}

export default App
