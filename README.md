# Token Managment App

This repository contains two microservices (`key-manage-service` and `token-service`) built with Nest.js.

## Getting Started

### Prerequisites

- Node.js (v14.x or later)
- npm (Node Package Manager)
- Docker (for running the MongoDB container)

### Installation

1. **Clone the Repository:**

   ```bash
   git clone https://github.com/arya0618/Key-Mg.git
   cd Key-Mg

2. Start database server :redis

   ```bash
   cd docker
   docker-compose up -d

3. key-manage-service

   ```bash
   cd key-manage-service
   npm install
   npm run start

3. token-service

   ```bash
   cd token-service
   npm install
   npm run start
