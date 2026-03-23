FROM node:20-alpine
WORKDIR /app
COPY package*.json ./
RUN npm ci --production
COPY dist/ ./dist/
ENV MCP_TRANSPORT=http
ENV MCP_PORT=3010
EXPOSE 3010
CMD ["node", "dist/index.js"]
