# FROM node:20.2.0-alpine
FROM node:18-alpine

WORKDIR /app

# # Install dependencies based on the preferred package manager
COPY package.json yarn.lock* package-lock.json* pnpm-lock.yaml* ./


RUN \
    if [ -f yarn.lock ]; then \
    yarn --frozen-lockfile && yarn cache clean; \
    elif [ -f package-lock.json ]; then \
    npm ci && npm cache clean --force; \
    elif [ -f pnpm-lock.yaml ]; then \
    yarn global add pnpm && pnpm i; \
    else \
    echo "Warning: Lockfile not found. It is recommended to commit lockfiles to version control." && \
    yarn install && yarn cache clean; \
    fi


COPY src ./src
COPY public ./public
COPY next.config.js .
COPY tsconfig.json .
COPY .eslintignore .
COPY .eslintrc.js .
# COPY .gitignore .
COPY .hintrc .
# COPY .husky .
COPY .prettierignore .
COPY .prettierrc .
COPY .storybook .
COPY jest.config.js .
COPY lint-staged.config.js .
COPY next-env.d.ts .
COPY next.config.js .
COPY postcss.config.js .
COPY tailwind.config.js .

# Next.js collects completely anonymous telemetry data about general usage. Learn more here: https://nextjs.org/telemetry
# Uncomment the following line to disable telemetry at run time
ENV NEXT_TELEMETRY_DISABLED 1

# Note: Don't expose ports here, Compose will handle that for us

# Start Next.js in development mode based on the preferred package manager
CMD \
    if [ -f yarn.lock ]; then yarn dev; \
    elif [ -f package-lock.json ]; then npm run dev; \
    elif [ -f pnpm-lock.yaml ]; then pnpm dev; \
    else yarn dev; \
    fi

# Path: media-fe/dev.Dockerfile
# /Users/mshittu/programming-projects/javascript/react/media-fe/dev.Dockerfile