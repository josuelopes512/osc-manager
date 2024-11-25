# Gerenciador de OSC

Este é um projeto [Next.js](https://nextjs.org) para gerenciamento de projetos de OSCs, visualização de dashboards e muito mais.

## Funcionalidades

- Dashboards Interativos
- Colaboração em Tempo Real
- Análises Avançadas
- Relatórios Personalizados
- Desempenho Rápido
- Segurança de Nível Empresarial

## Questionario utilizado como base

[viewanalytics](https://docs.google.com/forms/d/1aaLxBrEvFuWZpcE16p95_pmbk7DOKDxKe7kgOVYmGY4/viewanalytics)

[questionario-osc](https://docs.google.com/forms/d/1aaLxBrEvFuWZpcE16p95_pmbk7DOKDxKe7kgOVYmGY4/prefill)

## Tecnologias Utilizadas

- [Next.js](https://nextjs.org)
- [React](https://reactjs.org)
- [Tailwind CSS](https://tailwindcss.com)
- [Prisma](https://www.prisma.io)
- [NextUI](https://nextui.org)

## Começando

### Pré-requisitos

Certifique-se de ter o Node.js instalado em sua máquina. Você pode baixá-lo [aqui](https://nodejs.org/).

### Instalação

1. Clone o repositório:

  ```bash
  git clone https://github.com/levigleik/osc-manager.git
  cd osc-manager
  ```

2. Instale as dependências

#### Usando npm
  ```bash
  npm install
  ```

#### Usando yarn
  ```bash
  yarn install
  ```

#### Usando bun
  ```bash
  bun install
  ```

### Configure as variáveis de ambiente

Crie um arquivo `.env` na raiz do projeto e adicione suas variáveis de ambiente. Você pode usar o arquivo `.env.example` como referência.

  ```bash
  cp .env.example .env
  ```

## Executando o Projeto

Para executar o projeto em um ambiente de desenvolvimento, use um dos comandos abaixo:

#### Usando npm
  ```bash
  npm run dev
  ```

#### Usando yarn
  ```bash
  yarn dev
  ```

#### Usando bun
  ```bash
  bun dev
  ```

Abra [http://localhost:3005](http://localhost:3005) no seu navegador para ver o resultado.

## Executando em Produção

Para executar o projeto em um ambiente de produção, use os comandos abaixo:

### Build do projeto

#### Usando npm
  ```bash
  npm run build
  ```

#### Usando yarn
  ```bash
  yarn build
  ```

#### Usando bun
  ```bash
  bun build
  ```

### Iniciar o servidor

#### Usando npm
  ```bash
  npm start
  ```

#### Usando yarn
  ```bash
  yarn start
  ```

#### Usando bun
  ```bash
  bun start
  ```

Abra [http://localhost:3000](http://localhost:3000) no seu navegador para ver o resultado.

## Prisma

Para executar o Prisma Studio, use os comandos abaixo:

### Ambiente de desenvolvimento
  ```bash
  npm run prisma_studio:dev
  ```

### Ambiente de produção
  ```bash
  npm run prisma_studio:prod
  npm i; npx prisma migrate dev; npx prisma generate; npm run seed
  ```

## Contribuindo

Contribuições são bem-vindas! Sinta-se à vontade para abrir uma issue ou enviar um pull request.

## Licença

Este projeto está licenciado sob a Licença MIT. Veja o arquivo `LICENSE` para mais detalhes.
