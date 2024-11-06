FROM mcr.microsoft.com/devcontainers/universal:2-linux

# Install MariaDB client
RUN apt-get update && export DEBIAN_FRONTEND=noninteractive \
	&& apt-get install -y mariadb-client \ 
	&& apt-get clean -y && rm -rf /var/lib/apt/lists/*

