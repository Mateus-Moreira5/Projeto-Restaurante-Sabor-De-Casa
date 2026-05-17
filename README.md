# 🍽️ Sabor de Casa — Sistema de Pedidos Online

Sistema completo de pedidos online para restaurante, desenvolvido como projeto acadêmico no curso de Engenharia de Software no iCEV (Teresina - PI).

🔗 **[Frontend ao vivo](https://projeto-restaurante-sabor-de-casa.vercel.app)** · **[API em produção](https://projeto-restaurante-sabor-de-casa-production.up.railway.app/scalar)**

---

## 📋 Sobre o Projeto

O Sabor de Casa é um restaurante focado em comida caseira e ingredientes frescos da região. Este sistema foi desenvolvido para digitalizar o processo de pedidos, oferecendo dois fluxos principais:

- **Cliente** — acessa o cardápio, escolhe os pratos, personaliza e realiza o pedido com entrega ou retirada
- **Administrador** — gerencia o cardápio (criar, editar, remover pratos) e acompanha os pedidos em tempo real

---

## 🚀 Tecnologias

### Backend
![C#](https://img.shields.io/badge/C%23-239120?style=flat&logo=csharp&logoColor=white)
![ASP.NET Core](https://img.shields.io/badge/ASP.NET_Core-512BD4?style=flat&logo=dotnet&logoColor=white)
![Entity Framework](https://img.shields.io/badge/Entity_Framework_Core-512BD4?style=flat&logo=dotnet&logoColor=white)
![PostgreSQL](https://img.shields.io/badge/PostgreSQL-316192?style=flat&logo=postgresql&logoColor=white)

### Infraestrutura
![Railway](https://img.shields.io/badge/Railway-0B0D0E?style=flat&logo=railway&logoColor=white)
![Supabase](https://img.shields.io/badge/Supabase-3ECF8E?style=flat&logo=supabase&logoColor=white)
![Vercel](https://img.shields.io/badge/Vercel-000000?style=flat&logo=vercel&logoColor=white)

### Frontend
![HTML5](https://img.shields.io/badge/HTML5-E34F26?style=flat&logo=html5&logoColor=white)
![CSS3](https://img.shields.io/badge/CSS3-1572B6?style=flat&logo=css3&logoColor=white)
![JavaScript](https://img.shields.io/badge/JavaScript-F7DF1E?style=flat&logo=javascript&logoColor=black)

---

## 🏗️ Arquitetura

O backend segue uma arquitetura em camadas com separação clara de responsabilidades:

```
Controllers  →  recebe as requisições HTTP
Services     →  aplica a regra de negócio
Repositories →  acessa o banco de dados
```

```
API/
├── Controllers/          # Endpoints da API
├── Services/             # Lógica de negócio
│   └── Interfaces/
├── Repository/           # Acesso ao banco de dados
│   └── Interfaces/
├── Models/               # Entidades do banco
├── DTOs/                 # Objetos de transferência de dados
├── Data/                 # DbContext e Configurations
│   └── Configurations/
├── Validators/           # Validações com FluentValidation
├── Middlewares/          # Tratamento global de exceções
└── Exceptions/           # Exceções customizadas

Front-End/
├── index.html            # Página inicial
├── cardapio.html         # Cardápio interativo
├── pedido.html           # Formulário de pedido
├── sobre.html            # Página institucional
└── admin.html            # Painel administrativo
```

---

## 🗄️ Banco de Dados

```
Prato               → cadastro dos pratos do cardápio
FormularioPedido    → dados do cliente e entrega
Pedido              → itens do pedido (prato + quantidade + personalização)
UsuarioAdm          → administradores do sistema
```

---

## 📡 Endpoints da API

### Autenticação
| Método | Rota | Descrição |
|--------|------|-----------|
| POST | `/api/auth/registrar` | Registrar administrador |
| POST | `/api/auth/login` | Login e obter token JWT |

### Pratos
| Método | Rota | Auth | Descrição |
|--------|------|------|-----------|
| GET | `/api/pratos` | ❌ | Listar todos os pratos |
| GET | `/api/pratos/{id}` | ❌ | Buscar prato por ID |
| POST | `/api/pratos` | ✅ | Criar novo prato |
| PUT | `/api/pratos/{id}` | ✅ | Atualizar prato |
| DELETE | `/api/pratos/{id}` | ✅ | Deletar prato |

### Pedidos
| Método | Rota | Auth | Descrição |
|--------|------|------|-----------|
| POST | `/api/pedidos` | ❌ | Realizar pedido completo |
| GET | `/api/pedidos` | ✅ | Listar todos os pedidos |
| GET | `/api/pedidos/{id}` | ✅ | Buscar pedido por ID |
| DELETE | `/api/pedidos/{id}` | ✅ | Deletar pedido |

### CEP
| Método | Rota | Descrição |
|--------|------|-----------|
| GET | `/api/cep/{cep}` | Buscar endereço pelo CEP (ViaCEP) |

---

## ⚙️ Como rodar localmente

### Pré-requisitos
- [.NET 10 SDK](https://dotnet.microsoft.com/download)
- [PostgreSQL](https://www.postgresql.org/download/)

### Backend

```bash
# Clone o repositório
git clone https://github.com/Mateus-Moreira5/Projeto-Restaurante-Sabor-De-Casa.git

# Entre na pasta da API
cd Projeto-Restaurante-Sabor-De-Casa/API

# Configure a connection string no appsettings.json
# "DefaultConnection": "Host=localhost;Port=5432;Database=sabor_de_casa;Username=postgres;Password=sua_senha"

# Aplique as migrations
dotnet ef database update

# Rode a aplicação
dotnet run
```

A API estará disponível em `http://localhost:8080` com documentação em `http://localhost:8080/scalar`.

### Frontend

Abra o arquivo `Front-End/index.html` diretamente no navegador ou use um servidor local:

```bash
cd Front-End
npx serve .
```

---

## 🔐 Variáveis de Ambiente

Configure as seguintes variáveis no ambiente de produção:

```
ConnectionStrings__DefaultConnection=sua_connection_string
Jwt__Key=sua_chave_secreta
Jwt__Issuer=SaborDeCasaAPI
Jwt__Audience=SaborDeCasaCliente
Jwt__ExpiracaoHoras=8
```

---

## 👨‍💻 Autores

- Mateus Moreira Fernandes.
- João Guilherme Ribeiro Rocha da Cunha.
- Ian Brito Ribeiro de Castro.
- Caio Vitor Campelo Alcântara.
