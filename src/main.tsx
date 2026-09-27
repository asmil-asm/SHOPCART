import { createRoot } from 'react-dom/client'
import '@style/global.css'
import AppRoutes from '@routes/AppRoutes'
import { Provider } from 'react-redux'
import {store , presistor}from '@store/store'
import { PersistGate } from 'redux-persist/integration/react'
import "./services/API/axios-global"
import "@translate/i18"
createRoot(document.getElementById('root')!).render(
  <Provider store={store}>
    <PersistGate loading={null} persistor={presistor}>
      <AppRoutes/>
    </PersistGate>
  </Provider>
)
