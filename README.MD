# CRUD - Escola de Inglês
API para cadastro de alunos em uma escola de Inglês.

# Tech's
 - NodeJS
 - express
 - sequelize-cli

## Baixando dependências

```npm install```

## Banco de dados
### Configurando acesso ao BANCO

No arquivo localizado em  ```src/config/database.json```, fica as configurações do banco de dados

Alterar conforme necessário:

```json 
{
    "development": {
    "username": "username-banco",
    "password": "pw-banco",
    "database": "nome-banco",
    "host": "localhost",
    "dialect": "mysql",
    "port": "3306"
  }
}

```

### Criando o BANCO

```code 
     npx sequelize-cli db:create 
```
    
### Criando TABELAS do banco

```code
    npx sequelize-cli db:migrate
```

### Carregando dados ficticios (seeders)

```code 
    npx sequelize-cli db:seed:all
```

## Executando a aplicação
Para executar a aplicação:

``` 
    npm run dev
```