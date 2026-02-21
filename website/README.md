# Developer Duo Website

A DevSpace-inspired portfolio site for Daria Levitan (Back-end) and Evgeny Nemchenko (Front-end).

## Run

```bash
npm install
npm run dev
```

Open http://localhost:5173

## Add Photos

1. Place `daria.jpg` and `evgeny.jpg` in the `public/` folder
2. Update `src/data/developers.ts`:
   - `photo: '/daria.jpg'` for Daria
   - `photo: '/evgeny.jpg'` for Evgeny

## Build

```bash
npm run build
```

Output is in `dist/`.
