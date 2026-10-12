import { useState } from 'react'
import { Eyebrow, SeccionHead } from '../components/Layout'
import { BENEFICIOS, VACANTES } from '../data/contenido'
import { crearSolicitudEmpleo } from '../servicios/api'
import { enlaceEmpleo } from '../servicios/whatsapp'

const VACIO = {
  nombre: '',
  dui: '',
  correo: '',
  telefono: '',
  puesto: 'Motorista de volqueta',
  experiencia: '',
  municipio: '',
  licencia: 'No tengo',
  mensaje: '',
}

export default function Unete() {
  const [form, setForm] = useState(VACIO)
  const [estado, setEstado] = useState({
    cargando: false,
    ok: null,
    error: null,
    whatsapp: null,
  })

  const cambiar = (campo) => (e) => setForm({ ...form, [campo]: e.target.value })

  const enviar = async (e) => {
    e.preventDefault()
    setEstado({ cargando: true, ok: null, error: null, whatsapp: null })

    // Se arma antes de limpiar el formulario, porque usa sus datos.
    const linkWhatsapp = enlaceEmpleo(form)

    try {
      const r = await crearSolicitudEmpleo({
        nombre: form.nombre,
        dui: form.dui,
        telefono: form.telefono,
        email: form.correo || null,
        tipoPuesto: form.puesto,
      })

      setEstado({
        cargando: false,
        ok: `${r.mensaje} Numero de solicitud: ${r.idSolicitud}.`,
        error: null,
        whatsapp: linkWhatsapp,
      })
      setForm(VACIO)
    } catch (err) {
      setEstado({ cargando: false, ok: null, error: err.message, whatsapp: null })
    }
  }

  const irAlFormulario = () => {
    document.getElementById('formulario')?.scrollIntoView({ behavior: 'smooth' })
  }

  return (
    <>
      <section className="page-head">
        <div className="page-glow" />
        <div className="contenedor">
          <Eyebrow>TRABAJA CON NOSOTROS</Eyebrow>
          <h1>Sumate al equipo que mueve El Salvador</h1>
          <p>
            Buscamos motoristas, tecnicos de reciclaje y personal de clasificacion.
            Equipo propio, rutas definidas y pago puntual. No necesitas experiencia
            previa en todos los puestos.
          </p>

          <div className="hero-ctas" style={{ marginTop: 32 }}>
            <a className="btn btn-solido" href="#vacantes">
              Ver vacantes abiertas
            </a>
            <button className="btn btn-fantasma" onClick={irAlFormulario}>
              Enviar mi hoja de vida
            </button>
          </div>

          <div className="hero-stats" style={{ marginTop: 44 }}>
            <div>
              <div className="stat-num">+5</div>
              <div className="stat-label">Anios de operacion</div>
            </div>
            <div>
              <div className="stat-num">100%</div>
              <div className="stat-label">Prestaciones de ley</div>
            </div>
            <div>
              <div className="stat-num">14</div>
              <div className="stat-label">Departamentos de cobertura</div>
            </div>
          </div>
        </div>
      </section>

      <section className="seccion seccion-alt">
        <div className="contenedor">
          <SeccionHead
            eyebrow="POR QUE SACOR"
            titulo="Lo que ofrecemos a quien se suma"
            texto="No prometemos lo que no cumplimos. Esto es lo que recibe cada persona del equipo desde el primer dia."
          />
          <div className="grid-3">
            {BENEFICIOS.map((b) => (
              <div className="tarjeta" key={b.titulo}>
                <span className="icono-redondo">{b.titulo[0]}</span>
                <h3 style={{ marginTop: 10, fontSize: 18, fontWeight: 700 }}>{b.titulo}</h3>
                <p style={{ marginTop: 10, fontSize: 13.5, lineHeight: 1.5, color: 'var(--texto-dim)' }}>
                  {b.desc}
                </p>
              </div>
            ))}
          </div>
        </div>
      </section>

      <section className="seccion" id="vacantes">
        <div className="contenedor">
          <SeccionHead
            eyebrow="VACANTES ABIERTAS"
            titulo="Puestos disponibles ahora"
            texto="Si no ves tu puesto, igual podes dejarnos tus datos. Abrimos plazas cada mes."
          />
          <div style={{ marginTop: 44 }}>
            {VACANTES.map((v) => (
              <article className="vacante" key={v.titulo}>
                <div className="vacante-info">
                  <h3>{v.titulo}</h3>
                  <div className="vacante-chips">
                    <span>{v.area}</span>
                    <span>{v.tipo}</span>
                    <span>{v.lugar}</span>
                  </div>
                  <p>{v.req}</p>
                </div>
                <button
                  className="btn btn-solido btn-sm"
                  onClick={() => {
                    setForm({ ...form, puesto: v.titulo })
                    irAlFormulario()
                  }}
                >
                  Aplicar
                </button>
              </article>
            ))}
          </div>
        </div>
      </section>

      <section className="seccion seccion-alt" id="formulario">
        <div className="contenedor">
          <form className="form-caja" onSubmit={enviar}>
            <div>
              <h2>Dejanos tus datos</h2>
              <p>
                No necesitas hoja de vida formal. Con estos datos te contactamos y el
                resto lo vemos por telefono o WhatsApp.
              </p>
            </div>

            <div className="fila-campos">
              <div className="campo">
                <label htmlFor="nombre">Nombre completo</label>
                <input
                  id="nombre"
                  required
                  maxLength={150}
                  placeholder="Tu nombre y apellido"
                  value={form.nombre}
                  onChange={cambiar('nombre')}
                />
              </div>
              <div className="campo">
                <label htmlFor="telefono">Telefono / WhatsApp</label>
                <input
                  id="telefono"
                  required
                  maxLength={25}
                  placeholder="+503 0000 0000"
                  value={form.telefono}
                  onChange={cambiar('telefono')}
                />
              </div>
            </div>

            <div className="fila-campos">
              <div className="campo">
                <label htmlFor="dui">DUI</label>
                <input
                  id="dui"
                  required
                  maxLength={10}
                  placeholder="00000000-0"
                  pattern="\d{8}-\d"
                  title="Formato 00000000-0"
                  value={form.dui}
                  onChange={cambiar('dui')}
                />
              </div>
              <div className="campo">
                <label htmlFor="correo">Correo electronico (opcional)</label>
                <input
                  id="correo"
                  type="email"
                  maxLength={254}
                  placeholder="nombre@correo.com"
                  value={form.correo}
                  onChange={cambiar('correo')}
                />
              </div>
            </div>

            <div className="fila-campos">
              <div className="campo">
                <label htmlFor="puesto">Puesto que te interesa</label>
                <select id="puesto" value={form.puesto} onChange={cambiar('puesto')}>
                  {VACANTES.map((v) => (
                    <option key={v.titulo}>{v.titulo}</option>
                  ))}
                  <option>Otro puesto</option>
                </select>
              </div>
              <div className="campo">
                <label htmlFor="experiencia">Anios de experiencia</label>
                <input
                  id="experiencia"
                  maxLength={60}
                  placeholder="Ej. 2 anios / ninguna"
                  value={form.experiencia}
                  onChange={cambiar('experiencia')}
                />
              </div>
            </div>

            <div className="fila-campos">
              <div className="campo">
                <label htmlFor="municipio">Municipio donde vivis</label>
                <input
                  id="municipio"
                  maxLength={100}
                  placeholder="Ej. Soyapango"
                  value={form.municipio}
                  onChange={cambiar('municipio')}
                />
              </div>
              <div className="campo">
                <label htmlFor="licencia">Licencia de conducir</label>
                <select id="licencia" value={form.licencia} onChange={cambiar('licencia')}>
                  <option>Pesada</option>
                  <option>Liviana</option>
                  <option>No tengo</option>
                </select>
              </div>
            </div>

            <div className="campo campo-ancho">
              <label htmlFor="mensaje">Contanos de vos</label>
              <textarea
                id="mensaje"
                maxLength={1000}
                placeholder="Donde trabajaste antes, que sabes hacer y en que horario podes trabajar."
                value={form.mensaje}
                onChange={cambiar('mensaje')}
              />
            </div>

            <label className="zona-archivo">
              <span className="icono-redondo" style={{ width: 34, height: 34, borderRadius: 999 }}>
                +
              </span>
              <span>
                <strong>Adjuntar hoja de vida (opcional)</strong>
                <small>PDF o imagen, hasta 5 MB</small>
              </span>
              <input type="file" accept=".pdf,image/*" hidden />
            </label>

            <div className="form-pie">
              <button className="btn btn-solido" type="submit" disabled={estado.cargando}>
                {estado.cargando ? 'Enviando...' : 'Enviar mi solicitud'}
              </button>
              <small>Tus datos solo se usan para el proceso de seleccion.</small>
            </div>

            {estado.ok && (
              <div className="aviso-exito">
                <p>{estado.ok}</p>
                <p className="aviso-sub">
                  Para agilizar tu proceso, mandanos los datos por WhatsApp. Ya van
                  escritos, solo toca enviar.
                </p>
                <a
                  className="btn btn-whatsapp"
                  href={estado.whatsapp}
                  target="_blank"
                  rel="noreferrer"
                >
                  Continuar por WhatsApp
                </a>
              </div>
            )}
            {estado.error && (
              <p style={{ color: '#f87171', fontSize: 14 }}>{estado.error}</p>
            )}
          </form>
        </div>
      </section>
    </>
  )
}
