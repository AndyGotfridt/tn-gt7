# TN Argentina - GT7

Sitio web oficial de la comunidad **TN Argentina** para Gran Turismo 7. Calendario de carreras, listado de pilotos, tabla de posiciones en tiempo real y reglamento del campeonato.

**[tn.gt7.com.ar](https://tn.gt7.com.ar)**

## Secciones

- **Fechas** - Calendario de circuitos con fechas, horarios y detalles de cada carrera
- **Pilotos** - Listado de pilotos inscriptos separados por clase (C2 / C3)
- **Tabla de Posiciones** - Clasificacion general actualizada en tiempo real desde Google Sheets
- **Reglamento** - Reglas del campeonato, sanciones y normativa de competicion

## Tech Stack

| Herramienta | Version |
|---|---|
| React | 19 |
| TypeScript | 5.8 |
| Vite | 6 |
| Tailwind CSS | 4 |
| Motion (Framer Motion) | 12 |
| React Router | 7 |
| PapaParse | 5 |

## Requisitos

- Node.js >= 20
- npm

Esto ejecuta el build y sube el contenido de `dist/` a la rama `github-pages`.

## Datos

Los datos del campeonato (calendario, pilotos, posiciones, resultados) se consumen desde Google Sheets publicas via CSV. La app soporta multiples temporadas configuradas en `CHAMPIONSHIP_CONFIG` dentro de `src/App.tsx`.

## Estructura del Proyecto

```
github-page/
├── public/           # Assets estaticos (logo, favicon, CNAME)
├── src/
│   ├── App.tsx       # Componentes y logica principal
│   ├── main.tsx      # Entry point (React + HashRouter)
│   └── index.css     # Estilos globales (Tailwind)
├── index.html        # HTML template
├── vite.config.ts    # Configuracion de Vite
├── tsconfig.json     # Configuracion de TypeScript
└── package.json
```

## Autor

Andy Gotfridt