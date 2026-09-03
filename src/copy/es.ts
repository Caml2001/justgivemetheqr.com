import type { ArticlePageCopy, HomeCopy, SiteCopy } from './types';

const REPO = 'https://github.com/Caml2001/justgivemetheqr.com';

const chrome: SiteCopy['chrome'] = {
  skipToTool: 'Ir al generador',
  home: 'Generador',
  types: 'Tipos de código',
  whyStatic: 'Por qué no caducan',
  privacy: 'Privacidad',
  footerNote:
    'Gratis para siempre, sin cuenta, sin caducidad. Todo se genera en tu navegador: nada de lo que escribes se sube a ningún sitio.',
  faqHeading: 'Preguntas que la gente hace de verdad',
  otherTypes: 'Otros tipos de código',
  readMore: 'Por qué estos códigos no pueden caducar',
  payloadHeading: 'Qué lleva el código por dentro',
  builtBy: 'Just Give Me The QR',
  langSwitch: 'English',
  source: 'Código fuente en GitHub',
  madeBy: 'Hecho por',
  developers: 'Enlaces prellenados',
  about: 'Acerca de',
  contact: 'Contacto',
  paramsHeading: 'Parámetros por tipo',
  paramsIntro: 'Los nombres de campo son los parámetros de la URL. También se aceptan los alias.',
  colParameter: 'Parámetro',
  colField: 'Campo',
  colAliases: 'Alias',
};

const home: HomeCopy = {
  title: 'Generador de códigos QR gratis, sin registro',
  description:
    'Crea códigos QR en tu navegador. Gratis para siempre, sin cuenta, sin caducidad. Enlaces, WiFi, WhatsApp, contactos y más. Nada se sube a ningún servidor.',
  h1: 'Solo dame el QR',
  lead: 'Gratis para siempre. Sin cuenta, sin caducidad, sin suscripción. Escribe, descarga, listo.',
  sections: [
    {
      heading: 'Por qué existe esto',
      body: [
        'Busca un generador de códigos QR gratis y casi todo lo que encuentras es un anzuelo. Tienes tu código en diez segundos, imprimes quinientos folletos y unas semanas después el código lleva a una página que pide a tus clientes que mejoren un plan que no sabías que tenías. El generador no se rompió: funcionó exactamente como fue diseñado.',
        'Ese truco solo es posible porque esos sitios te entregan un código <strong>dinámico</strong>: un código que contiene un enlace corto a su servidor, que a su vez redirige a tu destino real. Ellos controlan la redirección. Deja de pagar y la redirección se apaga, con tus folletos todavía en la pared.',
        'Los códigos que hace este sitio son <strong>estáticos</strong>. Tu enlace, tu contraseña de WiFi, tu número de teléfono: los datos están dentro del propio dibujo en blanco y negro. No hay un servidor intermedio que mantener vivo, ninguna suscripción que vencer y ninguna forma de que nosotros cambiemos o matemos tu código después de descargarlo. Aunque este sitio desapareciera mañana, cada código que haya generado seguiría funcionando. <a href="/es/estatico-vs-dinamico">Aquí está la explicación larga</a>.',
      ],
    },
    {
      heading: 'Qué obtienes',
      body: [
        'Nueve tipos de código: enlaces, WiFi, WhatsApp, tarjetas de contacto, texto, email, SMS, números de teléfono y ubicaciones en el mapa. PNG de hasta 2048&nbsp;px para imprimir, o SVG para lo que necesite escalar. Tus colores, seis formas para los módulos y los ojos, un logo en el centro si lo quieres, tu margen y tu nivel de corrección de errores. Sin marca de agua, sin límite diario, sin pedirte un correo.',
        'La herramienta entera es una página de JavaScript que corre en tu dispositivo. Tus datos nunca tocan un servidor porque no hay servidor que tocar: el sitio es un puñado de archivos estáticos. No es una promesa de privacidad que te pedimos creer; es simplemente cómo está construido, y <a href="' + REPO + '">el código es público</a>, así que puedes leerlo.',
      ],
    },
    {
      heading: 'Qué no hace',
      body: [
        'No hay seguimiento de escaneos ni destinos editables. Las dos cosas necesitan un servidor de redirección, y un servidor de redirección es justo lo que se puede apagar. Si de verdad necesitas cambiar a dónde apunta un código ya impreso, <a href="/es/estatico-vs-dinamico">lee esto primero</a>: hay una forma de conseguir casi todo eso sin alquilar nada.',
        'No hay generación masiva desde una hoja de cálculo. No hay cuenta, así que nada se guarda entre visitas: si quieres recuperar un código, genéralo otra vez o conserva el archivo. El logo que añadas también se queda en tu pestaña y desaparece al cerrarla.',
      ],
    },
  ],
  faqs: [
    {
      q: '¿Es gratis de verdad, o gratis hasta que deje de serlo?',
      a: 'Gratis de verdad. No hay cuenta que crear, ni prueba que caduque, ni plan al que subir. Los códigos que descargas son tuyos como archivos: no podríamos revocarlos aunque quisiéramos.',
    },
    {
      q: '¿Cuál es el truco? ¿Cómo se paga esto?',
      a: 'La respuesta honesta es que cuesta casi nada mantenerlo. El sitio son unos archivos estáticos en un CDN, sin base de datos, sin cuentas que atender y sin servidor de redirección que mantener vivo. Por eso mismo los códigos no pueden caducar.',
    },
    {
      q: '¿Mis códigos dejan de funcionar si este sitio se cae?',
      a: 'No. Un código QR estático lleva sus propios datos. Una vez que el PNG o el SVG está en tu disco, este sitio le es irrelevante. Escanearlo no nos contacta en ningún momento.',
    },
    {
      q: '¿Pueden ver lo que escribo en el generador?',
      a: 'No. El código QR lo dibuja en tu dispositivo el JavaScript que corre en tu pestaña. No se envía nada a ningún sitio: puedes comprobarlo abriendo las herramientas de red del navegador mientras escribes, o desconectándote de internet y viendo cómo el generador sigue funcionando. Si prefieres leer a probar, <a href="' + REPO + '">el código fuente está en GitHub</a>.',
    },
    {
      q: '¿Puedo usarlos comercialmente?',
      a: 'Sí. Menús, empaques, tarjetas de visita, gafetes de eventos, escaparates, manuales de producto. Sin atribución obligatoria, sin licencia que comprar.',
    },
    {
      q: '¿Puedo saber cuánta gente escanea mi código?',
      a: 'Con un código estático no, y esa es la contrapartida. Contar escaneos implica hacer pasar a todo el mundo por un servidor que los registra, lo que hace al código dependiente de que ese servidor siga encendido y pagado. Si necesitas los números, pon analítica en la página a la que apunta el código: la misma información, sin alquilar nada.',
    },
    {
      q: '¿PNG o SVG?',
      a: 'SVG para todo lo que vaya a una imprenta o necesite cambiar de tamaño: se mantiene nítido a cualquier escala. PNG para presentaciones, redes sociales y compartir rápido. Si dudas, un PNG de 1024&nbsp;px sirve para casi todo lo impreso.',
    },
  ],
};

const staticVsDynamic: ArticlePageCopy = {
  title: 'QR estático vs dinámico, explicado sin rodeos',
  description:
    'Por qué un QR estático no puede caducar, por qué los dinámicos de un proveedor mueren con la suscripción, y cómo cambiar el destino sin alquilar nada.',
  h1: 'QR estático vs dinámico',
  lead: 'Uno de los dos puede dejar de funcionar. Conviene saber cuál tienes antes de imprimir nada.',
  sections: [
    {
      heading: 'Toda la diferencia en una frase',
      body: [
        'Un código QR <strong>estático</strong> contiene tus datos. Un código QR <strong>dinámico</strong> contiene el enlace corto de otro, que apunta a un servidor que redirige a tus datos. Todo lo demás —las páginas de precios, las pruebas gratuitas, los códigos que de repente dejan de funcionar— se deriva de esa única diferencia.',
      ],
    },
    {
      heading: 'Por qué un código estático no puede caducar',
      body: [
        'Un código QR no es una imagen que remite a información guardada en otro sitio. <em>Es</em> la información, escrita en un alfabeto bidimensional de cuadros blancos y negros. Cuando un teléfono lee <code>https://tu-restaurante.example/menu</code> en un código, no está consultando nada: descodificó ese texto directamente del dibujo, igual que tú descodificas letras a partir de tinta.',
        'Por eso un código estático impreso no tiene más fecha de caducidad que un número de teléfono impreso. Nadie puede meter la mano en una tarjeta plastificada y cambiar lo que dice. No hay cuenta detrás, ni servidor que lo mantenga vivo, ni empresa cuyas decisiones de negocio puedan alcanzarlo. Se leerá igual dentro de diez años que hoy, mientras la tinta aguante y el destino siga existiendo.',
        'También significa que la herramienta que lo hizo deja de importar después. Generar un código es un cálculo que se hace una vez, no una suscripción a un servicio. Con el archivo en tu disco, nosotros desaparecemos de la ecuación.',
      ],
    },
    {
      heading: 'Qué es realmente un código dinámico',
      body: [
        'Un código dinámico contiene algo como <code>https://proveedor-qr.example/a7Xk2</code>. Al escanearlo, el teléfono va al proveedor, que busca <code>a7Xk2</code> en una base de datos, encuentra tu destino y reenvía al visitante. Eso permite dos cosas: cambiar el destino después de imprimir y contar cada escaneo por el camino.',
        'Las dos ventajas nacen del mismo hecho: cada escaneo tiene que pasar por un servidor que es del proveedor. No estás comprando un código. Estás alquilando una redirección, y el código de tu cartel vale exactamente lo que vale ese contrato de alquiler.',
      ],
    },
    {
      heading: 'Cómo falla en la práctica',
      body: [
        'Lo más común es la prueba gratuita. Muchos generadores no dicen la palabra "prueba" cerca del botón de descarga; te enteras cuando el código empieza a mostrar una página de pago, normalmente con los folletos ya impresos. Luego está el plan que sí cancelaste, a propósito, olvidando que un código en tu empaque dependía de él.',
        'Los fallos lentos son peores porque no los ves venir: al proveedor lo compran y cierra el dominio corto antiguo, o cierra del todo, o deja vencer el dominio, o pone el código detrás de un límite de escaneos. En todos los casos el fallo cae sobre material impreso que ya pagaste, y no hay nada que puedas hacerle a la tinta.',
      ],
    },
    {
      heading: 'Cuándo el dinámico sí es la opción correcta',
      body: [
        'Es un producto real, no una estafa, y a veces es la única opción. Si necesitas poder cambiar el destino después de imprimir y no controlas ningún dominio, o necesitas analítica por escaneo que la analítica de la página no te da, un código dinámico hace algo que uno estático no puede. Solo entra sabiendo que estás comprando una dependencia permanente, presupuéstala para siempre y elige un proveedor al que le confiarías un compromiso de cinco años, porque eso es un código impreso.',
      ],
    },
    {
      heading: 'Cómo cambiar el destino sin alquilar nada',
      body: [
        'Apunta un código estático a una URL que ya controlas y cambia lo que hay en esa URL. Un código con <code>https://tu-sitio.example/menu</code> es permanente, pero la página en <code>/menu</code> es tuya para editarla, redirigirla o sustituirla cuando quieras. Tienes la flexibilidad del código dinámico, la redirección es tuya, y lo único de lo que dependes es de tu propio dominio, que ya estabas pagando.',
        'Para contar escaneos, pon analítica web normal en esa página de destino. Verás visitas, horas y ubicaciones aproximadas sin intermediarios, y el código sigue funcionando aunque después quites la analítica por completo.',
      ],
    },
    {
      heading: 'Cómo saber cuál tienes ya',
      body: [
        'Escanea el código con cualquier teléfono y mira la dirección antes de abrirla. Si ves tu propio destino, es estático y estás a salvo. Si ves un enlace corto en un dominio que no reconoces —normalmente la marca del generador o un dominio raro de tres letras— es dinámico, y seguirá funcionando exactamente el tiempo que esa empresa decida.',
      ],
    },
  ],
  faqs: [
    {
      q: '¿Se puede editar un código QR estático después de imprimirlo?',
      a: 'No. Los datos son el dibujo, así que cambiar el destino significa generar e imprimir un código nuevo. Apuntarlo a una URL que controlas es la forma habitual de sortearlo.',
    },
    {
      q: '¿Los códigos estáticos funcionan sin internet?',
      a: 'El escaneo en sí siempre funciona sin conexión, porque la descodificación ocurre en el teléfono. Que después pase algo útil depende del contenido: WiFi, tarjetas de contacto, texto y números de teléfono funcionan sin conexión; un enlace, obviamente, la necesita para abrirse.',
    },
    {
      q: '¿Los códigos estáticos se escanean peor?',
      a: 'Llevan más datos, así que tienen más cuadros y pueden verse más densos que un enlace corto dinámico. Imprímelos un poco más grandes, respeta el margen blanco y se escanean igual de bien. Una URL corta mantiene el dibujo más simple.',
    },
    {
      q: '¿Un código dinámico es alguna vez más seguro?',
      a: 'Es más flexible, no más seguro. Añade una empresa y un servidor entre tu cliente y tu contenido: una cosa más que puede caerse, ser hackeada, cambiar de dueño o empezar a cobrar.',
    },
    {
      q: 'Mi código impreso dejó de funcionar. ¿Puedo arreglarlo?',
      a: 'El impreso no, si era dinámico y la redirección ya no existe. Lo que sí puedes hacer es generar un sustituto estático que apunte a una URL tuya, para que la siguiente tirada no vuelva a tener este problema.',
    },
  ],
};

const privacy: ArticlePageCopy = {
  title: 'Privacidad: sin cuentas, sin subidas, sin cookies',
  description:
    'Qué recoge este sitio y qué no. Sin cuentas, sin cookies, nada de lo que escribes se sube. Corto, concreto y cierto.',
  h1: 'Privacidad',
  lead: 'Versión corta: lo que escribes nunca sale de tu dispositivo, y aquí no hay nada en lo que registrarse.',
  sections: [
    {
      heading: 'Qué pasa con lo que escribes',
      body: [
        'Nada sale de tu navegador. Enlaces, contraseñas de WiFi, números de teléfono, datos de contacto: todo lo convierte en código QR el JavaScript que corre en tu propio dispositivo, y la imagen resultante se dibuja en local. No se hace ninguna petición a ningún servidor con tu contenido, porque el sitio no tiene servidor al que enviarlo.',
        'No hace falta que nos creas. Abre la pestaña de red de tu navegador y escribe en el generador: no verás peticiones. O carga la página, desconéctate de internet y sigue generando códigos: funciona igual sin conexión. Y todo el sitio es de código abierto: <a href="' + REPO + '">el código está en GitHub</a>.',
      ],
    },
    {
      heading: 'Cuentas, cookies y almacenamiento',
      body: [
        'No hay cuentas, así que no hay nada en lo que registrarse ni perfil que borrar. El sitio no pone cookies. No escribe lo que introduces en el almacenamiento local, así que en una computadora compartida no queda nada al cerrar la pestaña, salvo la barra de direcciones si usaste a propósito un enlace prellenado.',
        'Los enlaces prellenados como <code>/wifi?ssid=Cafe&amp;password=hunter2</code> son una comodidad para incrustar la herramienta, y sus valores los ve cualquiera que vea ese enlace o tu historial. Es una propiedad de los enlaces en general, pero merece decirse en voz alta en una página sobre contraseñas de WiFi.',
      ],
    },
    {
      heading: 'Alojamiento',
      body: [
        'El sitio se sirve como archivos estáticos desde Cloudflare Pages. Como cualquier proveedor, Cloudflare gestiona la petición de red necesaria para entregarte esos archivos y puede guardar registros de infraestructura de corta duración —normalmente dirección IP, hora y archivo solicitado— por seguridad y prevención de abusos. Es lo estándar en cualquier web que visitas, nosotros no leemos esos registros, y nada de eso contiene lo que escribiste en el generador.',
      ],
    },
    {
      heading: 'Escanear',
      body: [
        'Escanear un código hecho aquí no contacta con este sitio. Los datos están dentro del código, así que un escaneo es una operación puramente local entre una cámara y un dibujo. No podemos contar tus escaneos, y tampoco puede nadie que no esté en el destino.',
      ],
    },
  ],
  analytics: {
    on: {
      heading: 'Analítica',
      body: [
        'Este sitio usa Cloudflare Web Analytics: un script sin cookies que reporta páginas vistas y referencias de forma agregada. No usa cookies, no toma huellas del dispositivo y no te sigue entre sitios. Registra que una página se vio, no quién la vio, y nunca ve lo que escribes en el generador.',
      ],
    },
    off: {
      heading: 'Analítica',
      body: [
        'No hay ninguna analítica en este sitio. Ni contador de visitas, ni scripts de terceros, nada. Si eso cambia alguna vez será Cloudflare Web Analytics —sin cookies y agregada— y esta página lo dirá antes de activarla.',
      ],
    },
  },
};

const developers: ArticlePageCopy = {
  title: 'Enlaces prellenados: enlaza al generador de QR',
  description:
    'Cada campo de cada tipo de QR se puede prellenar desde un enlace. Nombres de parámetros, alias y ejemplos para incrustar o enlazar al generador.',
  h1: 'Enlaces prellenados',
  lead: 'Abre el generador con los campos ya rellenos. No se descarga nada hasta que la persona hace clic.',
  sections: [
    {
      heading: 'Cómo funciona',
      body: [
        'Cada página del generador lee sus campos de la cadena de consulta. Manda a alguien a <code>/es/wifi?ssid=Cafe%20Invitados&amp;password=flatwhite</code> y aterriza en el generador de WiFi con los dos campos rellenos y el código ya dibujado. Sigue decidiendo si lo descarga: un enlace nunca dispara una descarga, y nunca fija colores ni formas, que se quedan con quien hace el código.',
        'Esto es toda la "API". No hay un endpoint que devuelva una imagen, porque no hay servidor: el código QR lo dibuja JavaScript en el navegador del visitante. Lo que hay es un formato de enlace estable que puedes construir desde una hoja de cálculo, un CMS, un chatbot o una instrucción impresa.',
      ],
    },
    {
      heading: 'Notas sobre los valores',
      body: [
        'Codifica todo en URL. Los espacios pasan a <code>%20</code>, los ampersand a <code>%26</code>, los saltos de línea a <code>%0A</code>. Los campos booleanos como <em>oculta</em> aceptan <code>true</code>, <code>1</code>, <code>yes</code> u <code>on</code>. La página de inicio acepta además <code>type=</code> para preseleccionar un tipo sin visitar su página.',
        'Lo que pongas en un enlace lo ve cualquiera que vea el enlace, incluida una contraseña de WiFi. Es una propiedad de los enlaces, no de este sitio, pero conviene recordarlo antes de pegar uno en un grupo.',
        'La descripción legible por máquinas de los mismos parámetros está publicada como <a href="/openapi.json">documento OpenAPI</a>, y un resumen en texto plano para modelos de lenguaje en <a href="/llms.txt">/llms.txt</a>.',
      ],
    },
  ],
  faqs: [
    {
      q: '¿Puedo obtener un PNG desde una URL?',
      a: 'No. Nada se genera en un servidor. Si necesitas imágenes en masa, el código es abierto: ejecútalo tú.',
    },
    {
      q: '¿Un enlace puede fijar los colores o el logo?',
      a: 'No, a propósito. Solo los campos de contenido se prellenan, así que un enlace no puede decidir cómo se ve el código de otra persona.',
    },
    {
      q: '¿Cambiará el formato de los enlaces?',
      a: 'Los nombres de campo son los que se ven en el formulario y están pensados para ser estables. Los alias existen para que los enlaces cortos sigan funcionando.',
    },
    {
      q: '¿Hay límite de peticiones?',
      a: 'No hay nada que limitar. Las páginas son archivos estáticos en un CDN.',
    },
  ],
};

const about: ArticlePageCopy = {
  title: 'Acerca de: por qué existe Just Give Me The QR',
  description:
    'Un generador de códigos QR gratis y sin registro que corre entero en tu navegador, nacido del hartazgo con herramientas gratis que acaban en suscripción.',
  h1: 'Acerca de',
  lead: 'Una persona, una página de JavaScript y una manía contra los códigos QR que dejan de funcionar.',
  sections: [
    {
      heading: 'Por qué se hizo',
      body: [
        'La primera versión de este sitio salió de una experiencia muy corriente: necesitar un QR para un menú, usar un generador "gratis" y descubrir un mes después que el código abría una página de pago en vez del menú. El generador no se había roto. Había entregado un código dinámico —un enlace corto a su propio servidor— y apagó la redirección cuando terminó la prueba.',
        'Un código QR es un estándar barato, de hace treinta años, que un teléfono lee sin ayuda de nadie. La única razón por la que un código deja de funcionar es que alguien puso un servidor entre el dibujo y el destino y luego lo apagó. Este sitio existe para hacer los del otro tipo, y para explicar la diferencia con la claridad suficiente para que menos gente caiga.',
      ],
    },
    {
      heading: 'Qué es',
      body: [
        'Un sitio estático: un puñado de páginas HTML y un archivo pequeño de JavaScript que dibuja códigos QR en tu dispositivo. Sin cuentas, sin base de datos, sin analítica por defecto, sin subidas. Está alojado en un CDN, cuesta casi nada mantenerlo, y seguiría haciendo funcionar cada código que haya generado aunque se apagara mañana, porque los códigos nunca dependieron de él.',
        'Todo es de código abierto. <a href="' + REPO + '">El código está en GitHub</a>, incluidas las pruebas que renderizan cada tipo de código a píxeles y lo escanean de vuelta para demostrar que se descodifica.',
      ],
    },
    {
      heading: 'Quién',
      body: [
        'Hecho por <a href="https://charlymtz.com">charlymtz.com</a>. Los reportes de errores, las correcciones a los textos y las ideas son bienvenidos a través de la <a href="/es/contacto">página de contacto</a>.',
      ],
    },
  ],
};

const contact: ArticlePageCopy = {
  title: 'Contacto: errores, correcciones e ideas',
  description:
    'Cómo reportar un error, corregir algo del sitio o proponer una función. Sin mesa de soporte ni tickets: un gestor de incidencias público y una persona.',
  h1: 'Contacto',
  lead: 'No hay mesa de soporte, porque no hay nada que soportar: ni cuentas, ni suscripciones, ni datos. Sí hay una persona.',
  sections: [
    {
      heading: '¿Encontraste un error o una afirmación falsa?',
      body: [
        'Abre una incidencia en <a href="' + REPO + '/issues">el repositorio de GitHub</a>. Es la vía más rápida, es pública para que otros encuentren la misma respuesta, y es donde de verdad se hacen los arreglos. Si un código hecho aquí no se escanea en un teléfono concreto, di qué tipo de contenido, qué teléfono y qué app de escaneo: la misma información que necesita una prueba.',
        'Si prefieres no usar GitHub, puedes contactar al autor a través de <a href="https://charlymtz.com">charlymtz.com</a>.',
      ],
    },
    {
      heading: 'Cosas que no son un error',
      body: [
        'Un código impreso que dejó de funcionar porque la página de destino se movió no es algo que este sitio pueda arreglar: el código sigue diciendo exactamente lo que decía el día que se hizo. La próxima vez apúntalo a una URL que controles; la <a href="/es/estatico-vs-dinamico">página de estático vs dinámico</a> explica cómo.',
        'Las peticiones de seguimiento de escaneos o destinos editables se rechazarán con amabilidad. Las dos requieren un servidor de redirección, que es justo lo que este sitio promete no ser nunca.',
      ],
    },
    {
      heading: 'Negocios, prensa y licencias',
      body: [
        'El generador es gratis para uso personal y comercial, sin atribución obligatoria. No hay nada que licenciar ni programa de socios. Si quieres escribir sobre el sitio, todo lo que merece citarse ya está en él, y el código es público.',
      ],
    },
  ],
};

export { chrome, home, staticVsDynamic, privacy, developers, about, contact };
