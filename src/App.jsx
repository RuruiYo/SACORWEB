import { Footer, Nav, useRuta } from './components/Layout'
import Home from './pages/Home'
import Servicios from './pages/Servicios'
import Solicitar from './pages/Solicitar'
import Unete from './pages/Unete'

const VISTAS = {
  '/': Home,
  '/servicios': Servicios,
  '/unete': Unete,
  '/solicitar': Solicitar,
}

export default function App() {
  const ruta = useRuta()
  const Vista = VISTAS[ruta] ?? Home

  return (
    <>
      <Nav ruta={ruta} />
      <main>
        <Vista />
      </main>
      <Footer />
    </>
  )
}
