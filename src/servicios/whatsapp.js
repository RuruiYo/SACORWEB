const NUMERO_SACOR = import.meta.env.VITE_WHATSAPP_SACOR ?? '50360366535'

// Arma un enlace wa.me con el mensaje ya escrito. Al abrirlo, el cliente ve el
// chat hacia SACOR con todo redactado y solo toca enviar. El mensaje sale desde
// SU numero, asi que queda una conversacion real donde se le puede responder.
function enlace(lineas) {
  const texto = lineas.filter(Boolean).join('\n')
  return `https://wa.me/${NUMERO_SACOR}?text=${encodeURIComponent(texto)}`
}

export function enlaceCotizacion(form, tipoServicio, esContrato) {
  const detalle = esContrato
    ? [
        form.duracion && `Duracion: ${form.duracion}`,
        form.frecuencia && `Frecuencia: ${form.frecuencia}`,
        form.viajes && `Cantidad de viajes: ${form.viajes}`,
        form.inicio && `Fecha de inicio: ${form.inicio}`,
      ]
    : [
        form.fecha && `Fecha estimada: ${form.fecha}`,
        form.volumen && `Volumen: ${form.volumen}`,
      ]

  return enlace([
    'Hola SACOR, acabo de enviar una solicitud desde el sitio web.',
    '',
    `Nombre: ${form.nombre}`,
    `DUI: ${form.dui}`,
    form.telefono && `Telefono: ${form.telefono}`,
    form.correo && `Correo: ${form.correo}`,
    '',
    `Servicio: ${tipoServicio}`,
    `Modalidad: ${esContrato ? 'Contrato recurrente' : 'Servicio puntual'}`,
    form.lugar && `Lugar de recoleccion: ${form.lugar}`,
    form.destino && `Destino: ${form.destino}`,
    ...detalle,
    form.descripcion && '',
    form.descripcion && `Detalle: ${form.descripcion}`,
  ])
}

export function enlaceEmpleo(form) {
  return enlace([
    'Hola SACOR, acabo de aplicar a una vacante desde el sitio web.',
    '',
    `Nombre: ${form.nombre}`,
    `DUI: ${form.dui}`,
    form.telefono && `Telefono: ${form.telefono}`,
    form.correo && `Correo: ${form.correo}`,
    '',
    `Puesto: ${form.puesto}`,
    form.experiencia && `Experiencia: ${form.experiencia}`,
    form.municipio && `Municipio: ${form.municipio}`,
    form.licencia && `Licencia: ${form.licencia}`,
    form.mensaje && '',
    form.mensaje && `Sobre mi: ${form.mensaje}`,
  ])
}
