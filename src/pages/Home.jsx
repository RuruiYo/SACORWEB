import heroImg from '../assets/hero.png'
import { CLIENTES } from '../data/contenido'
import { irA } from '../components/Layout'

export default function Home() {
  return (
    <>
      <section className="hero">
        <div className="hero-media">
          <img src={heroImg} alt="Flota de SACOR en operacion" />
          <div className="hero-scrim" />
        </div>
        <div className="hero-glow" />

        <div className="contenedor hero-contenido">
          <div className="hero-badge">
            <span>EL SALVADOR</span>
            Soluciones Ambientales Corporativas
          </div>

          <h1>
            Movemos tus materiales.
            <br />
            Reciclamos lo demas.
          </h1>

          <p className="hero-sub">
            Flota propia de camiones para acarreo de materiales de construccion,
            agregados y desechos. Recoleccion, traslado y aprovechamiento de
            reciclables, para centros comerciales e industria en todo El Salvador.
          </p>

          <div className="hero-ctas">
            <button className="btn btn-solido" onClick={() => irA('/solicitar')}>
              Solicitar cotizacion
            </button>
            <button className="btn btn-fantasma" onClick={() => irA('/servicios')}>
              Servicios
            </button>
          </div>

          <div className="hero-stats">
            <div>
              <div className="stat-num">+5</div>
              <div className="stat-label">Años de operación</div>
            </div>
            <div>
              <div className="stat-num">+5</div>
              <div className="stat-label">Unidades en flota</div>
            </div>
            <div>
              <div className="stat-num">24/7</div>
              <div className="stat-label">Disponibilidad</div>
            </div>
          </div>
        </div>
      </section>

      <section className="clientes">
        <div className="contenedor clientes-inner">
          <div className="clientes-label">Confian en nosotros</div>
          <div className="clientes-lista">
            {CLIENTES.map((c) => (
              <span key={c}>{c}</span>
            ))}
          </div>
        </div>
      </section>
    </>
  )
}
