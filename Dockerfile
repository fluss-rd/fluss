# Install dependencies only when needed
FROM node:14-alpine AS deps

RUN apk add --no-cache libc6-compat
WORKDIR /app

COPY package.json ./
COPY yarn.lock ./
COPY packages/shared ./packages/shared
COPY packages/user ./packages/user

RUN yarn install --frozen-lockfile

# Rebuild the source code only when needed
FROM node:alpine AS builder
WORKDIR /app

COPY packages/shared ./packages/shared
COPY packages/user ./packages/user
COPY package.json ./package.json

COPY --from=deps /app/node_modules ./node_modules
COPY --from=deps /app/packages/shared/node_modules ./packages/shared/node_modules
COPY --from=deps /app/packages/user/node_modules ./packages/user/node_modules

ENV NODE_OPTIONS=--openssl-legacy-provider
RUN yarn workspace user build && yarn install --production --ignore-scripts --prefer-offline

# Production image, copy all the files and run next
FROM node:alpine AS runner
WORKDIR /app

ENV NODE_ENV production
ENV mapboxToken pk.eyJ1IjoibWlraGFlbDE3MjkiLCJhIjoiY2ttbGN2Y2M1MTl3YjJ1bjAyZmg0MmU1NCJ9.WiU0fisWQSYwcEs-Ay6ONw

RUN addgroup -g 1001 -S nodejs
RUN adduser -S nextjs -u 1001

COPY --from=builder /app/package.json ./package.json
COPY --from=builder /app/node_modules ./node_modules

COPY --from=builder /app/packages/shared/package.json ./packages/shared/package.json
COPY --from=builder /app/packages/shared/node_modules ./packages/shared/node_modules

COPY --from=builder /app/packages/user/next.config.js ./packages/user/next.config.js
COPY --from=builder /app/packages/user/public ./packages/user/public
COPY --from=builder --chown=nextjs:nodejs /app/packages/user/.next ./packages/user/.next
COPY --from=builder /app/packages/user/package.json ./packages/user/package.json
COPY --from=builder /app/packages/user/node_modules ./packages/user/node_modules

USER nextjs

EXPOSE 3000

CMD ["yarn", "workspace", "user", "start"]