# FORJADO Marketing Digital

Sitio web oficial de FORJADO — *Tu negocio, al siguiente nivel.* Sitio estático (HTML/CSS/JS), sin build, en español (por defecto), francés e inglés.

## Antes de publicar (editar `config.js`)
- `WHATSAPP_NUMBER`: número con código de país, solo dígitos (ej. `15145550123`). Vacío = el botón de WhatsApp se oculta.
- `FORM_ENDPOINT`: URL de Formspree / Basin / Web3Forms / Getform. Vacío = el formulario usa WhatsApp si hay número; si no, avisa que no está conectado.

## Estructura
- `index.html` — página y SEO · `styles.css` — diseño · `main.js` — idiomas, slider, formulario, animaciones
- `privacidad.html` + `privacy.js` — política de privacidad ES/FR/EN · `404.html` · `_headers` (para Cloudflare Pages/Netlify; GitHub Pages lo ignora)
- `i18n.js` — todos los textos ES/FR/EN · `assets/` — logo e ilustraciones originales (SVG)

## Pendiente
- Los casos del portafolio son **demos** rotuladas como tales; reemplázalos por trabajos reales cuando existan.
- Fotografía real: las ilustraciones SVG son provisionales (el entorno no pudo descargar bancos de imágenes).
- Cuando tengas dominio: añade `sitemap.xml`, la línea `Sitemap:` en `robots.txt` y la URL canónica; la imagen Open Graph debe ser absoluta.
- Revisa la política de privacidad con un profesional (Québec: Ley 25).
- Imagen Open Graph en PNG/JPG (`assets/og.jpg` no la muestran todas las redes), dominio y redes sociales.
- Desarrollo local: `python3 -m http.server`
