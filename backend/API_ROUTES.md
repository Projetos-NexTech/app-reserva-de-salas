# 📋 API Routes - App Reserva de Salas

Base URL: `http://localhost:3000/api`

---

## 👥 USUÁRIOS (`/usuario`)

### 1. Criar Usuário
**POST** `/usuario`

```json
{
  "nome": "João Silva",
  "email": "joao@example.com",
  "senha": "senha123"
}
```

**Response (201):**
```json
{
  "id": "user123",
  "nome": "João Silva",
  "email": "joao@example.com",
  "senha": "$2a$10$hashed...",
  "createdAt": "2025-11-26T10:30:00Z"
}
```

---

### 2. Listar Usuários
**GET** `/usuario`

**Response (200):**
```json
[
  {
    "id": "user123",
    "nome": "João Silva",
    "email": "joao@example.com",
    "createdAt": "2025-11-26T10:30:00Z"
  }
]
```

---

### 3. Obter Usuário por ID
**GET** `/usuario/{id}`

**Response (200):**
```json
{
  "id": "user123",
  "nome": "João Silva",
  "email": "joao@example.com",
  "createdAt": "2025-11-26T10:30:00Z"
}
```

---

### 4. Atualizar Usuário
**PUT** `/usuario/{id}`

```json
{
  "nome": "João Silva Atualizado",
  "email": "newemail@example.com",
  "senha": "novaSenha123"
}
```

**Response (200):**
```json
{
  "id": "user123",
  "nome": "João Silva Atualizado",
  "email": "newemail@example.com",
  "senha": "$2a$10$hashed...",
  "updatedAt": "2025-11-26T11:00:00Z"
}
```

> **Nota:** Se `senha` for fornecida, ela será automaticamente hasheada com bcrypt

---

### 5. Deletar Usuário
**DELETE** `/usuario/{id}`

**Response (200):**
```json
{
  "message": "usuario deletado com sucesso"
}
```

---

### 6. Login de Usuário
**POST** `/usuario/login`

```json
{
  "email": "joao@example.com",
  "senha": "senha123"
}
```

**Response (200):**
```json
{
  "success": true,
  "usuario": {
    "id": "user123",
    "nome": "João Silva",
    "email": "joao@example.com"
  }
}
```

**Response (401):**
```json
{
  "error": "email ou senha inválidos"
}
```

---

### 7. Reset de Senha (por Email)
**POST** `/usuario/reset-password`

```json
{
  "email": "joao@example.com"
}
```

**Response (200):**
```json
{
  "success": true,
  "message": "senha temporária enviada por email"
}
```

> **O que acontece:**
> - Gera uma senha temporária aleatória
> - Faz hash e salva no banco de dados
> - Envia a senha temporária por email

---

### 8. Reset de Senha (Direto)
**POST** `/usuario/reset-password`

```json
{
  "email": "joao@example.com",
  "novaSenha": "novaSenhaForte123"
}
```

**Response (200):**
```json
{
  "message": "senha atualizada com sucesso"
}
```

---

### 9. Sincronizar Usuários com Firebase Auth
**POST** `/usuario/sync-auth`

```json
{
  "sendResetEmail": true
}
```

**Response (200):**
```json
{
  "created": 5,
  "existing": 2,
  "failed": 0,
  "createdEmails": ["user1@example.com", "user2@example.com"],
  "failedEmails": []
}
```

> **Nota:** Define `sendResetEmail: true` para enviar links de reset de senha aos usuários criados

---

## 🏢 SALAS (`/sala`)

### 1. Criar Sala
**POST** `/sala`

```json
{
  "nome": "Sala de Reunião A",
  "capacidade": 20,
  "disponivel": true,
  "localizacao": "Prédio 1, Andar 2"
}
```

**Response (201):**
```json
{
  "id": "sala123",
  "nome": "Sala de Reunião A",
  "capacidade": 20,
  "disponivel": true,
  "localizacao": "Prédio 1, Andar 2",
  "createdAt": "2025-11-26T10:30:00Z"
}
```

---

### 2. Listar Salas
**GET** `/sala`

**Response (200):**
```json
[
  {
    "id": "sala123",
    "nome": "Sala de Reunião A",
    "capacidade": 20,
    "disponivel": true,
    "localizacao": "Prédio 1, Andar 2"
  }
]
```

---

### 3. Obter Sala por ID
**GET** `/sala/{id}`

**Response (200):**
```json
{
  "id": "sala123",
  "nome": "Sala de Reunião A",
  "capacidade": 20,
  "disponivel": true,
  "localizacao": "Prédio 1, Andar 2",
  "createdAt": "2025-11-26T10:30:00Z"
}
```

---

### 4. Atualizar Sala
**PUT** `/sala/{id}`

```json
{
  "nome": "Sala de Reunião A - Auditório",
  "capacidade": 30,
  "disponivel": false,
  "localizacao": "Prédio 1, Andar 3"
}
```

**Response (200):**
```json
{
  "id": "sala123",
  "nome": "Sala de Reunião A - Auditório",
  "capacidade": 30,
  "disponivel": false,
  "localizacao": "Prédio 1, Andar 3",
  "updatedAt": "2025-11-26T11:00:00Z"
}
```

---

### 5. Deletar Sala
**DELETE** `/sala/{id}`

**Response (200):**
```json
{
  "message": "sala deletada com sucesso"
}
```

---

## 📅 RESERVAS (`/reserva`)

### 1. Criar Reserva
**POST** `/reserva`

```json
{
  "usuarioId": "user123",
  "salaId": "sala123",
  "dataReserva": "2025-12-01",
  "horarioInicio": "14:00",
  "horarioFim": "15:30"
}
```

**Response (201):**
```json
{
  "id": "reserva123",
  "usuarioId": "user123",
  "salaId": "sala123",
  "dataReserva": "2025-12-01",
  "horarioInicio": "14:00",
  "horarioFim": "15:30",
  "status": "confirmed",
  "createdAt": "2025-11-26T10:30:00Z"
}
```

> **O que acontece:**
> - Valida se usuário e sala existem
> - Verifica conflitos de horário
> - Cria a reserva
> - Envia email de confirmação automaticamente

---

### 2. Listar Reservas
**GET** `/reserva`

**Query Parameters (opcionais):**
- `usuarioId` - Filtrar por usuário
- `salaId` - Filtrar por sala
- `dataReserva` - Filtrar por data (formato: YYYY-MM-DD)

**Exemplos:**
```
GET /reserva
GET /reserva?usuarioId=user123
GET /reserva?salaId=sala123
GET /reserva?dataReserva=2025-12-01
GET /reserva?usuarioId=user123&salaId=sala123
```

**Response (200):**
```json
[
  {
    "id": "reserva123",
    "usuarioId": "user123",
    "salaId": "sala123",
    "dataReserva": "2025-12-01",
    "horarioInicio": "14:00",
    "horarioFim": "15:30",
    "status": "confirmed",
    "createdAt": "2025-11-26T10:30:00Z"
  }
]
```

---

### 3. Obter Reserva por ID
**GET** `/reserva/{id}`

**Response (200):**
```json
{
  "id": "reserva123",
  "usuarioId": "user123",
  "salaId": "sala123",
  "dataReserva": "2025-12-01",
  "horarioInicio": "14:00",
  "horarioFim": "15:30",
  "status": "confirmed",
  "createdAt": "2025-11-26T10:30:00Z"
}
```

---

### 4. Atualizar Reserva
**PUT** `/reserva/{id}`

```json
{
  "dataReserva": "2025-12-02",
  "horarioInicio": "15:00",
  "horarioFim": "16:00",
  "status": "confirmed"
}
```

**Response (200):**
```json
{
  "id": "reserva123",
  "usuarioId": "user123",
  "salaId": "sala123",
  "dataReserva": "2025-12-02",
  "horarioInicio": "15:00",
  "horarioFim": "16:00",
  "status": "confirmed",
  "updatedAt": "2025-11-26T11:00:00Z"
}
```

---

### 5. Deletar Reserva
**DELETE** `/reserva/{id}`

**Response (200):**
```json
{
  "message": "reserva deletada com sucesso"
}
```

---

## 🔐 ADMIN (`/admin`)

### 1. Criar Admin
**POST** `/admin`

```json
{
  "nome": "Admin Principal",
  "email": "admin@example.com",
  "senha": "senhaSegura123"
}
```

**Response (201):**
```json
{
  "id": "admin123",
  "nome": "Admin Principal",
  "email": "admin@example.com",
  "senha": "$2a$10$hashed...",
  "createdAt": "2025-11-26T10:30:00Z"
}
```

---

### 2. Obter Admin por ID
**GET** `/admin/{id}`

**Response (200):**
```json
{
  "id": "admin123",
  "nome": "Admin Principal",
  "email": "admin@example.com",
  "createdAt": "2025-11-26T10:30:00Z"
}
```

---

### 3. Login de Admin
**POST** `/admin/login`

```json
{
  "email": "admin@example.com",
  "senha": "senhaSegura123"
}
```

**Response (200):**
```json
{
  "success": true,
  "admin": {
    "id": "admin123",
    "nome": "Admin Principal",
    "email": "admin@example.com"
  }
}
```

---

### 4. Reset de Senha (Admin)
**POST** `/admin/reset-password`

```json
{
  "email": "admin@example.com",
  "novaSenha": "novaSenhaAdmin123"
}
```

**Response (200):**
```json
{
  "message": "senha atualizada com sucesso"
}
```

---

## 🏥 Health Check

### Status da API
**GET** `/`

**Response (200):**
```json
{
  "ok": true,
  "timestamp": "2025-11-26T10:30:00.000Z"
}
```

---

## 📝 Notas Importantes

### 1. **Validações de Senha**
- Mínimo 6 caracteres
- Automaticamente hasheada com bcrypt (10 rounds)

### 2. **Email**
- Enviado automaticamente ao criar reserva
- Sent via nodemailer com SMTP Gmail
- Requer configuração em `.env`

### 3. **Status de Reserva**
- `pending` - Aguardando confirmação
- `confirmed` - Confirmada
- `cancelled` - Cancelada
- `modified` - Modificada

### 4. **Conflitos de Horário**
- O sistema verifica automaticamente conflitos ao criar/atualizar reservas
- Mesma sala, mesma data, horários sobrepostos = erro 409

### 5. **Disponibilidade de Sala**
- Uma sala indisponível (`disponivel: false`) não pode ter novas reservas
- Retorna erro 400 ao tentar reservar

---

## 🧪 Exemplos de Teste no Postman

### Fluxo Completo

#### 1. Criar Usuário
```
POST http://localhost:3000/api/usuario
Body: {
  "nome": "João Silva",
  "email": "joao@example.com",
  "senha": "senha123"
}
```

#### 2. Criar Sala
```
POST http://localhost:3000/api/sala
Body: {
  "nome": "Sala A",
  "capacidade": 20,
  "disponivel": true,
  "localizacao": "Prédio 1"
}
```

#### 3. Login
```
POST http://localhost:3000/api/usuario/login
Body: {
  "email": "joao@example.com",
  "senha": "senha123"
}
```

#### 4. Criar Reserva
```
POST http://localhost:3000/api/reserva
Body: {
  "usuarioId": "{{userId}}",
  "salaId": "{{salaId}}",
  "dataReserva": "2025-12-01",
  "horarioInicio": "14:00",
  "horarioFim": "15:30"
}
```

#### 5. Listar Reservas
```
GET http://localhost:3000/api/reserva?usuarioId={{userId}}
```

---

## ❌ Erros Comuns

| Código | Mensagem | Causa |
|--------|----------|-------|
| 400 | `email é obrigatório` | Email não foi fornecido |
| 400 | `senha deve ter no mínimo 6 caracteres` | Senha muito curta |
| 404 | `usuario não encontrado` | ID de usuário inválido |
| 404 | `sala não encontrada` | ID de sala inválido |
| 409 | `horário conflitante` | Reserva sobrepõe outro horário |
| 400 | `sala indisponível` | Sala marcada como indisponível |
| 401 | `email ou senha inválidos` | Credenciais incorretas |
| 500 | `erro interno` | Erro no servidor |

---

**Última atualização:** 26 de Novembro de 2025
