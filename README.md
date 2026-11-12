# 🎫 Help Desk API — Sistema de Gerenciamento de Chamados

![Java](https://img.shields.io/badge/Java-21-orange?logo=openjdk)
![Spring Boot](https://img.shields.io/badge/Spring%20Boot-4.1.2-brightgreen?logo=springboot)
![MySQL](https://img.shields.io/badge/MySQL-8.4.11-blue?logo=mysql)
![Status](https://img.shields.io/badge/Status-Em%20Desenvolvimento-yellow)

## 📌 Sobre o Projeto

O **Help Desk API** é um sistema de gerenciamento de chamados desenvolvido com Java e Spring Boot, com o objetivo de simular o funcionamento de uma plataforma de suporte técnico utilizada em ambientes corporativos.

A aplicação permite registrar, consultar, atualizar e excluir chamados, além de acompanhar suas prioridades e seus respectivos status.

O projeto foi desenvolvido com foco na aplicação prática de conceitos de desenvolvimento Backend, construção de APIs REST, integração com banco de dados relacional, validação de dados e comunicação entre Backend e Frontend.

---

## 🎯 Objetivos

- Desenvolver uma API REST utilizando Java e Spring Boot.
- Implementar operações CRUD.
- Integrar a aplicação com banco de dados MySQL.
- Aplicar validações e tratamento de exceções.
- Desenvolver uma interface web integrada à API.
- Praticar conceitos utilizados no desenvolvimento de sistemas corporativos.

---

## 🛠️ Tecnologias Utilizadas

| Tecnologia | Finalidade |
|---|---|
| Java 21 | Linguagem de programação |
| Spring Boot 4.1.2 | Framework Backend |
| Spring Data JPA | Persistência e comunicação com o banco |
| Hibernate | Mapeamento objeto-relacional (ORM) |
| MySQL 8.4.11 | Banco de dados relacional |
| Maven | Gerenciamento de dependências e build |
| HTML5 | Estrutura da interface |
| CSS3 | Estilização da interface |
| JavaScript | Interatividade e comunicação com a API |
| Git | Versionamento de código |
| GitHub | Hospedagem do código-fonte |

---

## ⚙️ Funcionalidades

### 📋 Gerenciamento de Chamados

- Cadastro de novos chamados.
- Listagem de todos os chamados registrados.
- Consulta de chamado por identificador.
- Atualização das informações de um chamado.
- Exclusão de chamados.
- Contabilização do total de chamados cadastrados.

### 🚦 Controle de Prioridade

Cada chamado possui uma das seguintes prioridades:

- **BAIXA**
- **MEDIA**
- **ALTA**

### 📊 Controle de Status

Os chamados possuem três possíveis situações:

- **ABERTO:** chamado recém-registrado.
- **EM_ANDAMENTO:** chamado em atendimento.
- **FECHADO:** chamado finalizado.

### 🛡️ Validação e Tratamento de Erros

- Validação de campos obrigatórios.
- Limitação de caracteres nos campos.
- Tratamento global de exceções.
- Respostas HTTP adequadas para cada operação.
- Retorno de mensagens personalizadas em situações de erro.

---

## 🗄️ Estrutura do Banco de Dados

O projeto utiliza o MySQL com um banco de dados chamado `helpdesk_db`.

A principal entidade da aplicação é `Chamado`, responsável por armazenar as informações dos atendimentos.

### Tabela: chamados

| Campo | Tipo / Característica | Descrição |
|---|---|---|
| id | Identificador | Chave primária |
| titulo | VARCHAR(150) | Título do chamado |
| descricao | TEXT | Descrição do problema |
| categoria | VARCHAR(50) | Categoria do atendimento |
| prioridade | ENUM lógico | BAIXA, MEDIA ou ALTA |
| status | ENUM lógico | ABERTO, EM_ANDAMENTO ou FECHADO |
| data_abertura | Data/Hora | Data de criação do chamado |

---

## 🔗 Endpoints da API REST

A API utiliza o caminho base:

`/api/chamados`

| Método HTTP | Endpoint | Descrição |
|---|---|---|
| GET | `/api/chamados` | Lista todos os chamados |
| GET | `/api/chamados/{id}` | Busca um chamado pelo ID |
| GET | `/api/chamados/total` | Retorna a quantidade de chamados |
| POST | `/api/chamados` | Cadastra um novo chamado |
| PUT | `/api/chamados/{id}` | Atualiza um chamado |
| DELETE | `/api/chamados/{id}` | Exclui um chamado |

### Exemplo de cadastro de chamado

**Requisição POST:**

`/api/chamados`

```json
{
  "titulo": "Problema de conexão com a internet",
  "descricao": "Computador sem acesso à rede corporativa.",
  "categoria": "Infraestrutura",
  "prioridade": "ALTA"
}
```

**Exemplo de resposta:**

```json
{
  "id": 1,
  "titulo": "Problema de conexão com a internet",
  "descricao": "Computador sem acesso à rede corporativa.",
  "categoria": "Infraestrutura",
  "prioridade": "ALTA",
  "status": "ABERTO"
}
```

*Os exemplos representam o formato esperado dos dados da aplicação.*

---

## 🏗️ Arquitetura do Projeto

O projeto utiliza uma organização em camadas, separando as responsabilidades da aplicação.

```text
helpdesk-api/
│
├── src/
│   └── main/
│       ├── java/
│       │   └── com/
│       │       └── helpdesk/
│       │           └── api/
│       │               ├── controller/
│       │               ├── entity/
│       │               ├── repository/
│       │               ├── service/
│       │               └── exception/
│       │
│       └── resources/
│           ├── static/
│           │   ├── index.html
│           │   ├── style.css
│           │   └── script.js
│           │
│           └── application.properties
│
├── pom.xml
└── README.md
```

---

## 🚀 Como Executar o Projeto

### 1. Pré-requisitos

Antes de executar a aplicação, é necessário ter instalado:

- Java JDK 21.
- MySQL 8.4 ou superior.
- Git.
- IDE de sua preferência (Spring Tools, IntelliJ IDEA ou VS Code).

### 2. Clonar o repositório

```bash
git clone https://github.com/wilisitalo-bit/helpdesk-api.git
```

### 3. Criar o banco de dados

Acesse o MySQL e execute:

```sql
CREATE DATABASE helpdesk_db;
```

### 4. Configurar a conexão com o banco

No arquivo `application.properties`, configure as propriedades de conexão:

```properties
spring.datasource.url=jdbc:mysql://localhost:3306/helpdesk_db
spring.datasource.username=${DB_USERNAME:root}
spring.datasource.password=${DB_PASSWORD}

spring.jpa.hibernate.ddl-auto=update
spring.jpa.show-sql=true

server.port=8081
```

Configure as variáveis de ambiente `DB_USERNAME` e `DB_PASSWORD` de acordo com suas credenciais do MySQL.

**Importante:** nunca publique senhas ou credenciais reais no repositório.

### 5. Executar a aplicação

No Windows, utilizando o Maven Wrapper:

```powershell
.\mvnw.cmd spring-boot:run
```

Ou, caso tenha o Maven instalado:

```bash
mvn spring-boot:run
```

### 6. Acessar a aplicação

Após iniciar o servidor, acesse:

**Interface Web:**

http://localhost:8081

**API REST:**

http://localhost:8081/api/chamados

---

## 🧪 Testes e Validações

Durante o desenvolvimento, foram realizados testes manuais para verificar:

- Cadastro e consulta de chamados.
- Atualização e exclusão de registros.
- Funcionamento da integração com MySQL.
- Contabilização de chamados.
- Validação de campos obrigatórios.
- Limites de caracteres.
- Tratamento de erros e respostas HTTP.
- Integração entre a interface web e a API.

---

## 📚 Conhecimentos Aplicados

O desenvolvimento deste projeto proporcionou a aplicação prática dos seguintes conceitos:

- Programação orientada a objetos (POO).
- Desenvolvimento de APIs REST.
- Arquitetura em camadas.
- Operações CRUD.
- Persistência de dados com JPA/Hibernate.
- Modelagem de banco de dados relacional.
- Validação de dados.
- Tratamento global de exceções.
- Integração Backend e Frontend.
- Versionamento de código com Git.

---

## 🔮 Melhorias Futuras

O projeto possui possibilidades de evolução, incluindo:

- Implementação de autenticação com Spring Security.
- Controle de acesso por níveis de usuário.
- Documentação da API com Swagger/OpenAPI.
- Ampliação da cobertura de testes automatizados.
- Melhorias na interface e experiência do usuário.
- Implantação da aplicação em servidor Linux.
- Disponibilização da aplicação em ambiente de produção.

---

## 👨‍💻 Autor

**Wilis Italo**

Estudante de Análise e Desenvolvimento de Sistemas, interessado em desenvolvimento de software e tecnologia.

Atualmente desenvolvendo projetos práticos com Java, Spring Boot, APIs REST e MySQL, buscando aprimorar conhecimentos e construir experiência para atuar profissionalmente na área de Tecnologia da Informação.

🔗 **GitHub:** [@wilisitalo-bit](https://github.com/wilisitalo-bit)

---

⭐ Se este projeto despertou seu interesse, fique à vontade para acompanhar sua evolução!