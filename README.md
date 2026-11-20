# 🍄 Serpiente de Setas 🐍

Juego arcade tipo Snake con estética neón de los 80:

- Hasta 4 jugadores (humanos o IA), con serpientes, gusanos, lombrices y escolopendras.
- 10 jefes finales en fases de pasillo.
- Modo historia, 5 dificultades y ranking.
- Se juega con teclado en PC y con controles táctiles en el móvil.

Es una **webapp (PWA)**:
- Se juega en el navegador y se puede **instalar en Android e iOS** como si fuera una app.
- Una vez instalada, funciona **sin conexión**.

## Jugar

Abre la página de GitHub Pages del repositorio, por ejemplo `https://TU-USUARIO.github.io/serpiente-de-setas/`.

### Android (Chrome)
1. Abre el enlace en Chrome.
2. Pulsa **Instalar** en el aviso que aparece abajo, o abre el menú ⋮ y elige **Añadir a pantalla de inicio** / **Instalar aplicación**.
3. Abre el juego desde el icono: se ve a pantalla completa.

### iPhone / iPad (Safari)
1. Abre el enlace en **Safari**.
2. Pulsa **Compartir** ⬆️ y luego **Añadir a pantalla de inicio**.
3. Abre el juego desde el icono: se ve a pantalla completa.

> En iPhone, la música empieza después del primer toque en la pantalla; es una norma de iOS. Si no se oye nada, revisa que el interruptor de silencio del lateral no esté activado.

### Controles en el móvil (jugador 1)
En el menú, elige uno de estos dos modos:
- **☝ DEDO**: toca tu serpiente y arrastra el dedo hacia donde quieras ir. El botón ✦ dispara.
- **🎮 PAD**: cruceta y botón de disparo en pantalla.

## Publicar en GitHub Pages (sin instalar nada)

1. Entra en [github.com](https://github.com) y crea un repositorio nuevo **público**, por ejemplo `serpiente-de-setas`.
2. En el repositorio pulsa **Add file → Upload files**.
3. Arrastra los **11 archivos** de esta carpeta: `index.html`, `sw.js`, `manifest.webmanifest`, los 3 iconos PNG, los 4 MP3 y este `README.md`.
4. Pulsa **Commit changes**.
5. Ve a **Settings → Pages**. En *Build and deployment* elige **Source: Deploy from a branch**, rama **main**, carpeta **/ (root)**, y pulsa **Save**.
6. Espera 1 o 2 minutos. La dirección aparece en esa misma página: `https://TU-USUARIO.github.io/serpiente-de-setas/`.

### Con Git (opcional)
```bash
git init
git add .
git commit -m "Serpiente de Setas"
git branch -M main
git remote add origin https://github.com/TU-USUARIO/serpiente-de-setas.git
git push -u origin main
```

## Actualizar el juego

1. En el PC, ejecuta `crear-version-github.ps1`, que está en la carpeta del proyecto. Regenera esta carpeta a partir de `serpiente-de-setas.html`.
2. Vuelve a subir los archivos que hayan cambiado; normalmente son `index.html` y `sw.js`.

Los móviles que ya tengan el juego instalado reciben la nueva versión al abrirlo con conexión. Si no aparece, ciérralo del todo y vuelve a abrirlo.

## Archivos

| Archivo | Para qué sirve |
|---|---|
| `index.html` | El juego completo, con las tipografías (Bungee, Press Start 2P y Chakra Petch) incluidas dentro |
| `sw.js` | Service worker: guarda el juego y la música para jugar sin conexión |
| `manifest.webmanifest` | Nombre, icono y pantalla completa al instalarlo |
| `icon-192.png`, `icon-512.png`, `apple-touch-icon.png` | Iconos de Android y de iPhone |
| `musica-*.mp3` | Música: arcade, pasillo, intro de jefes y final |
