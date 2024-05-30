# Projeto

Este é um projeto construído com .NestJS 10.0, TypeORM 3.5, MySQL e Docker.

este projeto foi desenvolvido seguindo algumas boas práticas da Arquitetura Limpa (Clean Architecture), Código Limpo (Clean Code) e DDD;

## Pré-requisitos

Certifique-se de ter o Docker e o Docker Compose instalados em sua máquina.

- Docker: [Instalação do Docker](https://docs.docker.com/get-docker/)
- Docker Compose: [Instalação do Docker Compose](https://docs.docker.com/compose/install/)
- Ferramenta de versionamento: [Instalação do Git](https://git-scm.com/)

## Como executar

1. Clone o repositório:

```bash
git clone https://github.com/mactavishkkk/credifit-challenge-api.git
```

2. Navegue até o diretório dos arquivos de construção:

```bash
cd credifit-challenge-api
```

3. Construa as imagens para os ambientes com docker, no terminal use:

```bash
docker compose build
```

4. Agora basta subir elas com:

```bash
docker compose up -d
```

5. Pronto, agora você já poderá acessar a rota de boas vindas em seu navegador:

```bash
https://localhost:3000/
```

---

## Documentação da API

A documentação da API pode ser encontrada em `http://localhost:3000/swagger/api`, onde você pode encontrar informações sobre os endpoints disponíveis, parâmetros de solicitação, respostas e exemplos de uso.