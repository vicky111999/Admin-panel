import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import './index.css'
import App from './App.jsx'
import { BrowserRouter } from 'react-router-dom'
import { PersistGate } from 'redux-persist/integration/react'
import { Provider } from 'react-redux'
import { persistor, store } from './Redux/store.js'
// import 'antd/dist/reset.css'
// import Authprovider from './Context/Authprovider.jsx'

createRoot(document.getElementById('root')).render(
  <StrictMode>
  <BrowserRouter>
  {/* <Authprovider> */}
  <Provider store={store}>
<PersistGate loading={null} persistor={persistor}>
    <App />
    </PersistGate>
  </Provider>
  {/* </Authprovider> */}
  </BrowserRouter>
  </StrictMode>,
)
