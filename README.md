# Task I: Shapes (variant 3 - Oval, variant 6 - Tetrahedron)

TypeScript, Jest, ESLint (airbnb), pino.

## Run

```
npm install --legacy-peer-deps
npm start        # reads data/*.txt, calculates, logs to console and logs/app.log
npm test         # unit tests
npm run lint     # ESLint
```

## Structure

- `src/entities` - Point, Point3D, Shape, Oval, Tetrahedron (data only)
- `src/validators` - validation of input lines and calculation results
- `src/factories` - Factory Method (ShapeFactory, OvalFactory, TetrahedronFactory)
- `src/services` - calculations and file reading
- `src/errors` - custom exceptions
- `data` - input files with partly invalid lines
- `tests` - Jest tests
