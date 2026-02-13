# Quiz Builder

TypeScript full-stack quiz builder.

## Project structure

```text
quiz-builder/
├── backend/
│   ├── data/
│   │   └── quiz-builder.sqlite
│   ├── src/
│   │   ├── app.ts
│   │   ├── db.ts
│   │   ├── server.ts
│   │   └── types.ts
│   ├── package.json
│   └── tsconfig.json
├── frontend/
│   ├── src/
│   │   ├── components/
│   │   ├── pages/
│   │   ├── services/
│   │   ├── types/
│   │   ├── App.tsx
│   │   ├── main.tsx
│   │   └── styles.css
│   ├── index.html
│   ├── package.json
│   ├── tsconfig.json
│   └── vite.config.ts
└── README.md
```

## Run locally

```bash
npm run install:all
npm run build
npm start
```

App runs on `http://localhost:9090`.

### Development

```bash
npm run dev:backend
npm run dev:frontend
```

## API endpoints

- `POST /api/quizzes` — create quiz
- `GET /api/quizzes` — list quizzes (title + questions count)
- `GET /api/quizzes/:id` — quiz details with all questions
- `DELETE /api/quizzes/:id` — delete quiz

## Frontend routes

- `/create` — quiz creation page
- `/quizzes` — quiz list page
- `/quizzes/:id` — quiz detail page (read-only)

## Environment

Use `.env` for backend config. Example:

```bash
PORT=9090
API_BASE_URL=http://localhost:9090
SQLITE_PATH=./backend/data/quiz-builder.sqlite
```

`.env` is ignored and must not be committed.
