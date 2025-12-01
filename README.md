<p align="center">
  <img src="frontend/src/assets/logos/logo-pinacoteca-sp.png" alt="Demonstração" width="500">
</p>

# 
Criamos uma solução para gerenciar as reservas de salas da Pinacoteca. O objetivo é fazer com que os administradores possam ter organização, sem dados duplicados e una plataforma de fácil acesso para os seus clientes.

## Tecnologias utilizadas
- React.js
- Node.js / Express
- Firebase Database

## Configurações das variáveis de ambiente
Antes de inicializar o projeto, é necessário o `.env` e o `reserva-app-2c3ba-firebase-adminsdk-fbsvc-e7f018eb3c.json`
```bash
app-reserva-de-salas/
├── backend/
│ └── src/
│ │ └── config/
│ │ │ └── .env
│ │ │ └── reserva-app-2c3ba-firebase-adminsdk-fbsvc-e7f018eb3c.json
```

## Instalando dependências
1. Primeiro, vamos instalar no Front-end
```bash 
    cd frontend
    npm i
```

2. Agora, vamos instalar no Back-end
```bash
    cd ..
    cd backend
    npm i
    npm i -g firebase-tools
```

## Inicializando o servidor

1. Execute o servidor em cada pasta

Front-End:
```bash 
    npm run dev
```
Back-End:

```bash
    npm start server
```
