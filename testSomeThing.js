// В цей ⬇️  RESULT
// [
//     {
//         "type": "Бар",
//         "categoty": [
//             "Пиво",
//             "Чай"
//         ]
//     },
//     {
//         "type": "Кухня",
//         "categoty": [
//             "Салати"
//         ],
//     }
// ]

// const { source } = require("./helpers/validateEmail");

// const sourceArray = [
//   {
//     type: "Бар",
//     category: "Пиво",
//     price: 122,
//   },
//   {
//     type: "Бар",
//     category: "Чай",
//     price: 80,
//   },
//   {
//     type: "Кухня",
//     category: "Салати",
//     price: 321,
//   },
//   {
//     type: "Кухня",
//     category: "Салати",
//     price: 555,
//   },
// ];

// function filteredArr(arr) {
//   const result = arr
//     .map((el) => el.type)
//     .filter((el, idx, array) => array.indexOf(el) === idx)
//     .map((el) => ({ type: el, category: [] }));

//   result.forEach((el) => {
//     sourceArray.forEach((sourceEl) => {
//       if (el.category.includes(sourceEl.category)) {
//         return;
//       }
//       if (sourceEl.type === el.type) {
//         el.category.push(sourceEl.category);
//       }
//     });
//   });

//   return result;
// }

// console.log(filteredArr(sourceArray));

//

//

//

//

//

//

//

//

//

//
//  {
//     type: "Бар",
//     category: "Пиво",
//     price: 122,
//   }

//

// function filterArray(array) {
//   const result = array
//     .map(({ type }) => type)
//     .filter(leftOnlyUnique)
//     .map((item) => ({ type: item, categories: [] }));

//   array.forEach(({ type, category }) => {
//     result.forEach((item, index) => {
//       if (item.type === type && !item.categories.includes(category))
//         result[index].categories.push(category);
//     });
//   });

//   return result;
// }

// const leftOnlyUnique = (value, index, self) => self.indexOf(value) === index;

// console.log(filterArray(sourceArray));

//===================================================================
//===================================================================
//===================================================================

const data = [
  {
    type: "Бар",
    category: "Пиво",
    price: 122,
  },
  {
    type: "Бар",
    category: "Чай",
    price: 80,
  },
  {
    type: "Кухня",
    category: "Салати",
    price: 321,
  },
  {
    type: "Кухня",
    category: "Салати",
    price: 555,
  },
  {
    type: "Бар",
    category: "Сік",
    price: 80,
  },
];

const categoriesByType = data.reduce((acc, currentValue) => {
  /**
   * Destructure the necessary values from the current data element object.
   */
  const { type, category } = currentValue;

  /**
   * Iterate through all of the array elements in our acc.
   *
   * Initial reduce function call will skip this part because acc is an empty array.
   */
  for (const { type: accType, category: accCategories } of acc) {
    // If the current type is not included in the acc array, then skip to the next iteration.
    if (accType !== type) {
      continue;
    }

    // If the current category is already included in the acc array, then do not do anything.
    for (const accCategory of accCategories) {
      if (accCategory === category) {
        return acc;
      }
    }

    // Push the current category to the accType.
    accCategories.push(category);

    // Return the acc with the updated type category.
    return acc;
  }

  // Add new element to the acc array with the type and category.
  acc.push({ type, category: [category] });

  // Return the updated acc.
  return acc;
}, []);

console.log(categoriesByType);
// Result:
// [
//   { type: 'Бар', category: ['Пиво', 'Чай'] },
//   { type: 'Кухня', category: ['Салати'] },
// ];

//===================================================================
//===================================================================
//===================================================================

// const newData = [];
//       data.forEach((item) => {
//         if (
//           newData.filter((newitem) => newitem.type === item.type).length > 0
//         ) {
//           if (
//             !newData
//               .find((newitem) => newitem.type === item.type)
//               .category.includes(item.category)
//           ) {
//             newData
//               .find((newitem) => newitem.type === item.type)
//               .category.push(item.category);
//           }
//         } else {
//           newData.push({ type: item.type, category: [item.category] });
//         }
//       });
//       console.log(newData);
// array = initial array

//

//================================

//

// Всем привет, может есть у кого-нибудь умные мысли? Нужно массив объектов по полю name отфильтровать, но так, чтобы в начале отображались те пункты, name которых начинается с ключевого слова query. Напрашивается метод sort(), но он отфильтрует только по алфавиту. Есть вариант через indexOf(query) и там уже по индексам первого вхождения в массив подстрок, составленный из name. Но что-то мне кажется я усложняю реализацию.

// const array = [
//   { name: 'query1' },
//   { name: '2' },
//   { name: '3' },
//   { name: 'query4' },
//   { name: 'query5' },
// ];

// const KEY_WORD = 'query';

// array.sort((first, second) => {
//   const ifFirstWithKeyWord = first.name.startsWith(KEY_WORD);
//   const ifSecondWithKeyWord = second.name.startsWith(KEY_WORD);

//   if (ifFirstWithKeyWord && ifSecondWithKeyWord) {
//     return 0;
//   }

//   if (ifFirstWithKeyWord) {
//     return -1;
//   }

//   return 1;
// });

// =========================================

// [
//   { name: 'query1' },
//   { name: 'query4' },
//   { name: 'query5' },
//   { name: '2' },
//   { name: '3' },
// ];
