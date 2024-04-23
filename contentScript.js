const SHEET_ID = "1utzeKExPBe9lA5yIoTAQa5ToEsuPyxP-mLTUH4DEaOs";
const SHEET_GID = "138291040";

const url = `https://docs.google.com/spreadsheets/d/${SHEET_ID}/gviz/tq?tqx=out:json&gid=${SHEET_GID}`;

fetch(url)
  .then((response) => response.text())
  .then((data) => {
    let json = data.slice(47, -2);
    let obj = JSON.parse(json);
    let rows = obj.table.rows;
    let spreadsheetVerses = {};

    // start from second row
    for (let i = 1; i < rows.length; i++) {
      let row = rows[i].c;
      let data = row.slice(0, 3).map((cell) => (cell ? cell.v : "")); // Get the data from column 1 to 3
      if (!data[0]) break; // Stop processing if column 1 is empty
      spreadsheetVerses[row[0].v] = row
        .slice(1, 4)
        .map((cell) => (cell ? cell.v : null));
    }

    console.log(spreadsheetVerses);
  })
  .catch((error) => console.error("Error:", error));
