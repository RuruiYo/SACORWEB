export const SERVICIOS_CARRUSEL = [
  {
    tag: '#MasSolicitado',
    titulo: 'TRANSPORTE DE RIPIO',
    subtitulo: '- ESCOMBRO Y DEMOLICION',
    corto: 'TRANSPORTE DE RIPIO',
    desc: 'Retiro de escombros y material de demolicion desde tu obra, remodelacion o vivienda',
  },
  {
    tag: '#Reciclaje',
    titulo: 'DESECHO ORGANICO',
    subtitulo: '- PODA Y JARDIN',
    corto: 'DESECHO ORGANICO',
    desc: 'Recoleccion de poda, restos de jardin y residuos organicos para compostaje o aprovechamiento',
  },
  {
    tag: '#Obra',
    titulo: 'MATERIALES DE CONSTRUCCION',
    subtitulo: '- ARENA, GRAVA Y SELECTO',
    corto: 'MATERIALES DE CONSTRUCCION',
    desc: 'Traslado de arena, grava, tierra, cemento y agregados hasta el sitio de trabajo',
  },
  {
    tag: '#Acopio',
    titulo: 'RECICLABLES',
    subtitulo: '- CARTON, PLASTICO Y METAL',
    corto: 'RECICLABLES',
    desc: 'Recoleccion de material reciclable desde tu local, bodega o centro comercial',
  },
]

export const SERVICIOS_DETALLE = [
  {
    num: '01',
    tag: 'MAS SOLICITADO',
    titulo: 'Transporte de ripio',
    desc: 'Retiramos escombros, material de demolicion y desperdicio de obra desde tu casa, remodelacion o proyecto. Cargamos, trasladamos y disponemos en sitio autorizado.',
    bullets: ['Volquetas de 6 a 12 m3', 'Retiro el mismo dia', 'Disposicion certificada'],
    precio: 'Precio segun volumen y distancia',
    filtros: ['personas', 'empresas'],
  },
  {
    num: '02',
    tag: 'RECICLAJE',
    titulo: 'Transporte de desecho organico',
    desc: 'Recoleccion de poda, restos de jardin y residuos organicos para compostaje o aprovechamiento. Ideal para condominios, municipalidades y centros comerciales.',
    bullets: ['Contenedores por volumen', 'Rutas fijas o por evento', 'Reporte de disposicion'],
    precio: 'Tarifa mensual o por viaje',
    filtros: ['empresas', 'reciclaje'],
  },
  {
    num: '03',
    tag: 'OBRA',
    titulo: 'Transporte de materiales de construccion',
    desc: 'Llevamos arena, grava, tierra, selecto, cemento y agregados hasta el sitio de trabajo, en la cantidad y el horario que tu proyecto necesite.',
    bullets: ['Carga y descarga incluida', 'Cobertura nacional', 'Por viaje o por dia'],
    precio: 'Cotizacion por viaje o por jornada',
    filtros: ['personas', 'empresas'],
  },
]

export const PASOS_SERVICIO = [
  {
    n: '1',
    titulo: 'Contanos que necesitas',
    desc: 'Llenas el formulario corto o nos escribis directo por WhatsApp.',
  },
  { n: '2', titulo: 'Te cotizamos', desc: 'Definimos unidad, cantidad de viajes y costo.' },
  { n: '3', titulo: 'Agendamos', desc: 'Elegis el dia y la hora que mejor te funcione.' },
  {
    n: '4',
    titulo: 'Ejecutamos y reportamos',
    desc: 'Hacemos el servicio y te confirmamos la disposicion del material.',
  },
]

export const PUBLICO = [
  {
    inicial: 'P',
    titulo: 'Personas naturales',
    desc: 'Sacamos el ripio de tu remodelacion, la poda del jardin o los escombros de tu casa. Cotizacion por WhatsApp y pago sin complicaciones.',
    items: [
      'Un solo viaje o los que necesites',
      'Cotizacion en menos de 24 horas',
      'Sin contrato ni tramites largos',
      'Pago en efectivo o transferencia',
    ],
    cta: 'Cotizar mi viaje',
    destacada: true,
  },
  {
    inicial: 'E',
    titulo: 'Empresas e instituciones',
    desc: 'Constructoras, centros comerciales, industria y municipalidades. Servicio recurrente con facturacion formal y trazabilidad del material.',
    items: [
      'Rutas y frecuencias programadas',
      'Credito fiscal y contratos',
      'Reportes de disposicion final',
      'Asesor asignado a tu cuenta',
    ],
    cta: 'Hablar con un asesor',
    destacada: false,
  },
]

export const BENEFICIOS = [
  {
    titulo: 'Pago puntual y formal',
    desc: 'Salario en planilla, sin atrasos y con boleta de pago cada quincena.',
  },
  {
    titulo: 'Prestaciones de ley',
    desc: 'ISSS, AFP, aguinaldo, vacaciones e indemnizacion segun la ley salvadorena.',
  },
  {
    titulo: 'Equipo propio y mantenido',
    desc: 'Trabajas con unidades de la empresa, con mantenimiento programado y GPS.',
  },
  {
    titulo: 'Capacitacion pagada',
    desc: 'Te formamos en manejo seguro, clasificacion de materiales y manejo de desechos.',
  },
  {
    titulo: 'Rutas definidas',
    desc: 'Sabes tu recorrido y tu horario. Nada de jornadas sorpresa sin aviso.',
  },
  {
    titulo: 'Crecimiento real',
    desc: 'Varios de nuestros coordinadores empezaron como ayudantes de recoleccion.',
  },
]

export const VACANTES = [
  {
    titulo: 'Motorista de volqueta',
    area: 'Transporte',
    tipo: 'Tiempo completo',
    lugar: 'San Salvador',
    req: 'Licencia pesada vigente, 2 anios de experiencia y disponibilidad de horario.',
  },
  {
    titulo: 'Ayudante de recoleccion',
    area: 'Operaciones',
    tipo: 'Tiempo completo',
    lugar: 'Area metropolitana',
    req: 'Acompanas la unidad en ruta, carga y descarga. Buena condicion fisica.',
  },
  {
    titulo: 'Coordinador de rutas',
    area: 'Operaciones',
    tipo: 'Tiempo completo',
    lugar: 'Oficina central',
    req: 'Programacion de viajes, seguimiento por GPS y comunicacion con clientes.',
  },
]

export const TIPOS_SERVICIO = [
  { titulo: 'Acarreo de materiales', desc: 'Construccion, agregados, tierra', conDestino: true },
  { titulo: 'Recoleccion de desechos', desc: 'Industrial y comercial' },
  { titulo: 'Reciclaje', desc: 'Acopio y aprovechamiento' },
  { titulo: 'Especifico', desc: 'Escribe el servicio que deseas y sus detalles', conDestino: true },
]

export const POR_QUE_SACOR = [
  {
    titulo: 'Flota propia y monitoreada',
    desc: 'Volquetas, camiones de carga y contenedores con GPS.',
  },
  {
    titulo: 'Manejo responsable de desechos',
    desc: 'Disposicion en sitios autorizados y trazabilidad del material.',
  },
  { titulo: 'Cobertura nacional', desc: 'Operamos en los 14 departamentos de El Salvador.' },
  {
    titulo: 'Facturacion formal',
    desc: 'Credito fiscal y contratos para empresas e instituciones.',
  },
]

export const DESPUES_DE_ENVIAR = [
  'Revisamos tu solicitud y confirmamos disponibilidad.',
  'Te enviamos la cotizacion con unidad, fecha y costo.',
  'Agendamos el servicio y damos seguimiento hasta la entrega.',
]

export const CLIENTES = ['PLAZA MUNDO', 'PLAZA FUTURA', 'GALERIAS', 'SUPER SELECTOS']
