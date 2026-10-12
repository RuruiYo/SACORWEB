import { useCallback, useEffect, useState } from 'react'
import { SERVICIOS_CARRUSEL } from '../data/contenido'
import { irA } from './Layout'

function estiloSlide(offset, total) {
  if (offset === 0) {
    return {
      transform: 'translateX(0px) scale(1) rotateY(0deg)',
      opacity: 1,
      zIndex: 30,
      filter: 'brightness(1)',
      boxShadow: '0 25px 60px rgba(0,0,0,0.9), 0 0 38px rgba(34,197,94,0.28)',
      cursor: 'default',
    }
  }
  if (offset === 1) {
    return {
      transform: 'translateX(285px) scale(0.84) rotateY(-24deg)',
      opacity: 0.65,
      zIndex: 20,
      filter: 'brightness(0.75)',
    }
  }
  if (offset === 2 && total >= 5) {
    return {
      transform: 'translateX(510px) scale(0.68) rotateY(-38deg)',
      opacity: 0.38,
      zIndex: 10,
      filter: 'brightness(0.55) blur(1px)',
    }
  }
  if (offset === total - 1) {
    return {
      transform: 'translateX(-285px) scale(0.84) rotateY(24deg)',
      opacity: 0.65,
      zIndex: 20,
      filter: 'brightness(0.75)',
    }
  }
  if (offset === total - 2 && total >= 5) {
    return {
      transform: 'translateX(-510px) scale(0.68) rotateY(38deg)',
      opacity: 0.38,
      zIndex: 10,
      filter: 'brightness(0.55) blur(1px)',
    }
  }
  return {
    transform: 'translateX(0px) scale(0.4) rotateY(0deg)',
    opacity: 0,
    zIndex: 0,
    filter: 'brightness(0.4) blur(2px)',
  }
}

export default function Carrusel() {
  const total = SERVICIOS_CARRUSEL.length
  const [actual, setActual] = useState(0)
  const [pausado, setPausado] = useState(false)

  const siguiente = useCallback(() => setActual((i) => (i + 1) % total), [total])
  const anterior = useCallback(() => setActual((i) => (i - 1 + total) % total), [total])

  useEffect(() => {
    if (pausado) return
    const id = setInterval(siguiente, 5000)
    return () => clearInterval(id)
  }, [pausado, siguiente])

  useEffect(() => {
    const alTeclear = (e) => {
      if (e.key === 'ArrowRight') siguiente()
      if (e.key === 'ArrowLeft') anterior()
    }
    window.addEventListener('keydown', alTeclear)
    return () => window.removeEventListener('keydown', alTeclear)
  }, [siguiente, anterior])

  return (
    <section
      className="carrusel"
      onMouseEnter={() => setPausado(true)}
      onMouseLeave={() => setPausado(false)}
    >
      <div className="contenedor">
        <div className="carrusel-eyebrow">LO QUE MOVEMOS TODOS LOS DIAS</div>

        <div className="escenario">
          <button className="flecha flecha-izq" onClick={anterior} aria-label="Anterior">
            &lt;
          </button>

          {SERVICIOS_CARRUSEL.map((s, i) => {
            const offset = (i - actual + total) % total
            const esCentro = offset === 0
            return (
              <article
                key={s.titulo}
                className="slide"
                style={estiloSlide(offset, total)}
                onClick={() => !esCentro && setActual(i)}
              >
                <div className="slide-foto" />
                <div className="slide-vineta" />

                {esCentro ? (
                  <div className="slide-contenido">
                    <span className="slide-tag">{s.tag}</span>
                    <div>
                      <h3 className="slide-titulo">{s.titulo}</h3>
                      <div className="slide-subtitulo">{s.subtitulo}</div>
                      <div className="slide-divisor" />
                      <p className="slide-desc">{s.desc}</p>
                      <button className="slide-cta" onClick={() => irA('/solicitar')}>
                        SOLICITAR SERVICIO <span>&rarr;</span>
                      </button>
                    </div>
                  </div>
                ) : (
                  <div className="slide-nombre-lateral">{s.corto}</div>
                )}
              </article>
            )
          })}

          <button className="flecha flecha-der" onClick={siguiente} aria-label="Siguiente">
            &gt;
          </button>
        </div>

        <div className="puntos">
          {SERVICIOS_CARRUSEL.map((s, i) => (
            <button
              key={s.titulo}
              className={`punto ${i === actual ? 'activo' : ''}`}
              onClick={() => setActual(i)}
              aria-label={`Ir al servicio ${i + 1}`}
            />
          ))}
        </div>

        <div className="carrusel-link">
          <a className="btn btn-fantasma btn-sm" href="#/servicios">
            Ver todos los servicios
          </a>
        </div>
      </div>
    </section>
  )
}
