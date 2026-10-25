# FORJADO Marketing Digital — sitio web estático

HTML, CSS y JavaScript puros. Sin backend, sin base de datos, sin dependencias de pago.

## Estructura
```
index.html          Página principal
404.html            Página de error
css/styles.css      Estilos
js/config.js        TUS DATOS DE CONTACTO (edita este archivo)
js/main.js          Menú móvil y formulario
assets/img/         Logotipo y favicon (SVG propios, sin derechos de terceros)
paginas/            Aviso legal y privacidad/cookies
robots.txt, sitemap.xml, _headers
```

## Antes de publicar (obligatorio)
1. **js/config.js**: pon tu número de WhatsApp real (país + número, solo dígitos), tu correo real y cambia `whatsappConfigurado` a `true`. Hasta entonces el botón de WhatsApp del formulario muestra un aviso y los enlaces usan datos de ejemplo.
2. **Dominio**: reemplaza `TU-DOMINIO.pages.dev` por tu dirección real en `index.html` (canonical), `robots.txt` y `sitemap.xml`.
3. **Páginas legales**: completa los datos marcados `[COMPLETAR]` en `paginas/`. Son plantillas: haz que un profesional las revise según la ley de tu país.
4. **Oferta de 30 días**: el alcance escrito en la sección "Prueba gratuita" es una propuesta. Ajústalo a lo que realmente puedes entregar.

## Cómo funciona el formulario
No envía datos a ningún servidor. Al pulsar "Enviar por WhatsApp" abre WhatsApp con el mensaje escrito; "Enviar por correo" abre tu cliente de correo. La persona debe pulsar enviar. Si quieres recibir formularios directamente, necesitas un servicio externo (por ejemplo Formspree o Cloudflare Workers), que requiere su propia cuenta y configuración.

## Editar
- Textos: `index.html`. Colores y tipografías: variables al inicio de `css/styles.css`.
- Portafolio: son 3 proyectos ficticios con maquetas dibujadas en CSS. Cuando tengas trabajos reales y autorización de tus clientes, sustitúyelos y elimina la etiqueta "ficticio".
- Imágenes: usa solo las que tengas derecho a usar. Colócalas en `assets/img/`.

## Probar en local
Abre `index.html` en el navegador, o ejecuta `python3 -m http.server` en esta carpeta y entra en http://localhost:8000.

## Publicar en Cloudflare Pages
**Subida directa:** Cloudflare Dashboard → Workers & Pages → Create → Pages → Upload assets → arrastra el contenido de esta carpeta (o el ZIP descomprimido) → Deploy.
**Con Git:** sube la carpeta a un repositorio y conéctalo en Pages. Build command: vacío. Output directory: `/`.
