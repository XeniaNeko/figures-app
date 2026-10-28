# Task I: Фигуры (вариант 3 — Овал, вариант 6 — Тетраэдр)

TypeScript, Jest, ESLint (airbnb), pino.

## Запуск

```
npm install --legacy-peer-deps
npm start        # чтение data/*.txt, расчёты, логи в консоль и logs/app.log
npm test         # unit-тесты
npm run lint     # ESLint
```

## Структура

- `src/entities` — Point, Point3D, Shape, Oval, Tetrahedron (только данные)
- `src/validators` — проверка исходных строк и результатов расчётов
- `src/factories` — Factory Method (ShapeFactory, OvalFactory, TetrahedronFactory)
- `src/services` — вычисления и чтение файла
- `src/errors` — пользовательские исключения
- `data` — входные файлы с частично некорректными строками
- `tests` — тесты Jest
