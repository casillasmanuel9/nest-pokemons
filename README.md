<p align="center">
  <a href="http://nestjs.com/" target="blank"><img src="https://nestjs.com/img/logo-small.svg" width="200" alt="Nest Logo" /></a>
</p>

# Ejecutar en desarrollo

1. Clonar el repositorio
2. Ejecutar

```
yarn install
```
3. Tener Nest CLI instalado
```
 npm install -g @nestjs/cli
```
4. Levantar la base de datos
```
docker-compose up -d db
```

5. Clonar el archivo __.env.template__ y renomnbrar la copia a __.env__

6. Llenar las varialbes de entorno definidas en el __.env__

7. Ejecutar la aplicación en desarrollo con
```
yarn start:dev
```

6. Reconstruir la base de datos con la semilla
```
http://localhost:3000/api/v2/seed
```

### Stack Usado
* Nest
* MongoDB