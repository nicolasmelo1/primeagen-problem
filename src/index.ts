/* eslint-disable @typescript-eslint/no-explicit-any */
/* eslint-disable @typescript-eslint/no-unused-vars */
const data = [
  ['name', 'ThePrimeagen'],
  ['age', 28],
  [
    'permissions',
    [
      [
        ['name', 'canEdit'],
        ['value', true],
        ['roles', ['admin', 'user']],
      ],
      [
        ['name', 'canDelete'],
        ['value', false],
      ],
    ],
  ],
  ['profiles', ['default', 'secondary-profile']],
];

// Tipos primitivos do javascript
// - String, Number, Boolean, undefined, null, Symbol,

// Como definir um objeto
// - const obj = { name: String, age: Number };

// Como definir um Array
// - const array = [String]

function parse() {
  const result = {};
  for (const [k, v] of data) {
    if (!Array.isArray(v)) {
      result[k] = v;
      continue;
    } else {
      if (Array.isArray(v[0])) {
        result[k] = v.map((item) => {
          const obj = {};
          for (const [key, value] of item) {
            obj[key] = value;
          }
          return obj;
        });
      } else {
        result[k] = v;
      }
    }
  }
  console.log(result);
}
parse();
