import { createRoot } from 'react-dom/client'
import './index.css'
import App from './App.jsx'
import ValueProvider from './components/ValueProvider.jsx'
import { ToastContainer } from 'react-toastify'

createRoot(document.getElementById('root')).render(
  <ValueProvider>
    <App /><ToastContainer />
  </ValueProvider>
)
