# Nucleus

## TODOs

- Setup a Fastify server

## Project Creation

### Frontend App

The `frontend` and `frontend-e2e` are generated with

```bash
npx nx generate @nx/react:application --name=frontend --bundler=vite --compiler=swc --pascalCaseFiles=true --unitTestRunner=vitest --no-interactive;
```

`Tailwind CSS` is added with

```bash
npx nx generate @nx/react:setup-tailwind --project=frontend --no-interactive
```

### Backend App

The `backend` and `backend` are generated with

```bash
npx nx generate @nx/node:application --name=backend --bundler=webpack --frontendProject=frontend --docker=true --port=4700 --swcJest=true --babelJest=true --no-interactive
```

### Other Libraries

```bash
npx nx generate @nx/node:library --name=router --buildable=true --compiler=swc --babelJest=true --testEnvironment=node --standaloneConfig=false --no-interactive
npx nx generate @nx/node:library --name=api --buildable=true --compiler=swc --babelJest=true --testEnvironment=node --standaloneConfig=false --no-interactive
```
