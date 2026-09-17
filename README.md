# Invitación Primera Comunión de Mia

Sitio estático (HTML + CSS + JavaScript, sin frameworks ni build).

## Estructura

```
invitacion-mia/
├─ assets/        imágenes (cáliz, flores, textura de papel)
├─ css/styles.css estilos
├─ js/main.js     cuenta regresiva, pétalos y animaciones al scroll
├─ index.html     la invitación
├─ .nojekyll      necesario para GitHub Pages
└─ README.md
```

## Ver localmente

Abrí `index.html` en el navegador, o copiá la carpeta en `C:\xampp\htdocs\invitacion-mia` y entrá a `http://localhost/invitacion-mia/`.

## Publicar en GitHub Pages

1. Creá un repositorio y subí el contenido de esta carpeta a la rama `main`.
2. En el repo: Settings → Pages → Source: `Deploy from a branch` → Branch: `main` / `/ (root)`.
3. En unos minutos queda en `https://TU-USUARIO.github.io/TU-REPO/`.

Todas las rutas son relativas, así que funciona en cualquier subcarpeta.

## Qué cambiar

| Qué | Dónde |
| --- | --- |
| Horarios, lugares, textos | `index.html` |
| Enlaces de Google Maps | `index.html` (atributos `href`) |
| Formulario de confirmación | `index.html` (botón "Confirmar asistencia") |
| Fecha de la cuenta regresiva | `js/main.js`, constante `FECHA_EVENTO` |
| Colores y tipografías | `css/styles.css`, bloque `:root` |
| Imágenes | carpeta `assets/` |
