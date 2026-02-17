# Entropia

Project Entropia - Setup and Documentation.

## Cómo correr el repositorio

Prerrequisitos: [Docker](https://docs.docker.com/get-docker/) y [Docker Compose](https://docs.docker.com/compose/install/).

1.  Clonar el repositorio:
    ```bash
    git clone https://github.com/antonymorsas/entropia.git
    cd entropia
    ```

2.  Configurar variables de entorno:
    - **Backend**: Copiar el archivo de ejemplo:
      ```bash
      cp backend/.env.example backend/.env
      ```
    - **Frontend**: Copiar el archivo de ejemplo:
      ```bash
      cp frontend/.env.example frontend/.env
      ```

3.  Levantar los servicios:
    ```bash
    docker compose up --build
    ```

4.  Acceder a la aplicación:
    - **Frontend**: [http://localhost:3000](http://localhost:3000)
    - **Backend Docs**: [http://localhost:8000/docs](http://localhost:8000/docs)
    - **Ollama**: [http://localhost:11434](http://localhost:11434)

5.  **Descargar modelo Gemma (IA)**:
    Una vez que los contenedores estén corriendo, es necesario descargar el modelo `gemma3` dentro del contenedor de Ollama:
    ```bash
    docker exec -it entropia-ollama-1 ollama pull gemma3
    ```

## Notas de Diseño

### Dockerización
Se eligió una arquitectura de microservicios orquestada por Docker Compose para asegurar la reproducibilidad del entorno de desarrollo.
- **Backend**: Python 3.9 slim para mantener la imagen ligera.
- **Frontend**: Node.js Alpine con build simple para desarrollo rápido.
- **Database**: PostgreSQL Alpine para persistencia de datos con bajo consumo de recursos.
- **IA**: Ollama integrado para servir modelos de lenguaje localmente.