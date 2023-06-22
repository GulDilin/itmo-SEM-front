# itmo-SEM-front
Software Engineering Metodology course project frontend. Software Engineering Course ITMO magistracy 1-year 

## Used technologies

- Vue js 3 (https://vuejs.org/)
- Vue router (https://router.vuejs.org/)
- Vite (https://vitejs.dev/)
- Tailwindcss (https://tailwindcss.com/)
- Vuetify (https://vuetifyjs.com/en/)


> **_NOTE:_**  Vite pages plugin (https://github.com/hannoeru/vite-plugin-pages)
is used and all pages are stored in `/src/pages` directiory
and automatically mapped for routes

## Requirements

- nodejs >= 16.15.0 (https://nodejs.org/en/blog/release/v16.16.0)
- yarn
```shell
# TO install
npm install -g yarn
```

## Dev run

1. Install dependencies
```shell
yarn install
```

1. Create `.env.local` file and write API url
```shell
VITE_URL_API=http://localhost:5010
```

1. Run dev
```shell
yarn dev
```

## Build for deployment

1. Install dependencies
```shell
yarn install
```

1. Create `.env.production` file and write API url
```shell
VITE_URL_API=http://localhost:5010
```

1. Run dev
```shell
yarn build
```

1. You got `dist` directory with static frontend bundle
