import Excel from "exceljs";

const workbook = new Excel.Workbook();
const filePath = "C:/Users/ANKIT/Downloads/download.xlsx";
let output = { row: 0, column: 0 };

async function readexceldata(worksheet, searchtext) {
  worksheet.eachRow((row, rowNumber) => {
    row.eachCell((cell, columnNumber) => {
      if (cell.value === searchtext) {
        console.log(rowNumber, columnNumber);
        output.row = rowNumber;
        output.column = columnNumber;
      }
    });
  });
}

async function getexceldata(searchtext) {
  await workbook.xlsx.readFile(filePath);
  const worksheet = workbook.getWorksheet("Sheet1");
  await readexceldata(worksheet, searchtext);

  const cell = worksheet.getCell(output.row, output.column);
  cell.value = "Samsung";
  await workbook.xlsx.writeFile(filePath);
}

getexceldata("Apple");
