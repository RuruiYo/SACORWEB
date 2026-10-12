import { useEffect, useState } from 'react'
import logo from '../assets/logo.png'

export function useRuta() {
  const leer = () => window.location.hash.replace('#', '') || '/'
  const [ruta, setRuta] = useState(leer)

  useEffect(() => {
    const alCambiar = () => {
      setRuta(leer())
      window.scrollTo({ top: 0 })
    }
    window.addEventListener('hashchange', alCambiar)
    return () => window.removeEventListener('hashchange', alCambiar)
  }, [])

  return ruta
}

export function irA(ruta) {
  window.location.hash = ruta
}

const ENLACES = [
  { ruta: '/servicios', texto: 'Servicios' },
  { ruta: '/unete', texto: 'Unete a nosotros' },
]

export function Nav({ ruta }) {
  return (
    <header className="nav">
      <div className="contenedor nav-inner">
        <div className="nav-izq">
          <a href="#/" className="logo">
            <img className="logo-marca" src={logo} alt="SACOR" />
            <span className="logo-texto">SACOR</span>
          </a>
          <nav className="nav-links">
            {ENLACES.map((e) => (
              <a
                key={e.ruta}
                href={`#${e.ruta}`}
                className={ruta === e.ruta ? 'activo' : ''}
              >
                {e.texto}
              </a>
            ))}
          </nav>
        </div>
        <div className="nav-der">
          <button
            className="nav-btn nav-btn-solido"
            type="button"
            onClick={() => irA('/solicitar')}
          >
            Cotizar
          </button>
        </div>
      </div>
    </header>
  )
}

const COLUMNAS = [
  {
    titulo: 'Vistas',
    items: [
      { texto: 'Pagina principal', ruta: '/' },
      { texto: 'Servicios', ruta: '/servicios' },
      { texto: 'Unete a nosotros', ruta: '/unete' },
      { texto: 'Solicitar servicio', ruta: '/solicitar' },
    ],
  },
  {
    titulo: 'Servicios',
    items: [
      { texto: 'Transporte de ripio', ruta: '/servicios' },
      { texto: 'Desecho organico', ruta: '/servicios' },
      { texto: 'Materiales de construccion', ruta: '/servicios' },
      { texto: 'Reciclables', ruta: '/servicios' },
    ],
  },
]

export function Footer() {
  return (
    <footer className="footer">
      <div className="contenedor">
        <div className="footer-top">
          <div className="footer-marca">
            <div className="logo">
              <img className="logo-marca" src={logo} alt="SACOR" />
              <span className="logo-texto" style={{ fontSize: 24 }}>SACOR</span>
            </div>
            <p>
              Transporte de materiales, recoleccion de desechos y reciclaje en El
              Salvador. Para empresas y para personas.
            </p>
          </div>

          {COLUMNAS.map((col) => (
            <div className="footer-col" key={col.titulo}>
              <h4>{col.titulo}</h4>
              <ul>
                {col.items.map((i) => (
                  <li key={i.texto}>
                    <a href={`#${i.ruta}`}>{i.texto}</a>
                  </li>
                ))}
              </ul>
            </div>
          ))}

          <div className="footer-col">
            <h4>Contacto</h4>
            <ul>
              <li>+503 0000 0000</li>
              <li>servicios@sacor.com.sv</li>
              <li>San Salvador, El Salvador</li>
            </ul>
          </div>
        </div>

        <div className="footer-linea" />

        <div className="footer-bottom">
          <span>2026 SACOR. Todos los derechos reservados.</span>
          <span>Politica de privacidad &nbsp;|&nbsp; Terminos</span>
        </div>
      </div>
    </footer>
  )
}

export function Eyebrow({ children }) {
  return <span className="eyebrow">{children}</span>
}

export function SeccionHead({ eyebrow, titulo, texto }) {
  return (
    <div className="seccion-head">
      <Eyebrow>{eyebrow}</Eyebrow>
      <h2>{titulo}</h2>
      {texto && <p>{texto}</p>}
    </div>
  )
}
