import Controller from "@ember/controller";
import TableFileRow from "../models/table-file-row";
import { action } from "@ember/object";

const TableColumnsConfig = [
  {
    dataKey: "isSelected",
    customStyle: "width: 60px;",
    text: "",
    component: "custom-table/custom-table-checkbox",
  },
  {
    dataKey: "name",
    customStyle: "width: 120px;",
    text: "Name",
    component: "custom-table/custom-table-text",
  },
  {
    dataKey: "device",
    customStyle: "width: 120px;",
    text: "Device",
    component: "custom-table/custom-table-text",
  },
  {
    dataKey: "path",
    text: "Path",
    component: "custom-table/custom-table-text",
  },
  {
    dataKey: "status",
    customStyle: "width: 120px;",
    text: "Status",
    component: "custom-table/custom-table-status",
  },
];
const AVAILABLE_VALUE = "available";

export default class FilesViewController extends Controller {
  tableColumnsConfig = TableColumnsConfig;
  get selectedRowCount() {
    let count = 0;
    for (let tableRow of this.tableRows) {
      if (tableRow[1].isSelected) {
        count++;
      }
    }
    return count;
  }

  initTableData(tableData) {
    this.tableRows = this.getTableRowData(tableData);
  }

  getTableRowData(tableData) {
    let tableRows = new Map();
    let tableRow;
    for (let i = 0; i < tableData.length; i++) {
      tableRow = new TableFileRow(tableData[i]);
      tableRows.set(i, tableRow);
    }
    return tableRows;
  }

  @action handleDownload() {
    let dataToDisplay = "";
    for (let row of this.tableRows) {
      if (row[1].isSelected && row[1].status === AVAILABLE_VALUE) {
        dataToDisplay += `${row[1].device} ${row[1].path} \n`;
      }
    }

    if (!dataToDisplay.length) {
      alert("No available file selected");
    } else {
      alert(dataToDisplay);
    }
  }

  @action handleSelectAll(newIsSelectedValue) {
    for (let row of this.tableRows) {
      row[1].isSelected = newIsSelectedValue;
    }
  }

  @action handleSelectRow(rowId) {
    let selectedRow = this.tableRows.get(rowId);
    selectedRow.isSelected = !selectedRow.isSelected;
  }

  @action handleRowCellValueChange(rowId, dataKey, newValue) {
    let selectedRow = this.tableRows.get(rowId);
    selectedRow[dataKey] = newValue;
  }
}
