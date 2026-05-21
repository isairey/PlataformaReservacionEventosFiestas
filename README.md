<div align="center">

<img width="220" src="https://cdn-icons-png.flaticon.com/512/3652/3652191.png" />

# 🎉 Party Booking System

### Plataforma moderna para reservación de eventos, venues y fiestas ⚡

<p align="center">
  <b>Party Booking System</b> es una aplicación web empresarial diseñada para gestionar reservaciones de eventos, venues y servicios de fiestas mediante una arquitectura full stack segura, escalable y moderna.
</p>

<p align="center">
  <img src="https://img.shields.io/badge/Node.js-Backend-339933?style=for-the-badge&logo=node.js&logoColor=white">
  <img src="https://img.shields.io/badge/Express-Framework-000000?style=for-the-badge&logo=express&logoColor=white">
  <img src="https://img.shields.io/badge/MySQL-Database-4479A1?style=for-the-badge&logo=mysql&logoColor=white">
  <img src="https://img.shields.io/badge/Stripe-Payments-635BFF?style=for-the-badge&logo=stripe&logoColor=white">
</p>

<p align="center">
  <a href="#-acerca-del-proyecto">Acerca</a> •
  <a href="#-características">Características</a> •
  <a href="#-tecnologías-utilizadas">Tecnologías</a> •
  <a href="#-instalación">Instalación</a> •
  <a href="#-vista-previa">Vista previa</a>
</p>

</div>

---

# 🎉 Acerca del proyecto

**Party Booking System** es una plataforma desarrollada para simplificar la administración de reservaciones de fiestas y eventos, ofreciendo herramientas modernas para usuarios, administradores y propietarios de venues.

El sistema fue desarrollado para:

- 🏛️ Gestionar venues y espacios
- 📅 Administrar reservaciones
- 💳 Procesar pagos seguros
- 👥 Gestionar usuarios y roles
- 📊 Controlar operaciones empresariales
- ⚡ Automatizar procesos administrativos
- 🌐 Ofrecer una experiencia moderna y escalable

La plataforma utiliza una arquitectura híbrida con MySQL y MongoDB para maximizar rendimiento, flexibilidad y consistencia de datos.

---

# ✨ Características

## 🏛️ Gestión de venues

- 🏢 Administración de espacios
- 📋 Gestión de disponibilidad
- 📅 Calendario de reservaciones
- ⚡ Seguimiento operativo
- 📊 Estado de venues

---

## 📅 Sistema de reservaciones

- 📆 Reservas dinámicas
- ⚡ Confirmaciones automáticas
- 🚫 Prevención de conflictos
- 📋 Historial de reservaciones
- 🧾 Gestión de eventos

---

## 👥 Gestión de usuarios

- 👑 Roles administrativos
- 👤 Gestión de clientes
- 🏛️ Administración de owners
- 🔐 Acceso seguro
- ⚡ Control de permisos

---

## 💳 Integración de pagos

- 💰 Procesamiento con Stripe
- 🔒 Transacciones seguras
- 📊 Seguimiento financiero
- 🧾 Confirmaciones de pago
- ⚡ Gestión automática

---

## 📊 Dashboard empresarial

- 📈 Estadísticas operativas
- 📅 Reservaciones activas
- 💰 Reportes financieros
- 👥 Actividad de usuarios
- ⚡ Panel administrativo

---

## 🔐 Seguridad avanzada

- 🔒 Hashing con bcrypt
- ⚡ Validación de datos
- 🛡️ Protección de accesos
- 📋 Seguridad de transacciones
- 🌐 Arquitectura segura

---

# 👨‍💻 Módulos del sistema

## 🏛️ Venue Management Module

Sistema de administración de espacios.

### Funcionalidades:

- 🏢 Gestión de venues
- 📅 Disponibilidad dinámica
- 📋 Configuración de espacios
- ⚡ Administración operativa
- 📊 Seguimiento de actividad

---

## 📅 Booking Management Module

Gestión de reservaciones y eventos.

### Funcionalidades:

- 📆 Reservaciones
- ⚡ Confirmaciones
- 🚫 Prevención de conflictos
- 🧾 Gestión de eventos
- 📋 Historial operativo

---

## 👥 User & Role Module

Sistema de usuarios y permisos.

### Funcionalidades:

- 👑 Administración de roles
- 👤 Gestión de clientes
- 🔐 Seguridad de acceso
- ⚡ Control administrativo
- 📊 Gestión de actividad

---

## 💳 Payment Processing Module

Módulo financiero y pagos.

### Funcionalidades:

- 💰 Integración Stripe
- 🔒 Transacciones seguras
- 📈 Seguimiento financiero
- ⚡ Confirmaciones automáticas
- 🧾 Historial de pagos

---

## 📊 Analytics & Reports Module

Módulo analítico empresarial.

### Funcionalidades:

- 📈 Estadísticas
- 📊 KPIs operativos
- 💰 Reportes financieros
- 📅 Seguimiento de reservas
- 📄 Exportación de datos

---

# 🛠️ Tecnologías utilizadas

## ⚙️ Backend

<p>
  <img src="https://skillicons.dev/icons?i=nodejs,express,ts" />
</p>

- Node.js
- Express.js
- TypeScript
- APIs REST
- Arquitectura modular

---

## 🗄️ Base de datos

<p>
  <img src="https://skillicons.dev/icons?i=mysql,mongodb" />
</p>

- MySQL
- MongoDB
- Sequelize ORM
- Mongoose ODM
- Gestión híbrida de datos

---

## 🔐 Seguridad

<p>
  <img src="https://skillicons.dev/icons?i=nodejs" />
</p>

- bcrypt
- express-validator
- Validación de entradas
- Seguridad de autenticación
- Protección de transacciones

---

## 💳 Integraciones

<p>
  <img src="https://skillicons.dev/icons?i=stripe" />
</p>

- Stripe Payment Gateway
- Pagos seguros
- Confirmaciones automáticas
- Gestión financiera
- Procesamiento online

---

## 🧰 Herramientas

<p>
  <img src="https://skillicons.dev/icons?i=git,github,vscode,postman,npm" />
</p>

- Git
- GitHub
- VS Code
- Postman
- npm

---

# 📂 Estructura del proyecto

```bash
PlataformaReservacionEventosFiestas/
│
├── src/
│   ├── controllers/
│   ├── routes/
│   ├── models/
│   ├── middleware/
│   ├── services/
│   ├── validators/
│   └── config/
│
├── database/
│   ├── mysql/
│   └── mongodb/
│
├── docs/
├── package.json
├── tsconfig.json
├── README.md
└── LICENSE
```

---

# 🏗️ Arquitectura del sistema

## ⚡ Arquitectura empresarial

```text
Cliente → API REST → Express Backend → MySQL/MongoDB → Stripe
```

---

## 🔄 Flujo del sistema

```text
Usuario → Venue → Reservación → Pago → Confirmación → Gestión
```

---

# 📊 Funcionalidades principales

## 🏛️ Venues

- Gestión de espacios
- Disponibilidad dinámica
- Configuración operativa
- Administración empresarial

---

## 📅 Reservaciones

- Reservas inteligentes
- Prevención de conflictos
- Confirmaciones automáticas
- Historial de eventos

---

## 💳 Pagos

- Integración Stripe
- Transacciones seguras
- Gestión financiera
- Seguimiento administrativo

---

## 📈 Administración

- Dashboard analítico
- Gestión de usuarios
- Reportes operativos
- KPIs empresariales

---

# 🔐 Seguridad

## 🛡️ Protección del sistema

- 🔒 bcrypt hashing
- ⚡ Validación de datos
- 🛡️ Seguridad de roles
- 🚫 Restricción de accesos
- 📋 Protección de APIs
- 🔐 Transacciones seguras

---

# ⚡ Instalación

## 📋 Requisitos

- Node.js
- npm
- MySQL
- MongoDB
- Stripe Account
- Postman

---

# 🚀 Configuración del proyecto

## 1️⃣ Clonar repositorio

```bash
git clone https://github.com/isairey/PlataformaReservacionEventosFiestas.git
```

---

## 2️⃣ Entrar al proyecto

```bash
cd PlataformaReservacionEventosFiestas
```

---

## 3️⃣ Instalar dependencias

```bash
npm install
```

---

## 4️⃣ Configurar variables de entorno

```env
MYSQL_HOST=
MYSQL_USER=
MYSQL_PASSWORD=
MYSQL_DATABASE=

MONGO_URI=

STRIPE_SECRET_KEY=
JWT_SECRET=
```

---

## 5️⃣ Ejecutar servidor

```bash
npm run dev
```

---

## 6️⃣ Abrir aplicación

```bash
http://localhost:3000
```

---

# 📡 Documentación API

## 📘 Postman Documentation

Documentación completa de endpoints y flujo del sistema:

```text
https://documenter.getpostman.com/view/36174729/2sAY4uBNZF
```

---

# 📸 Vista previa

## 🖥️ Interfaces del sistema

<div align="center">

### 📊 Dashboard administrativo
![Dashboard](https://images.unsplash.com/photo-1551288049-bebda4e38f71?q=80&w=1200)

### 🎉 Gestión de eventos
![Events](https://images.unsplash.com/photo-1511578314322-379afb476865?q=80&w=1200)

### 🏛️ Reservación de venues
![Venues](https://images.unsplash.com/photo-1497366754035-f200968a6e72?q=80&w=1200)

### 💳 Pagos y transacciones
![Payments](https://images.unsplash.com/photo-1556740749-887f6717d7e4?q=80&w=1200)

</div>

---

# 👥 Roles del sistema

| Rol | Nivel |
|---|---|
| 👑 Admin | Acceso completo |
| 🏛️ Owner | Gestión de venues |
| 👤 User | Reservaciones |
| 📊 Analyst | Reportes |
| ⚡ System | Automatización |

---

# 🧠 Objetivos del proyecto

## 🎯 Aprendizaje y arquitectura

- Desarrollo Full Stack
- APIs REST
- Arquitectura empresarial
- Gestión de reservaciones
- Sistemas híbridos de bases de datos
- Integración Stripe
- Plataformas escalables

---

# 🚧 Roadmap

## 🔮 Próximas mejoras

- 📱 Aplicación móvil
- ☁️ Cloud deployment
- 🔔 Notificaciones push
- 🤖 IA para recomendaciones
- 📊 Dashboard avanzado
- 🌐 Multi-language support
- 📡 WebSockets en tiempo real

---

# 🤝 Contribuciones

Las contribuciones son bienvenidas ❤️

## Cómo contribuir

1. Fork del proyecto

```bash
git checkout -b feature/nueva-funcionalidad
```

2. Commit

```bash
git commit -m "✨ Nueva funcionalidad"
```

3. Push

```bash
git push origin feature/nueva-funcionalidad
```

4. Pull Request 🚀

---

# 👨‍💻 Desarrollador

<div align="center">

## Isai Reyes - Full Stack Developer

Desarrollador apasionado por plataformas empresariales, APIs modernas y sistemas escalables 🚀

</div>

---

# 🌟 Apoya el proyecto

⭐ Dale una estrella  
🍴 Haz fork  
📢 Comparte el proyecto

---

# 📜 Licencia

Proyecto open source orientado al aprendizaje de desarrollo full stack, sistemas de reservaciones y arquitecturas modernas empresariales.

---

<div align="center">

### 🎉 Party Booking System — gestión inteligente de eventos y reservaciones ⚡

</div>
