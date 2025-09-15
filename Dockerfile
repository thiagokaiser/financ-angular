# ----------------------
# Etapa 1: Build Angular
# ----------------------
FROM node:24.8.0-alpine AS build
WORKDIR /app

# Copia apenas os arquivos de dependências primeiro para otimizar cache
COPY package*.json ./

# Instala dependências de forma reprodutível
RUN npm ci

# Copia o restante do código
COPY . .

# Faz o build de produção (seu script já usa --configuration=production)
RUN npm run build

# ----------------------
# Etapa 2: Servir via Nginx
# ----------------------
FROM nginx:alpine

# Remove a configuração padrão do nginx
RUN rm /etc/nginx/conf.d/default.conf

# Copia sua configuração customizada (a que você já mostrou que funciona)
COPY ./nginx.conf /etc/nginx/conf.d/default.conf

# ATENÇÃO: Ajuste no caminho de saída
# O Angular 20 gera a build em: dist/financ-angular/browser/
COPY --from=build /app/dist/financ-angular/browser /usr/share/nginx/html

# (Opcional) expor a porta - pode deixar, mesmo usando docker-compose
EXPOSE 80

# Comando padrão para iniciar o Nginx
CMD ["nginx", "-g", "daemon off;"]
