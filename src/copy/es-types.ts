import type { TypePageCopy } from './types';

const wifi: TypePageCopy = {
  title: 'Generador de QR para WiFi gratis, sin registro',
  description:
    'Crea un código QR que conecta los teléfonos a tu WiFi. Gratis, sin caducidad, sin cuenta. Compatible con WPA/WPA2/WPA3, WEP y redes ocultas.',
  h1: 'Generador de código QR para WiFi',
  lead: 'Que la gente entre a tu red apuntando la cámara a una tarjeta, en vez de deletrear una contraseña.',
  sections: [
    {
      heading: 'Cómo funciona un QR de WiFi',
      body: [
        'El código no abre una web ni habla con ningún servidor. Contiene una sola línea de texto, en un formato que iOS y Android reconocen, con el nombre de la red, el tipo de seguridad y la contraseña. La cámara descodifica esa línea en el teléfono y ofrece conectarse. Todo el intercambio ocurre entre una cámara y un poco de tinta.',
        'Eso también significa que la contraseña va en el código tal cual. Quien pueda fotografiar la tarjeta puede leerla: es la idea en la barra de una cafetería, y una razón para no publicar la imagen.',
      ],
    },
    {
      heading: 'Acertar con los datos',
      body: [
        'El nombre de la red tiene que coincidir exactamente con el que emite el router, mayúsculas y espacios incluidos: <code>Cafe Invitados</code> y <code>cafe invitados</code> son redes distintas. Los caracteres especiales se gestionan solos: punto y coma, dos puntos, comas, comillas y barras invertidas se escapan automáticamente, así que <code>Bar; Restaurante "Luna"</code> se codifica bien en vez de cortarse en el punto y coma.',
        'Elige <strong>WPA</strong> para cualquier cosa moderna; el mismo ajuste cubre WPA, WPA2 y WPA3. <strong>WEP</strong> es solo para routers viejos. Elige <strong>Abierta</strong> para una red sin contraseña. Marca <em>red oculta</em> solo si el router de verdad no anuncia su nombre: marcarlo por error puede impedir que el teléfono encuentre la red.',
      ],
    },
    {
      heading: 'Dónde no funciona',
      body: [
        'Las redes empresariales —una universidad o una oficina grande donde cada persona tiene usuario o certificado— no caben en este formato: no tiene campo para una identidad. Las redes con portal cautivo se conectan y aun así muestran la página de acceso: el código entra a la red, no acepta condiciones por ti. El escaneo nativo necesita iOS 11 o Android 10; los teléfonos más viejos necesitan una app.',
      ],
    },
  ],
  payload: {
    caption: 'Un código de WiFi contiene exactamente esto, y nada más:',
    code: 'WIFI:T:WPA;S:Cafe Invitados;P:flatwhite;H:false;;',
    legend: [
      '<code>T</code>: tipo de seguridad, <code>WPA</code>, <code>WEP</code> o <code>nopass</code>',
      '<code>S</code>: el nombre de la red, exactamente como se emite',
      '<code>P</code>: la contraseña, vacía en una red abierta',
      '<code>H</code>: si la red está oculta',
    ],
  },
  tipsHeading: 'Antes de imprimirlo',
  tips: [
    'Pruébalo con un iPhone y un Android antes de imprimir una tanda.',
    'Imprímelo de al menos 2,5&nbsp;cm en una tarjeta de mesa.',
    'Imprime el nombre de la red debajo como texto. Algunos invitados lo escribirán a mano.',
  ],
  faqs: [
    {
      q: '¿Funciona en iPhone?',
      a: 'Sí, desde iOS 11. Apunta la app Cámara al código y aparece un aviso para unirse a la red, sin instalar nada.',
    },
    {
      q: '¿Funciona con WPA3?',
      a: 'Sí. Elige la opción WPA; el mismo valor cubre WPA, WPA2 y WPA3 en todos los teléfonos compatibles con este formato.',
    },
    {
      q: '¿Mi contraseña de WiFi se envía a su servidor?',
      a: 'No, y no hay servidor al que enviarla. El código se genera en tu pestaña. Puedes desconectarte de internet y el generador sigue funcionando.',
    },
    {
      q: '¿Alguien puede sacar la contraseña del código impreso?',
      a: 'Sí: un código QR no es cifrado. Cualquiera que lo escanee o fotografíe obtiene la contraseña, igual que si la hubieras escrito en la tarjeta. Trata el código impreso como tratarías la contraseña escrita.',
    },
    {
      q: '¿Dejará de funcionar si cambio la contraseña?',
      a: 'El código seguirá diciendo lo que siempre dijo, así que ofrecerá la contraseña vieja y fallará. Cambia la contraseña, genera un código nuevo y reimprime. Nada caduca solo.',
    },
    {
      q: '¿Sirve para la red de una universidad u oficina?',
      a: 'No si pide usuario o instala un certificado. Las redes WPA-Enterprise no se pueden describir en este formato.',
    },
  ],
};

const whatsapp: TypePageCopy = {
  title: 'Generador de QR para WhatsApp gratis, sin registro',
  description:
    'Crea un código QR que abre un chat de WhatsApp contigo, con el primer mensaje ya escrito. Gratis, sin cuenta, sin caducidad.',
  h1: 'Generador de código QR para WhatsApp',
  lead: 'Un código que abre un chat contigo, con el primer mensaje ya escrito si quieres.',
  sections: [
    {
      heading: 'Qué contiene el código',
      body: [
        'Lleva un enlace normal de <code>wa.me</code> con tu número dentro. Al escanearlo se abre WhatsApp en un chat contigo, sin que ninguno de los dos tenga que guardar antes el número del otro. Si añadiste un mensaje, aparece ya escrito y quien envía todavía tiene que pulsar enviar; por eso sirve para avisos tipo "Pregunta por el menú" en un cartel.',
        'Una dependencia que conviene decir: <code>wa.me</code> es un enlace que gestiona WhatsApp, así que, a diferencia de un código de WiFi o de contacto, este depende de que una empresa mantenga vivo un dominio. Nadie puede apagar tu código concreto, pero no es tan autónomo como los demás.',
      ],
    },
    {
      heading: 'El número tiene que ser internacional',
      body: [
        'Usa el código de país completo, sin el signo más y sin ceros iniciales. La puntuación se quita sola, así que puedes pegar <code>+52 55 1234 5678</code> y se codifica como <code>525512345678</code>. Un número en formato nacional sin código de país abre un chat roto para quien escanea desde el extranjero, y muchas veces también desde casa. El número también necesita una cuenta activa de WhatsApp, cosa que ningún código puede comprobar por ti.',
      ],
    },
    {
      heading: 'Usos sensatos, y un aviso',
      body: [
        'Funciona bien en un escaparate para consultas fuera de horario, en una tarjeta de mesa para pedir, en el empaque de un envío para soporte, o en un puesto de mercado donde teclear un número es una molestia. Un mensaje prellenado concreto también te ahorra la vuelta de "¿qué producto?".',
        'El aviso: imprimir un QR con tu número es publicar tu número. Los spammers también escanean carteles. Para una línea de negocio es lo esperado; para un celular personal, piénsalo dos veces.',
      ],
    },
  ],
  payload: {
    caption: 'Un código de WhatsApp es un enlace normal, con el mensaje codificado en URL:',
    code: 'https://wa.me/525512345678?text=Hola%21%20Quiero%20hacer%20un%20pedido.',
    legend: [
      'el número va solo con dígitos: código de país primero, sin <code>+</code>',
      '<code>?text=</code> es opcional; sin mensaje, el chat se abre vacío',
      'los espacios y acentos van en porcentaje para que todos los escáneres los lean igual',
    ],
  },
  tipsHeading: 'Antes de imprimirlo',
  tips: [
    'Escanéalo con un teléfono que no tenga tu número guardado: así son tus clientes.',
    'Mantén corto el mensaje prellenado. Los largos hacen un código más denso y de todas formas los editan.',
    'Di qué hace el código a su lado. "Escríbenos por WhatsApp" se escanea más que un cuadro sin más.',
  ],
  faqs: [
    {
      q: '¿Quien escanea necesita tener mi número guardado?',
      a: 'No. Esa es la razón principal para usar uno de estos: el chat se abre directamente, sin agregar contacto antes.',
    },
    {
      q: '¿Es lo mismo que el código QR de la propia app de WhatsApp?',
      a: 'No. El de dentro de la app sirve para vincular dispositivos o agregar un contacto y se puede restablecer. Este es un enlace wa.me normal con tu número, así que funciona desde un cartel impreso y no caduca.',
    },
    {
      q: '¿Puedo ver quién lo escaneó?',
      a: 'No. Verás a quien te escriba, que es lo mismo menos la gente que escaneó y cambió de idea.',
    },
    {
      q: '¿El mensaje prellenado se envía solo?',
      a: 'No, y no debería. Aterriza en el cuadro de texto y la persona pulsa enviar, así que puede editarlo o borrarlo antes.',
    },
    {
      q: '¿Funciona con WhatsApp Business?',
      a: 'Sí. Cualquier número con una cuenta activa de WhatsApp funciona igual, personal o de empresa.',
    },
  ],
};

const vcard: TypePageCopy = {
  title: 'Generador de QR vCard gratis: códigos de contacto',
  description:
    'Convierte tus datos de contacto en un código QR que se guarda directo en la agenda del teléfono. vCard 3.0, gratis, sin cuenta, sin caducidad.',
  h1: 'Generador de código QR vCard',
  lead: 'Pon tus datos en una tarjeta, un gafete o un escaparate y que los teléfonos los guarden con un toque.',
  sections: [
    {
      heading: 'Qué hace un código vCard',
      body: [
        'Una vCard es el formato de texto estándar detrás de los archivos de contacto que teléfonos y clientes de correo intercambian desde hace décadas. Métela en un código QR y al escanearlo se abre la pantalla de "nuevo contacto" del teléfono con los campos ya rellenos —nombre, teléfono, email, empresa, dirección— lista para guardar. Sin app, sin cuenta, sin subir nada.',
        'Este sitio escribe vCard 3.0 en vez de la 4.0. Es la versión que todos los teléfonos, agendas y CRM importan sin quejarse, y en una tarjeta de visita la compatibilidad gana a la novedad.',
      ],
    },
    {
      heading: 'Hazlo corto, o costará escanearlo',
      body: [
        'Los códigos de contacto son los más densos de aquí, porque llevan más texto. Cada campo añade cuadros al mismo cuadrado, y una tarjeta muy detallada con un nivel alto de corrección puede volverse difícil de leer para cámaras viejas a tamaño de tarjeta de visita.',
        'Si tu código parece estática, quita los campos que no necesites, o lleva el detalle a una página web y pon el enlace en el campo <code>Sitio web</code>. El nivel M es un buen equilibrio para imprimir; el H compra una tolerancia a daños que rara vez necesitas en una tarjeta guardada en una cartera.',
      ],
    },
    {
      heading: 'Qué hace el teléfono con él',
      body: [
        'iPhone y Android reconocen una vCard desde la cámara y ofrecen crear el contacto; algunos muestran los campos antes, otros guardan y dejan editar. Los campos vacíos no van en el código. La dirección se escribe en el campo estructurado —calle, ciudad, estado, código postal y país en sus casillas— que es lo que permite al teléfono ofrecer indicaciones después.',
      ],
    },
  ],
  payload: {
    caption: 'El código contiene un archivo de texto pequeño y legible:',
    code: [
      'BEGIN:VCARD',
      'VERSION:3.0',
      'N:Lovelace;Ada;;;',
      'FN:Ada Lovelace',
      'ORG:Máquinas Analíticas',
      'TEL;TYPE=CELL,VOICE:+525512345678',
      'EMAIL;TYPE=INTERNET:ada@ejemplo.com',
      'END:VCARD',
    ].join('\n'),
    legend: [
      '<code>N</code> es el nombre estructurado, <code>FN</code> el nombre para mostrar',
      '<code>TEL</code> y <code>EMAIL</code> llevan un tipo para que el teléfono los archive bien',
      'los campos vacíos se omiten del todo, para que el código sea lo más pequeño posible',
    ],
  },
  tipsHeading: 'Antes de imprimirlo',
  tips: [
    'Escanea tu propia tarjeta con un iPhone y un Android antes de encargar quinientas.',
    'En una tarjeta de visita, imprime el código de al menos 2&nbsp;cm y conserva el borde blanco.',
    'Menos campos es un código más ligero y fiable. Un sitio web vale más que una nota larga.',
  ],
  faqs: [
    {
      q: '¿Quien escanea necesita una app?',
      a: 'No. La cámara de cualquier iPhone o Android reciente lo lee y ofrece crear el contacto.',
    },
    {
      q: '¿Por qué vCard 3.0 y no 4.0?',
      a: 'Porque la 3.0 es la que todo importa limpiamente. La 4.0 es mejor en el papel y peor en la práctica.',
    },
    {
      q: 'Mi código se ve muy denso. ¿Es un problema?',
      a: 'Es una señal de alerta a tamaños pequeños. Quita campos opcionales o baja a nivel M o L y el dibujo se despeja bastante.',
    },
    {
      q: '¿Puedo actualizar mis datos después?',
      a: 'En un código impreso no: dice lo que dice. Pon un enlace a una página que controles en el campo Sitio web si esperas que los datos cambien.',
    },
    {
      q: '¿Funciona en un teléfono sin señal?',
      a: 'Sí. Todo lo necesario está dentro del código, así que guardar el contacto funciona con el teléfono en modo avión.',
    },
    {
      q: '¿Puedo añadir una foto mía?',
      a: 'El formato lo permite técnicamente, y en la práctica hace el código demasiado denso para escanearlo. Usa el campo de sitio web.',
    },
  ],
};

const text: TypePageCopy = {
  title: 'Generador de QR de texto gratis, sin registro',
  description:
    'Mete cualquier texto en un código QR: números de serie, instrucciones, notas. No abre nada, no sube nada. Gratis y sin caducidad.',
  h1: 'Generador de código QR de texto',
  lead: 'Para cuando el código simplemente tiene que decir algo, sin enlace y sin nada que abrir.',
  sections: [
    {
      heading: 'Cuándo el texto plano es la opción correcta',
      body: [
        'La mayoría de los códigos QR son instrucciones para un teléfono: abre esto, conéctate a aquello, llama a tal. Un código de texto lleva palabras, y al escanearlo simplemente las muestra. No se abre nada, no se consulta nada y no hace falta conexión en ningún momento.',
        'Por eso es el formato correcto para lo que pertenece a un objeto y no a internet: el número de serie y la fecha de servicio de una máquina, una etiqueta de estantería, un número de lote en una línea de producción, la etiqueta de un casillero, instrucciones de lavado en una prenda, o una nota para quien encuentre un equipo.',
      ],
    },
    {
      heading: 'Qué pasa al escanearlo',
      body: [
        'El teléfono muestra el texto y normalmente ofrece copiarlo o compartirlo. Si el texto contiene algo reconocible —un enlace, un correo— la mayoría de cámaras ofrecen actuar, pero eso es el teléfono siendo útil, no algo que lleve el código. Como un código de texto no tiene destino, no puede romperse, redirigir a ningún sitio ni ser rastreado por nadie.',
      ],
    },
    {
      heading: 'Longitud, unicode y saltos de línea',
      body: [
        'El techo son 2 953 bytes en nivel L y 1 273 en nivel H, y el contador bajo el campo te dice dónde estás. Los bytes no son caracteres: una letra con acento cuesta dos, la mayoría de caracteres CJK tres, un emoji cuatro. Los saltos de línea se conservan. Un texto largo hace un código denso, y los códigos densos hay que imprimirlos más grandes: si parece ruido gris, acórtalo o agrándalo.',
      ],
    },
  ],
  payload: {
    caption: 'Aquí no hay ningún formato. El código contiene exactamente lo que escribiste:',
    code: 'Compresor 4B — revisado 2026-03-14 — próxima revisión 2026-09-14',
    legend: [
      'sin esquema, sin prefijo, sin envoltorio de codificación',
      'acentos, símbolos y emoji se guardan en UTF-8 y vuelven intactos',
    ],
  },
  tipsHeading: 'Antes de imprimirlo',
  tips: [
    'Un texto más corto hace un código más ligero que se escanea más rápido y desde más lejos.',
    'Para equipos que reciben golpes, el nivel Q o H mantiene el código legible con parte de la etiqueta dañada.',
    'Imprime la parte crítica del texto también junto al código. Las etiquetas sobreviven a las cámaras.',
    'Si el texto en realidad es un enlace, usa el tipo Enlace para que el teléfono ofrezca abrirlo.',
  ],
  faqs: [
    {
      q: '¿Cuánto texto cabe en un código QR?',
      a: 'Hasta 2 953 bytes en nivel L, 2 331 en M, 1 663 en Q y 1 273 en H. El contador bajo el campo muestra exactamente cuánto llevas.',
    },
    {
      q: '¿Funcionan los emoji y los acentos?',
      a: 'Sí, codificados en UTF-8. Cuestan más bytes que las letras simples, que es la única diferencia práctica.',
    },
    {
      q: '¿Escanearlo abre algo?',
      a: 'No. El teléfono muestra el texto. Si el texto contiene un enlace, puede ofrecer abrirlo: eso es la app de cámara siendo lista, no el código haciendo algo.',
    },
    {
      q: '¿Funciona sin conexión?',
      a: 'Del todo. No se descarga nada, así que funciona en un sótano, en un avión o en un almacén sin señal.',
    },
    {
      q: '¿Puedo meter un documento entero en uno?',
      a: 'No, y es la herramienta equivocada para eso. Pasados unos cientos de caracteres el código se vuelve denso y lento de escanear; sube el documento y usa un enlace, o imprime el texto.',
    },
  ],
};

const email: TypePageCopy = {
  title: 'Generador de QR para email (mailto) gratis',
  description:
    'Crea un código QR que abre un correo nuevo dirigido a ti, con el asunto y el mensaje ya escritos. Gratis, sin cuenta, sin caducidad.',
  h1: 'Generador de código QR para email',
  lead: 'Abre un correo nuevo dirigido a ti, con el asunto ya puesto si quieres.',
  sections: [
    {
      heading: 'Qué hace el código',
      body: [
        'Lleva un enlace <code>mailto:</code>, lo mismo que hay detrás de un enlace de correo en una web. Al escanearlo se abre la app de correo del teléfono con un borrador nuevo dirigido a ti, con el asunto y el cuerpo que hayas puesto. La persona lo escribe y lo envía, así que nada pasa sin ella.',
        'El asunto prellenado es la parte discretamente útil. "Garantía — modelo X" o "Reserva — cartel de la estación" convierte una bandeja de asuntos vacíos idénticos en algo que puedes filtrar, y te dice dónde se escaneó el código sin ningún rastreo.',
      ],
    },
    {
      heading: 'Cómo se codifican las partes',
      body: [
        'La dirección va justo después de <code>mailto:</code>. El asunto y el cuerpo pasan a ser parámetros codificados en porcentaje para que espacios, acentos, ampersand y saltos de línea lleguen intactos; por eso la vista del contenido parece una sopa de <code>%20</code>. Un campo en blanco se omite del enlace en vez de enviarse vacío.',
        'Los saltos de línea del cuerpo se conservan, así que una plantilla corta de un par de líneas llega con formato. Los cuerpos largos hacen un código denso y algunas apps los recortan, así que trata el cuerpo como una guía, no como una carta.',
      ],
    },
    {
      heading: 'Dónde se vuelve inconsistente',
      body: [
        'La dirección se respeta en todas partes. El asunto casi en todas. El cuerpo es donde las apps difieren: la mayoría lo rellena, unas pocas lo ignoran, y algunos navegadores integrados abren un compositor web que lo pierde. Pruébalo con la app de correo de tu público antes de imprimir.',
        'También conviene decirlo: un QR de email impreso publica tu dirección a cualquiera con cámara, incluidos los que las recolectan. Para una dirección de soporte o ventas es la idea; para una personal, usa un alias que puedas retirar.',
      ],
    },
  ],
  payload: {
    caption: 'El código contiene un enlace mailto estándar:',
    code: 'mailto:hola@ejemplo.com?subject=Pregunta%20sobre%20el%20men%C3%BA&body=Hola%2C',
    legend: [
      'la dirección va primero, justo después de <code>mailto:</code>',
      '<code>subject</code> y <code>body</code> son opcionales y van codificados en porcentaje',
    ],
  },
  tipsHeading: 'Antes de imprimirlo',
  tips: [
    'Usa un asunto que identifique dónde se imprimió el código. Es información de enrutado gratis.',
    'Pruébalo en la app de correo por defecto de un iPhone y un Android antes de la tirada.',
    'Prefiere una dirección de rol (soporte@, hola@) a una personal en cualquier cosa pública.',
  ],
  faqs: [
    {
      q: '¿El correo se envía automáticamente?',
      a: 'No. Abre un borrador. La persona lo lee, lo edita y pulsa enviar, que es lo único que cualquier teléfono permite.',
    },
    {
      q: '¿Por qué el contenido está lleno de signos de porcentaje?',
      a: 'Es la codificación en porcentaje, la forma estándar de meter espacios y puntuación en una URL. Las apps de correo lo descodifican a texto normal.',
    },
    {
      q: 'Aparece el asunto pero no el cuerpo. ¿Por qué?',
      a: 'Algunas apps de correo y navegadores integrados ignoran el parámetro del cuerpo. Deja la instrucción importante en el asunto si te importa.',
    },
    {
      q: '¿Esto expone mi dirección al spam?',
      a: 'Cualquier cosa impresa en público puede escanearla cualquiera, incluidos bots. Usa una dirección que puedas filtrar o reemplazar.',
    },
    {
      q: '¿Puedo poner varias direcciones en un código?',
      a: 'No de forma fiable. La compatibilidad con copia y con varios destinatarios varía demasiado entre apps para recomendarla en material impreso.',
    },
  ],
};

const sms: TypePageCopy = {
  title: 'Generador de QR para SMS gratis, sin registro',
  description:
    'Crea un código QR que abre un mensaje de texto a tu número, con el mensaje ya escrito. Gratis, sin cuenta, sin caducidad.',
  h1: 'Generador de código QR para SMS',
  lead: 'Abre un mensaje de texto a tu número, con el mensaje ya escrito.',
  sections: [
    {
      heading: 'Para qué sirve',
      body: [
        'Al escanearlo se abre la app de mensajes del teléfono con un mensaje nuevo a tu número y tu texto ya en el cuadro. Es la forma con menos fricción de conseguir una respuesta de alguien que está delante de un cartel: sin app que instalar, sin cuenta, sin más conexión que la señal del móvil.',
        'El uso clásico es el alta por palabra clave: un cartel que dice "manda ALTA para enterarte de los conciertos" se convierte en un código donde ALTA ya está escrito. También sirve para reportar: un código en un contenedor, una parada de autobús o una máquina averiada, con el número de activo prellenado, para saber cuál es sin preguntar.',
      ],
    },
    {
      heading: 'El formato, y por qué varía',
      body: [
        'Este sitio escribe <code>SMSTO:número:mensaje</code>, que es el formato con mayor compatibilidad entre escáneres. También verás enlaces <code>sms:</code>, y algunos lectores prefieren esa forma, pero SMSTO es lo que más apps de cámara manejan bien cuando hay un cuerpo de mensaje.',
        'Incluye el código de país para cualquier cosa que pueda escanear un visitante. La herramienta quita espacios, guiones y paréntesis pero conserva el más inicial, así que puedes pegar un número en cualquier formato legible. Los números cortos también funcionan: escribe el número corto como número.',
      ],
    },
    {
      heading: 'De qué avisar a la gente',
      body: [
        'El mensaje no es gratis para quien lo envía. Sale a su tarifa normal, y los números premium o cortos pueden costar bastante más, así que indica lo que cuesta el mensaje allí donde el número no sea obviamente un móvil normal.',
        'Nada se envía solo: la persona pulsa enviar y puede editar el texto antes. Eso significa que la palabra clave que prellenaste se puede cambiar, así que no la uses como contraseña ni para identificar quién escaneó.',
      ],
    },
  ],
  payload: {
    caption: 'El código contiene una sola línea corta:',
    code: 'SMSTO:+525512345678:ALTA',
    legend: [
      'el número conserva el <code>+</code> inicial; espacios y guiones se quitan',
      'todo lo que va después del segundo dos puntos es el mensaje prellenado',
      'sin mensaje, el código abre una conversación vacía',
    ],
  },
  tipsHeading: 'Antes de imprimirlo',
  tips: [
    'Mantén la palabra clave corta y sin ambigüedad: es lo que la gente escribirá a mano si el escaneo falla.',
    'Incluye el código de país si lo van a escanear extranjeros o turistas.',
    'Indica el costo junto al código cuando el número no sea un móvil normal.',
  ],
  faqs: [
    {
      q: '¿Envía el mensaje solo?',
      a: 'No. Abre la app de mensajes con el texto listo, y la persona pulsa enviar.',
    },
    {
      q: '¿Por qué SMSTO y no sms:?',
      a: 'SMSTO lo manejan bien más escáneres cuando se incluye un cuerpo de mensaje. Los dos existen; este falla menos.',
    },
    {
      q: '¿Puedo usar un número corto?',
      a: 'Sí. Escribe el número corto donde va el número y no pongas código de país.',
    },
    {
      q: '¿Paga quien envía?',
      a: 'Sí, a su tarifa normal, o más en números premium. Dilo en el cartel.',
    },
    {
      q: '¿Puedo ver quién escaneó sin enviar?',
      a: 'No. Solo ves los mensajes que realmente se envían, lo cual es tanto una ventaja como una limitación.',
    },
  ],
};

const phone: TypePageCopy = {
  title: 'Generador de QR para número de teléfono gratis',
  description:
    'Crea un código QR que marca tu número. Gratis, sin cuenta, sin caducidad. Funciona desde cualquier cámara, sin instalar apps.',
  h1: 'Generador de código QR para teléfono',
  lead: 'Apunta la cámara y el teléfono ofrece llamarte. Sin teclear, sin dígitos mal marcados.',
  sections: [
    {
      heading: 'Qué pasa al escanearlo',
      body: [
        'El código lleva un enlace <code>tel:</code>. La cámara muestra el número y pregunta si quieres llamar: ningún teléfono marca directamente desde un escaneo, que es justo el comportamiento de seguridad que quieres en algo impreso en público.',
        'Elimina el fallo más común de los datos de contacto impresos: la transcripción. Nadie se equivoca en un dígito, nadie se olvida del código de país y nadie tiene que sujetar un folleto con una mano mientras marca con la otra.',
      ],
    },
    {
      heading: 'Escribe el número para desconocidos',
      body: [
        'Incluye el código de país, en formato internacional, para cualquier cosa que pueda escanear alguien de otro sitio: un hotel, una estación, una zona turística, un empaque que viaja. <code>+525512345678</code> funciona desde cualquier país; <code>5512345678</code> solo desde dentro de México.',
        'El formato lo eliges tú: espacios, guiones y paréntesis se quitan automáticamente, y el más inicial se conserva. Lo único a evitar son las extensiones: la compatibilidad con pausas y <code>;ext=</code> es tan irregular que un número principal más una instrucción impresa es más fiable.',
      ],
    },
    {
      heading: 'Dónde un código de llamada gana a las alternativas',
      body: [
        'Úsalo en rótulos de oficios, avisos de entrega, calcomanías de taxis y talleres, placas de máquinas, carteles inmobiliarios y en cualquier sitio donde alguien esté de pie al aire libre con una mano libre. También funciona sin datos en el sentido que importa: solo hace falta señal.',
        'Si prefieres recibir un mensaje a una llamada, un código de SMS o de WhatsApp suele ser mejor para la misma superficie: dejan que la gente te escriba fuera del horario en vez de colgar.',
      ],
    },
  ],
  payload: {
    caption: 'El contenido más simple del sitio:',
    code: 'tel:+525512345678',
    legend: [
      'el <code>+</code> se conserva; espacios, guiones y paréntesis se quitan',
      'los teléfonos siempre preguntan antes de marcar, así que un escaneo nunca puede llamar por sí solo',
    ],
  },
  tipsHeading: 'Antes de imprimirlo',
  tips: [
    'Usa el formato internacional con código de país en todo lo que pueda escanear un visitante.',
    'Imprime el número como texto junto al código. Es corto, y la gente confía en dígitos que puede ver.',
    'Etiqueta el código "Llámanos": un cuadro sin más no da motivo para levantar la cámara.',
    'En rótulos de exterior, imprímelo grande y conserva el margen; la distancia de escaneo crece con el tamaño.',
  ],
  faqs: [
    {
      q: '¿Marca sin preguntar?',
      a: 'No. Todos los teléfonos muestran el número y esperan un toque. Es deliberado y ningún código puede saltárselo.',
    },
    {
      q: '¿Necesito el código de país?',
      a: 'Inclúyelo siempre que alguien de otro país pueda escanearlo. Cuesta tres caracteres y evita una llamada que nunca conecta.',
    },
    {
      q: '¿Puedo incluir una extensión?',
      a: 'La compatibilidad con extensiones es poco fiable entre teléfonos. Codifica el número principal e imprime la extensión al lado.',
    },
    {
      q: '¿Funciona sin internet?',
      a: 'Sí. La descodificación es local y llamar solo necesita señal, no datos.',
    },
    {
      q: '¿Y si cambia mi número?',
      a: 'Un código impreso es permanente, así que seguirá ofreciendo el número viejo. Genera uno nuevo y reimprime.',
    },
  ],
};

const location: TypePageCopy = {
  title: 'Generador de QR de ubicación (geo:) gratis',
  description:
    'Convierte unas coordenadas en un código QR que abre el mapa en ese punto exacto. Gratis, sin cuenta, sin caducidad.',
  h1: 'Generador de código QR de ubicación',
  lead: 'Entran unas coordenadas, sale un código que pone un pin en el punto exacto.',
  sections: [
    {
      heading: 'Cuándo las coordenadas ganan a una dirección',
      body: [
        'Una dirección postal es una búsqueda, y las búsquedas fallan. Puertas de fincas, entradas de festivales, inicios de sendero, accesos de obra, casas rurales, el muelle de carga detrás de una tienda: sitios donde la dirección lleva a la gente al lugar equivocado, o a ninguno.',
        'Un código <code>geo:</code> lleva la latitud y la longitud directamente, así que el mapa se abre en el punto exacto y no en una aproximación. Es la diferencia entre "el recinto" y "la puerta por la que de verdad se puede entrar con el coche".',
      ],
    },
    {
      heading: 'Encontrar tus coordenadas',
      body: [
        'En Google Maps, haz clic derecho en el punto exacto y la primera opción del menú es el par de coordenadas, listo para copiar. En el teléfono, suelta un pin y léelas en la tarjeta del lugar. Pégalas como grados decimales: <code>19.4326</code>, no <code>19&deg;25&#39;57&quot;N</code>. La latitud va de -90 a 90 y la longitud de -180 a 180; fuera de eso se rechaza en vez de codificar un código que no lleva a ningún sitio. Cuatro o cinco decimales te dejan a unos metros.',
      ],
    },
    {
      heading: 'El aviso honesto de compatibilidad',
      body: [
        'Android maneja bien los enlaces <code>geo:</code>: al escanear se abre la app de mapas por defecto en el punto. Los iPhone son inconsistentes: según la versión de iOS y la app de escaneo, el enlace puede abrir un mapa o simplemente mostrarte el texto en bruto.',
        'Así que prueba con un iPhone antes de imprimir nada que importe. Si se comporta mal, usa el tipo Enlace con una URL normal de mapas: un código más denso que se abre de forma fiable en todas partes, a cambio de depender de ese proveedor de mapas.',
      ],
    },
  ],
  payload: {
    caption: 'Todo el contenido es el par de coordenadas:',
    code: 'geo:19.4326,-99.1332',
    legend: [
      'primero la latitud, luego la longitud, separadas por coma',
      'solo grados decimales, negativos para sur y oeste',
      'no se nombra ningún proveedor de mapas, así que el teléfono usa la app que prefiera',
    ],
  },
  tipsHeading: 'Antes de imprimirlo',
  tips: [
    'Escanéalo con un iPhone y un Android. Es el único tipo donde los dos difieren de verdad.',
    'Con cuatro o cinco decimales sobra. Más dígitos solo hacen el código más denso.',
    'Imprime la dirección debajo como respaldo para quien vea el texto en bruto.',
  ],
  faqs: [
    {
      q: '¿Qué app de mapas abre?',
      a: 'La que prefiera el teléfono. El código nombra coordenadas, no un proveedor, así que ninguna empresa se interpone entre el escaneo y el mapa.',
    },
    {
      q: '¿Funciona en iPhone?',
      a: 'A veces, según la versión de iOS y la app de escaneo. Prueba antes de imprimir y usa un enlace de mapas si no se comporta.',
    },
    {
      q: '¿Puedo usar una dirección en vez de coordenadas?',
      a: 'En un código geo: no; el formato solo admite coordenadas. Usa el tipo Enlace con una URL de mapas si quieres codificar una búsqueda.',
    },
    {
      q: '¿Qué precisión necesitan las coordenadas?',
      a: 'Cinco decimales son más o menos un metro. Cuatro son unos diez metros y bastan para casi cualquier uso práctico.',
    },
    {
      q: '¿Necesita internet?',
      a: 'Leer el código no. Mostrar el mapa sí, salvo que el teléfono tenga mapas sin conexión de esa zona.',
    },
  ],
};

export { wifi, whatsapp, vcard, text, email, sms, phone, location };
