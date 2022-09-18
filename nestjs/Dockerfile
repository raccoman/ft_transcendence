# Install dependencies only when needed
FROM node:16-alpine AS deps
# Check https://github.com/nodejs/docker-node/tree/b4117f9333da4138b03a546ec926ef50a31506c3#nodealpine to understand why libc6-compat might be needed.
RUN apk add --no-cache libc6-compat
WORKDIR /app

# COPY package.json yarn.lock ./
# RUN yarn install --frozen-lockfile

# If using npm with a `package-lock.json` comment out above and use below instead
COPY package.json package-lock.json ./
COPY prisma ./prisma

RUN npm ci

# Rebuild the source code only when needed
FROM node:16-alpine AS builder
WORKDIR /app
COPY --from=deps /app/node_modules ./node_modules
COPY . .

# RUN yarn build

# If using npm comment out above and use below instead
RUN npm run build
RUN npx prisma generate

# Production image, copy all the files and run next
FROM node:16-alpine AS runner
WORKDIR /app

ENV NODE_ENV production

RUN addgroup --system --gid 1001 nodejs
RUN adduser --system --uid 1001 nestjs

COPY --from=builder --chown=nestjs:nodejs /app/node_modules ./node_modules
COPY --from=builder --chown=nestjs:nodejs /app/dist ./

USER nestjs

CMD ["node", "src/main.js"]