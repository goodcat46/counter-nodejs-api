// const acc = [{ type: 2, category: "A" }];
// const acc1 = [{ type: 55, category: "B" }];
// const acc2 = [{ type: 66, category: "C" }];

// const type = 1;

// function testF(accT, ...arg) {
//   console.log("arguments: ", arguments);
//   console.log(arg[1]);
//   let result;
//   for (const {
//     type: accType,
//     category: accCategories = "accCategories",
//   } of accT) {
//     console.log(1);
//     // If the current type is not included in the acc array, then skip to the next iteration.
//     if (accType !== type) {
//       console.log(2);
//       console.log(accCategories);
//       return (result = "qwe");
//     }

//     console.log(3);
//   }
//   return result;
// }

// console.log("testT: ", testF(acc, acc1, acc2));

// const arr = [0, 1, 2, 3, 4, 5, 6];

// // const newArr = arr.slice(-3);

// // console.table(arr);
// // console.log(newArr);
// // console.table(newArr);

// arr[8] = 8;
// arr.pop();

// console.log("arr[7]: ", arr[7]);

// console.table(arr[7]);
// console.table(arr);
// console.log(arr);

// const str = "sfkjbglssrgbsrgns rvsrbvsrgr!";

// console.log(str);
// console.log(str.slice(0, -1));

// const filterNumbers = function (arr, ...args) {
//   const result = [];

//   for (const number of arr) {
//     // args.includes(number) ? result.push(number) : continue;
//     if (args.includes(number)) {
//       result.push(number);
//     }
//   }
//   return result;
// };

// console.log(filterNumbers([1, 2, 3, 4, 5], 2, 15, 2, 3, 8));
// console.log(filterNumbers([10, 15, 25, 30], 23, 30, 25, 15, 15));
// console.log(filterNumbers([100, 200, 300, 400, 500], 7, 12, 200, 64));

export const orderTableTitles = [
  {
    id: 1,
    title: "Статус замовлення",
    dataKey: "orderStatus",
    action: "status",
    search: true,
    filter: true,
    visible: true,
    width: "155px",
  },
  {
    id: 1,
    title: "Тип замовлення",
    dataKey: "orderType",
    action: "status",
    search: true,
    filter: true,
    visible: true,
    width: "135px",
  },

  {
    id: 1,
    title: "Створено/Оновлено",
    dataKey: "createdAt/updatedAt",
    action: "date",
    search: false,
    filter: true,
    visible: true,
    width: "180px",
  },
  {
    id: 1,
    title: "Менеджер",
    dataKey: "managerName",
    action: "string",
    search: true,
    filter: true,
    visible: true,
    width: "80px",
  },
  {
    id: 1,
    title: "Валюта",
    dataKey: "currency",
    action: "string",
    search: true,
    filter: true,
    visible: true,
    width: "80px",
  },
  {
    id: 1,
    title: "Вартість",
    dataKey: "total",
    action: "string",
    search: true,
    filter: true,
    visible: true,
    width: "80px",
  },
  {
    id: 1,
    title: "Отримувач",
    dataKey: "reciever",
    action: "string",
    search: true,
    filter: true,
    visible: true,
    width: "125px",
  },
  {
    id: 1,
    title: "Замовник",
    dataKey: "customer",
    action: "string",
    search: true,
    filter: true,
    visible: true,
    width: "125px",
  },
  {
    id: 1,
    title: "Інвойси",
    dataKey: "invoices",
    action: "string",
    search: true,
    filter: true,
    visible: true,
    width: "150px",
  },
  {
    id: 1,
    title: "ТТН",
    dataKey: "ttnList",
    action: "string",
    search: true,
    filter: true,
    visible: true,
    width: "150px",
  },
  {
    id: 1,
    title: "Перевізники",
    dataKey: "tranporters",
    action: "string",
    search: true,
    filter: true,
    visible: true,
    width: "125px",
  },
  {
    id: 1,
    title: "Коментар",
    dataKey: "name",
    action: "string",
    search: true,
    filter: true,
    visible: true,
    width: "100px",
  },
];

// table row jsx return

import React from 'react'

const tableRow = () => {
 return (
    <RowContext value={ctxValue}>
      <div className={s.rowContainer} id={row${props.idx}}>
        <RowActions />
        <div style={styles} className={s.row}>
          <div className={[s.rowStickyEl, 'listRow'].join(' ')}>
            <CellActions />

            <CellCheckBox />
          </div>
          {tableTitles.map((title, idx) => {
            let CellComp = CellText;

            if (CellsMap[title.action]) {
              CellComp = CellsMap[title.action];

              return (
                <Cell key={title.name} title={title} idx={idx}>
                  <CellComp title={title} idx={idx} onClick={handleOnRowClick} />
                </Cell>
              );
            }

            CellComp = CellText;
            return (
              <Cell key={title.name} title={title} idx={idx}>
                <CellComp key={title.name} title={title} idx={idx} onClick={handleOnRowClick} />
              </Cell>
            );
          })}
        </div>
      </div>
    </RowContext>
  );
}

export default testFor


 return (
    <RowContext value={ctxValue}>
      <div className={s.rowContainer} id={row${props.idx}}>
        <RowActions />
        <div style={styles} className={s.row}>
          <div className={[s.rowStickyEl, 'listRow'].join(' ')}>
            <CellActions />

            <CellCheckBox />
          </div>
          {tableTitles.map((title, idx) => {
            let CellComp = CellText;

            if (CellsMap[title.action]) {
              CellComp = CellsMap[title.action];

              return (
                <Cell key={title.name} title={title} idx={idx}>
                  <CellComp title={title} idx={idx} onClick={handleOnRowClick} />
                </Cell>
              );
            }

            CellComp = CellText;
            return (
              <Cell key={title.name} title={title} idx={idx}>
                <CellComp key={title.name} title={title} idx={idx} onClick={handleOnRowClick} />
              </Cell>
            );
          })}
        </div>
      </div>
    </RowContext>
  );
