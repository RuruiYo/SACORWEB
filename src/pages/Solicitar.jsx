import { useEffect, useState } from 'react'
import { Eyebrow } from '../components/Layout'
import { DESPUES_DE_ENVIAR, POR_QUE_SACOR, TIPOS_SERVICIO } from '../data/contenido'
import { consultarMateriales, crearCotizacion } from '../servicios/api'
import { enlaceCotizacion } from '../servicios/whatsapp'

const VACIO = {
  nombre: '',
  dui: '',
  correo: '',
  telefono: '',
  tipoServicio: 0,
  lugar: '',
  destino: '',
  fecha: '',
  volumen: '',
  duracion: '',
  frecuencia: '',
  inicio: '',
  descripcion: '',
  materiales: [],
}

const NOMBRES_SERVICIO = TIPOS_SERVICIO.map((t) => t.titulo.toLowerCase())

function estimarViajes(meses, frecuencia) {
  const n = Number(meses)
  if (!Number.isInteger(n) || n < 1) return null
  switch (frecuencia) {
    case 'Diaria':
      return Math.round((n * 365) / 12)
    case 'Semanal':
      return Math.round((n * 52) / 12)
    case 'Quincenal':
      return n * 2
    case 'Mensual':
      return n
    default:
      return null
  }
}

export default function Solicitar() {
  const [modalidad, setModalidad] = useState('puntual')
  const [form, setForm] = useState(VACIO)
  const [estado, setEstado] = useState({
    cargando: false,
    ok: null,
    error: null,
    whatsapp: null,
  })

  const [materiales, setMateriales] = useState([])
  const [errorMateriales, setErrorMateriales] = useState(false)

  useEffect(() => {
    consultarMateriales()
      .then((lista) =>
        setMateriales(lista.filter((m) => !NOMBRES_SERVICIO.includes(String(m).toLowerCase()))),
      )
      .catch(() => setErrorMateriales(true))
  }, [])

  const cambiar = (campo) => (e) => setForm({ ...form, [campo]: e.target.value })

  const alternarMaterial = (material) =>
    setForm({
      ...form,
      materiales: form.materiales.includes(material)
        ? form.materiales.filter((m) => m !== material)
        : [...form.materiales, material],
    })

  const esContrato = modalidad === 'contrato'
  const viajesEstimados = esContrato ? estimarViajes(form.duracion, form.frecuencia) : null

  const enviar = async (e) => {
    e.preventDefault()
    setEstado({ cargando: true, ok: null, error: null, whatsapp: null })

    // La tabla cotizacion guarda tipo_servicio y descripcion, asi que los detalles
    // del trabajo se arman en un solo texto antes de mandarlo.
    const listaMateriales = form.materiales.length > 0 && `Materiales: ${form.materiales.join(', ')}`
    const detalles = esContrato
      ? [
          `Modalidad: contrato recurrente`,
          form.lugar && `Recoleccion: ${form.lugar}`,
          form.destino && `Destino: ${form.destino}`,
          listaMateriales,
          form.duracion && `Duracion: ${form.duracion} ${Number(form.duracion) === 1 ? 'mes' : 'meses'}`,
          form.frecuencia && `Frecuencia: ${form.frecuencia}`,
          viajesEstimados && `Viajes: ${viajesEstimados}`,
          form.inicio && `Inicio: ${form.inicio}`,
          form.descripcion,
        ]
      : [
          `Modalidad: servicio puntual`,
          form.lugar && `Recoleccion: ${form.lugar}`,
          form.destino && `Destino: ${form.destino}`,
          listaMateriales,
          form.fecha && `Fecha estimada: ${form.fecha}`,
          form.volumen && `Volumen: ${form.volumen}`,
          form.descripcion,
        ]

    // El enlace se arma antes de limpiar el formulario, porque usa sus datos.
    const linkWhatsapp = enlaceCotizacion(
      { ...form, viajesEstimados },
      TIPOS_SERVICIO[form.tipoServicio].titulo,
      esContrato,
    )

    try {
      const r = await crearCotizacion({
        nombre: form.nombre,
        dui: form.dui,
        telefono: form.telefono,
        email: form.correo || null,
        tipoServicio: TIPOS_SERVICIO[form.tipoServicio].titulo,
        descripcion: detalles.filter(Boolean).join(' | ').slice(0, 1000),
      })

      setEstado({
        cargando: false,
        ok: `${r.mensaje} Numero de cotizacion: ${r.idCotizacion}.`,
        error: null,
        whatsapp: linkWhatsapp,
      })
      setForm(VACIO)
    } catch (err) {
      setEstado({ cargando: false, ok: null, error: err.message, whatsapp: null })
    }
  }

  return (
    <>
      <section className="page-head" style={{ paddingBottom: 0 }}>
        <div className="page-glow" style={{ left: -260, right: 'auto' }} />
        <div className="contenedor">
          <Eyebrow>Respuesta en menos de 24 horas habiles</Eyebrow>
          <h1 style={{ fontSize: 52 }}>Solicita tu servicio</h1>
          <p>
            {esContrato
              ? 'Contanos el volumen y la frecuencia que manejas y te armamos una propuesta de contrato con tarifa fija.'
              : 'Contanos que necesitas mover y te enviamos una cotizacion con la unidad, el horario y el costo del servicio.'}
          </p>
        </div>
      </section>

      <section className="seccion" style={{ paddingTop: 0 }}>
        <div className="contenedor">
          <div className="columnas-form">
            <form className="tarjeta-form" onSubmit={enviar}>
              <div className="grupo">
                <div className="grupo-titulo">
                  <span className="grupo-num">1</span> Datos de contacto
                </div>
                <div className="fila-campos">
                  <div className="campo campo-ancho">
                    <label htmlFor="nombre">Nombre completo / Empresa o institucion</label>
                    <input
                      id="nombre"
                      required
                      maxLength={150}
                      placeholder="Ej. Steven Ayala"
                      value={form.nombre}
                      onChange={cambiar('nombre')}
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
                    <label htmlFor="correo">Correo electronico</label>
                    <input
                      id="correo"
                      type="email"
                      maxLength={254}
                      placeholder="nombre@empresa.com"
                      value={form.correo}
                      onChange={cambiar('correo')}
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
              </div>

              <div className="grupo">
                <div className="grupo-titulo">
                  <span className="grupo-num">2</span> Tipo de servicio
                </div>
                <div className="opciones">
                  {TIPOS_SERVICIO.map((t, i) => (
                    <button
                      type="button"
                      key={t.titulo}
                      className={`opcion ${form.tipoServicio === i ? 'activa' : ''}`}
                      onClick={() => setForm({ ...form, tipoServicio: i })}
                    >
                      <strong>{t.titulo}</strong>
                      <span>{t.desc}</span>
                    </button>
                  ))}
                </div>
              </div>

              <div className="grupo">
                <div className="grupo-head">
                  <div className="grupo-titulo">
                    <span className="grupo-num">3</span>
                    {esContrato ? 'Detalles del contrato' : 'Detalles del trabajo'}
                  </div>
                  <div className="toggle">
                    <button
                      type="button"
                      className={!esContrato ? 'activo' : ''}
                      onClick={() => setModalidad('puntual')}
                    >
                      Servicio puntual
                    </button>
                    <button
                      type="button"
                      className={esContrato ? 'activo' : ''}
                      onClick={() => setModalidad('contrato')}
                    >
                      Contrato recurrente
                    </button>
                  </div>
                </div>

                <div className="fila-campos">
                  <div className="campo">
                    <label htmlFor="lugar">Lugar de recoleccion</label>
                    <input
                      id="lugar"
                      maxLength={250}
                      placeholder="Direccion o municipio"
                      value={form.lugar}
                      onChange={cambiar('lugar')}
                    />
                  </div>
                  <div className="campo">
                    <label htmlFor="destino">Destino</label>
                    <input
                      id="destino"
                      maxLength={250}
                      placeholder="Direccion o municipio"
                      value={form.destino}
                      onChange={cambiar('destino')}
                    />
                  </div>
                </div>

                <div className="campo campo-ancho">
                  <label>Tipos de material</label>
                  {materiales.length === 0 ? (
                    <small className="nota-campo">
                      {errorMateriales
                        ? 'No se pudo cargar la lista de materiales. Escribilos en la descripcion.'
                        : 'Cargando materiales...'}
                    </small>
                  ) : (
                    <div className="chips-material">
                      {materiales.map((material) => (
                        <button
                          type="button"
                          key={material}
                          className={`chip-material ${form.materiales.includes(material) ? 'activa' : ''}`}
                          onClick={() => alternarMaterial(material)}
                        >
                          {form.materiales.includes(material) ? '✓ ' : ''}
                          {material}
                        </button>
                      ))}
                    </div>
                  )}
                </div>

                {esContrato ? (
                  <>
                    <div className="fila-campos">
                      <div className="campo">
                        <label htmlFor="duracion">Duracion del contrato (meses)</label>
                        <input
                          id="duracion"
                          type="number"
                          inputMode="numeric"
                          min={1}
                          max={60}
                          step={1}
                          placeholder="Ej. 6"
                          value={form.duracion}
                          onChange={cambiar('duracion')}
                        />
                      </div>
                      <div className="campo">
                        <label htmlFor="frecuencia">Frecuencia de viajes</label>
                        <select id="frecuencia" value={form.frecuencia} onChange={cambiar('frecuencia')}>
                          <option value="">Seleccionar</option>
                          <option>Diaria</option>
                          <option>Semanal</option>
                          <option>Quincenal</option>
                          <option>Mensual</option>
                          <option>A demanda</option>
                        </select>
                      </div>
                    </div>
                    <div className="fila-campos">
                      <div className="campo">
                        <label>Viajes estimados</label>
                        <div className="dato-calculado">
                          {viajesEstimados
                            ? `${viajesEstimados} viaje${viajesEstimados === 1 ? '' : 's'}`
                            : form.frecuencia === 'A demanda'
                              ? 'Segun lo que vayas necesitando'
                              : 'Escribe la duracion y elige la frecuencia'}
                        </div>
                      </div>
                      <div className="campo">
                        <label htmlFor="inicio">Fecha de inicio</label>
                        <input
                          id="inicio"
                          type="date"
                          value={form.inicio}
                          onChange={cambiar('inicio')}
                        />
                      </div>
                    </div>
                  </>
                ) : (
                  <div className="fila-campos">
                    <div className="campo">
                      <label htmlFor="fecha">Fecha estimada</label>
                      <input
                        id="fecha"
                        type="date"
                        value={form.fecha}
                        onChange={cambiar('fecha')}
                      />
                    </div>
                    <div className="campo">
                      <label htmlFor="volumen">Volumen aproximado</label>
                      <input
                        id="volumen"
                        maxLength={60}
                        placeholder="Ej. 20 toneladas / 4 viajes"
                        value={form.volumen}
                        onChange={cambiar('volumen')}
                      />
                    </div>
                  </div>
                )}

                <div className="campo campo-ancho">
                  <label htmlFor="descripcion">
                    {esContrato ? 'Alcance del contrato' : 'Descripcion del servicio'}
                  </label>
                  <textarea
                    id="descripcion"
                    maxLength={1000}
                    placeholder={
                      esContrato
                        ? 'Contanos el tipo de material, los puntos de recoleccion, horarios permitidos y si necesitas reportes mensuales de disposicion.'
                        : 'Contanos el tipo de material, si requiere carga o descarga, horarios de acceso al sitio, etc.'
                    }
                    value={form.descripcion}
                    onChange={cambiar('descripcion')}
                  />
                </div>
              </div>

              <div className="form-pie">
                <button className="btn btn-solido" type="submit" disabled={estado.cargando}>
                  {estado.cargando
                    ? 'Enviando...'
                    : esContrato
                      ? 'Solicitar propuesta'
                      : 'Enviar solicitud'}
                </button>
                <small>
                  Al enviar aceptas que un asesor de SACOR te contacte por correo o
                  WhatsApp.
                </small>
              </div>

              {estado.ok && (
                <div className="aviso-exito">
                  <p>{estado.ok}</p>
                  <p className="aviso-sub">
                    Para que te respondamos mas rapido, mandanos los datos por
                    WhatsApp. Ya van escritos, solo toca enviar.
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

            <aside className="panel-lateral">
              <div className="panel">
                <h3>Contacto directo</h3>
                <div className="panel-dato">
                  <span>WhatsApp / Llamadas</span>
                  <strong>+503 0000 0000</strong>
                </div>
                <div className="panel-dato">
                  <span>Correo</span>
                  <strong>servicios@sacor.com.sv</strong>
                </div>
                <div className="panel-dato">
                  <span>Oficina</span>
                  <strong>San Salvador, El Salvador</strong>
                </div>
                <div className="panel-dato">
                  <span>Horario de atencion</span>
                  <strong>Lun a Vie 7:00 - 17:00 | Sab 7:00 - 12:00</strong>
                </div>
              </div>

              <div className="panel">
                <h3>Por que SACOR</h3>
                <ul className="panel-bullets">
                  {POR_QUE_SACOR.map((p) => (
                    <li key={p.titulo}>
                      <em>+</em>
                      <span>
                        <strong>{p.titulo}</strong>
                        <small>{p.desc}</small>
                      </span>
                    </li>
                  ))}
                </ul>
              </div>

              <div className="panel panel-verde">
                <h3>Que pasa despues de enviar</h3>
                <ul className="panel-pasos">
                  {DESPUES_DE_ENVIAR.map((p, i) => (
                    <li key={p}>
                      <b>{i + 1}</b>
                      <span>{p}</span>
                    </li>
                  ))}
                </ul>
              </div>
            </aside>
          </div>
        </div>
      </section>
    </>
  )
}
