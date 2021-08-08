import Component from "@glimmer/component";
import { htmlSafe } from "@ember/template";
import { action } from "@ember/object";
import { tracked } from "@glimmer/tracking";

// Map of ManagerFile
const mockData = [
  {
    name: "smss.exe",
    device: "Stark",
    path: "\\Device\\HarddiskVolume2\\Windows\\System32\\smss.exe",
    status: "scheduled",
  },
  {
    name: "netsh.exe",
    device: "Targaryen",
    path: "\\Device\\HarddiskVolume2\\Windows\\System32\\netsh.exe",
    status: "available",
  },
  {
    name: "uxtheme.dll",
    device: "Lannister",
    path: "\\Device\\HarddiskVolume1\\Windows\\System32\\uxtheme.dll",
    status: "available",
  },
  {
    name: "cryptbase.dll",
    device: "Martell",
    path: "\\Device\\HarddiskVolume1\\Windows\\System32\\cryptbase.dll",
    status: "scheduled",
  },
  {
    name: "7za.exe",
    device: "Baratheon",
    path: "\\Device\\HarddiskVolume1\\temp\\7za.exe",
    status: "scheduled",
  },
];

const ColumnsConfig = [
  {
    dataKey: "selected",
    customWidth: htmlSafe(30),
    text: "",
    component: "files-manager-checkbox",
  },
  {
    dataKey: "name",
    customWidth: htmlSafe(120),
    text: "Name",
    component: "files-manager-text",
  },
  {
    dataKey: "device",
    customWidth: htmlSafe(120),
    text: "Device",
    component: "files-manager-text",
  },
  {
    dataKey: "path",
    text: "Path",
    component: "files-manager-text",
  },
  {
    dataKey: "status",
    customWidth: htmlSafe(120),
    text: "Status",
    component: "files-manager-status",
  },
];

export default class FilesManagerComponent extends Component {
  columnsConfig = ColumnsConfig;
  @tracked mockData = mockData;

  constructor(owner, args) {
    super(owner, args);
  }

  get selectedCount() {
    let count = 0;
    for (let i = 0; i < this.mockData.length; i++) {
      if (this.mockData.isSelected) {
        count++;
      }
    }
    return count;
  }

  get selectAllCheckedState() {
    return this.selectedCount === this.mockData.length;
  }

  get selectAllIndeterminateState() {
    return !this.selectAllCheckedState && this.selectedCount !== 0;
  }

  @action handleChangeRowCellValue(rowId, dataKey, newValue) {
    console.log("handleChangeRowCellValue");
  }

  @action handleChangeAllRowsCellValue(dataKey, newValue) {
    console.log("handleChangeAllRowsCellValue");
  }
}
