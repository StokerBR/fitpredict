# FitPredict API

Api para o sitema FitPredict.

Para visualizar a documentação da API, acesse o [Swagger](#swagger).

## Usuários padrão

Esse usuário será criado automaticamente ao rodar os [seeders](#rodar-seeders):

- Usuário: `usuario@avalieaqui.com`
- Senha: `fitpredict123`

## Informações/comandos para o desenvolvimento

_Execute os comandos desejados a seguir neste diretório_

### Conficurar ambiente

- Renomear o arquivo `.env.example` para `.env`
- Editar `DATABASE_URL` com o endereço do seu banco de dados PostgreSQL local

### Instalar dependências

```
npm install
```

### Rodar migrations

```
npx prisma migrate dev
```

- Será necessário rodar as migrations sempre que houver alterações em `schema.prisma`
- Este comando já irá gerar o Prisma Client com as alterações
  - Para gerar o Prisma Client manualmente, execute `npx prisma generate`

### Rodar seeders

```
npm run seed
```

- Este comando irá popular o banco de dados com dados aleatórios

### Iniciar servidor de desenvolvimento

```
npm run start:dev
```

- Este comando irá iniciar o servidor em modo de desenvolvimento, na porta `4000` local
- O servidor irá reiniciar automaticamente a cada alteração nos arquivos

### Prisma Studio

O Prisma Studio é uma ferramenta de visualização de dados do banco de dados. Para iniciar o Prisma Studio, execute o comando abaixo e acesse o endereço `http://localhost:5555` no navegador.

```
npx prisma studio
```

### Swagger

O Swagger é uma ferramenta de visualização de rotas, parâmetros e exemplos da API. Para iniciar o Swagger, inicie o servidor e acesse o endereço `http://localhost:4000/api` no navegador.
