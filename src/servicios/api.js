const BASE = import.meta.env.VITE_API_URL ?? 'https://localhost:7210'
const LLAVE = import.meta.env.VITE_API_KEY ?? ''

async function enviar(ruta, cuerpo) {
  let respuesta

  try {
    respuesta = await fetch(`${BASE}${ruta}`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        'X-Api-Key': LLAVE,
      },
      body: JSON.stringify(cuerpo),
    })
  } catch {
    throw new Error(
      'No se pudo conectar con el servidor. Revisa que la API este corriendo.',
    )
  }

  let datos = null
  try {
    datos = await respuesta.json()
  } catch {
    datos = null
  }

  if (!respuesta.ok) {
    const detalle =
      datos?.mensaje ??
      (datos?.errores ? Object.values(datos.errores).flat().join(' ') : null) ??
      `Error ${respuesta.status}`
    throw new Error(detalle)
  }

  return datos
}

export async function consultarMateriales() {
  const respuesta = await fetch(`${BASE}/api/publico/materiales`, {
    headers: { 'X-Api-Key': LLAVE },
  })
  if (!respuesta.ok) throw new Error(`Error ${respuesta.status}`)
  const datos = await respuesta.json()
  return Array.isArray(datos) ? datos : []
}

export const crearCotizacion = (datos) => enviar('/api/publico/cotizaciones', datos)
export const crearSolicitudEmpleo = (datos) => enviar('/api/publico/empleo', datos)
