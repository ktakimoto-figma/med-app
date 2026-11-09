import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import { HashRouter, Outlet, Route, Routes } from 'react-router-dom'
import './styles/global.css'
import { Sidebar } from './components/Sidebar'
import { HomePage } from './pages/Home'
import { SchedulePage } from './pages/Schedule'
import { ClientsPage } from './pages/Clients'
import { RecordsPage } from './pages/Records'
import { BillingPage } from './pages/Billing'

function Layout() {
  return (
    <div className="app">
      <Sidebar />
      <main className="app__main">
        <Outlet />
      </main>
    </div>
  )
}

createRoot(document.getElementById('root')!).render(
  <StrictMode>
    <HashRouter>
      <Routes>
        <Route element={<Layout />}>
          <Route index element={<HomePage />} />
          <Route path="schedule" element={<SchedulePage />} />
          <Route path="clients" element={<ClientsPage />} />
          <Route path="records" element={<RecordsPage />} />
          <Route path="billing" element={<BillingPage />} />
        </Route>
      </Routes>
    </HashRouter>
  </StrictMode>,
)
