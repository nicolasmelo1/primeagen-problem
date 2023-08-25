const data = [
  ["name", "ThePrimeagen"],
  ["age", 28],
  [
    "permissions",
    [
      [
        ["name", "canEdit"],
        ["value", true],
      ],
      [
        ["name", "canDelete"],
        ["value", false],
      ],
    ],
  ],
  ["profiles", ["default", "secondary-profile"]],
];

// Tipos primitivos do javascript
// - String, Number, Boolean, undefined, null, Symbol,

// Como definir um objeto
// - const obj = { name: String, age: Number };

// Como definir um Array
// - const array = [String]

const schema = {
  name: String,
  age: Number,
  permissions: [
    {
      name: String,
      value: Boolean,
    },
  ],
  profile: [String],
};

function validateAndParse(data: Array<any>, schema: any) {
  //const result: any = {};
  //const firstDataToParse = data.shift();
  let returnResult = undefined as any;
  const dataToParseArray = [
    {
      toParse: data,
      toAppend: undefined as any,
      currentSchema: schema,
      nextDataToParse: data,
    },
  ];

  while (dataToParseArray.length > 0) {
    const currentData = dataToParseArray.shift();
    if (currentData) {
      const { toParse, toAppend, currentSchema, nextDataToParse } = currentData;

      // Is an object
      if (Array.isArray(toParse) && Array.isArray(toParse[0])) {
        const result = {};

        if (returnResult === undefined) returnResult = result;
        if (Array.isArray(toAppend)) toAppend.push(result);
        const shiftedToParse = toParse.shift();

        dataToParseArray.push({
          toParse: shiftedToParse,
          toAppend: result,
          currentSchema: currentSchema,
          nextDataToParse: toParse,
        });
        // Is not an object
      } else {
        const [name, value] = toParse;

        const existNameInSchema = currentSchema[name] !== undefined;
        if (existNameInSchema) {
          if (currentSchema[name] === String && typeof value === "string")
            toAppend[name] = value;
          else if (currentSchema[name] === Number && typeof value === "number")
            toAppend[name] = value;
          else if (
            currentSchema[name] === Boolean &&
            typeof value === "boolean"
          )
            toAppend[name] = value;
          else if (Array.isArray(currentSchema[name])) {
            console.log(name);
            const newSchema = currentSchema[name][0];
            const newArray = [];
            toAppend[name] = newArray;

            for (const item of value) {
              dataToParseArray.push({
                toParse: item,
                toAppend: newArray,
                currentSchema: newSchema,
                nextDataToParse: [],
              });
            }
          }
        }

        if (nextDataToParse.length > 0) {
          dataToParseArray.push({
            toParse: nextDataToParse.shift(),
            toAppend: toAppend,
            currentSchema: currentSchema,
            nextDataToParse: nextDataToParse,
          });
        }
      }
    }
  }
  console.log(returnResult);
}

validateAndParse(data, schema);
