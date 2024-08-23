# Projeto da Disciplina: Projeto Integrador II

## Curso: Técnologo em Análise e Desenvolvimento de Sistemas - IFSP - _Campus_ Caraguatatuba

### Turma: **2024/2**

### Professor: _Denny Paulista Azevedo Filho_

## Tema: Sistema de Locação de Espaços

### Metodologias empregadas:

- Scrum e Kanban
- Equipes ágeis (cinco): PO (atuando com AM também), UX/UI, Devs FrontEnd e BackEnd
- Clean Code
- Clean Arquitecture
- API Restfull
- DDD
- SOLID
- Testes unitáios

### Tecnologia e Ferramentas Empregadas

- Visual Studio Code (IDE)
- Figma
- React.JS/Next.JS com TypeScript
- Node.JS/Nest.JS com TypeScript
- Prisma
- Pacotes de rotas e validações
- Banco de Dados Relacional - PostgreSQL

## Estrutura do Projeto

A estrutura do projeto foi organizada para promover a modularidade, reutilização de código e colaboração entre as equipes.

### Divisão por Pastas

- **components/**: Contém componentes visuais reutilizáveis.
  - **common/**: Componentes genéricos, como botões, headers e footers, utilizados em diversas partes da aplicação.
  - **imovel/**: Componentes específicos para a tela de anúncio de imóveis, como `ImovelCard` e `ImovelDetails`.
  - **usuario/**: Componentes específicos para a tela de usuário, como `PerfilUsuario` e `FormCadastro`.
- **pages/**: Contém as páginas do Next.js, organizadas por funcionalidade.
  - **imovel/[id].tsx:** Página de detalhes de um imóvel específico.
  - **usuario/perfil.tsx:** Página de perfil do usuário.
- **services/**: Contém os serviços para consumir a API do back-end.
  - **imovelService.ts:** Serviços relacionados a imóveis, como buscar um imóvel por ID.
  - **usuarioService.ts:** Serviços relacionados a usuários, como criar um novo usuário.
- **hooks/**: Contém custom hooks para lógica reutilizável.
- **models/**: Define os modelos de dados que representam as entidades do domínio.
- **utils/**: Contém funções utilitárias, como formatação de datas ou validação de dados.
