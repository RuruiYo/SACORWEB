import Carrusel from '../components/Carrusel'
import { Eyebrow, SeccionHead, irA } from '../components/Layout'
import { PASOS_SERVICIO, PUBLICO, SERVICIOS_DETALLE } from '../data/contenido'

export default function Servicios() {
  return (
    <>
      <section className="page-head">
        <div className="page-glow" />
        <div className="contenedor">
          <Eyebrow>SERVICIOS</Eyebrow>
          <h1>Todo lo que podemos mover por vos</h1>
          <p>
            Cada servicio funciona igual para una casa que para una obra completa.
            Elegi el que necesitas y te cotizamos por WhatsApp el mismo dia.
          </p>
        </div>
      </section>

      <Carrusel />

      <section className="seccion seccion-alt">
        <div className="contenedor">
          {SERVICIOS_DETALLE.map((s, i) => (
            <article
              key={s.titulo}
              className={`fila-servicio ${i % 2 === 1 ? 'invertida' : ''}`}
            >
              <div className="fila-foto">{s.num}</div>
              <div className="fila-cuerpo">
                <span className="tag-verde">{s.tag}</span>
                <h3>{s.titulo}</h3>
                <p>{s.desc}</p>
                <ul className="fila-bullets">
                  {s.bullets.map((b) => (
                    <li key={b}>{b}</li>
                  ))}
                </ul>
                <div className="fila-pie">
                  <button className="btn btn-solido btn-sm" onClick={() => irA('/solicitar')}>
                    Cotizar este servicio
                  </button>
                  <small>{s.precio}</small>
                </div>
              </div>
            </article>
          ))}
        </div>
      </section>

      <section className="seccion">
        <div className="contenedor">
          <SeccionHead
            eyebrow="COBERTURA TOTAL"
            titulo="Trabajamos igual para tu empresa que para tu casa"
            texto="No importa si necesitas 30 viajes al mes para una obra o un solo camion para sacar el ripio de una remodelacion. La misma flota, el mismo precio justo."
          />
          <div className="grid-2">
            {PUBLICO.map((p) => (
              <div
                key={p.titulo}
                className={`card-publico ${p.destacada ? 'destacada' : ''}`}
              >
                <span className="icono-redondo">{p.inicial}</span>
                <h3>{p.titulo}</h3>
                <p>{p.desc}</p>
                <ul className="lista-check">
                  {p.items.map((i) => (
                    <li key={i}>{i}</li>
                  ))}
                </ul>
                <button
                  className={`btn ${p.destacada ? 'btn-solido' : 'btn-fantasma'}`}
                  onClick={() => irA('/solicitar')}
                >
                  {p.cta}
                </button>
              </div>
            ))}
          </div>
        </div>
      </section>

      <section className="seccion seccion-alt">
        <div className="contenedor">
          <SeccionHead
            eyebrow="COMO FUNCIONA"
            titulo="Pedir un servicio toma cuatro pasos"
            texto="Sin formularios eternos ni visitas previas. Nos contas que necesitas y nosotros resolvemos el resto."
          />
          <div className="grid-4">
            {PASOS_SERVICIO.map((p) => (
              <div className="tarjeta paso" key={p.n}>
                <span className="paso-num">{p.n}</span>
                <h3>{p.titulo}</h3>
                <p>{p.desc}</p>
              </div>
            ))}
          </div>
        </div>
      </section>
    </>
  )
}
