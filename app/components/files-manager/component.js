import Component from "@glimmer/component";
import { action } from "@ember/object";
import { tracked } from "@glimmer/tracking";

const ColumnsConfig = [
  {
    dataKey: "isSelected",
    customWidth: 30,
    text: "",
    component: "files-manager-checkbox",
  },
  {
    dataKey: "name",
    customWidth: 120,
    text: "Name",
    component: "files-manager-text",
  },
  {
    dataKey: "device",
    customWidth: 120,
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
    customWidth: 120,
    text: "Status",
    component: "files-manager-status",
  },
];
const AVAILABLE_VALUE = "available";

class FileModel {
  @tracked isSelected = false;

  constructor(args) {
    this.name = args.name;
    this.device = args.device;
    this.path = args.path;
    this.status = args.status;
  }
}

export default class FilesManagerComponent extends Component {
  columnsConfig = ColumnsConfig;
  selectAllInput = null;
  @tracked filesModelList = null;

  constructor(owner, args) {
    super(owner, args);
    this.filesModelList = this.getProcessedFilesModelMap(args.filesList);
  }

  get selectedCount() {
    let count = 0;
    for (let fileModel of this.filesModelList) {
      if (fileModel[1].isSelected) {
        count++;
      }
    }
    return count;
  }

  get selectAllCheckedState() {
    return (
      this.filesModelList && this.selectedCount === this.filesModelList.size
    );
  }

  getProcessedFilesModelMap(filesList) {
    let filesModelList = new Map();
    let filesModel;
    for (let i = 0; i < filesList.length; i++) {
      filesModel = new FileModel(filesList[i]);
      filesModelList.set(i, filesModel);
    }
    return filesModelList;
  }

  updateSelectAllInputIndeterminateState() {
    this.selectAllInput.indeterminate =
      !this.selectAllCheckedState && this.selectedCount !== 0;
  }

  @action handleChangeRowCellValue(rowId, dataKey, newValue) {
    let modifiedModel = this.filesModelList.get(rowId);
    modifiedModel[dataKey] = newValue;
    this.updateSelectAllInputIndeterminateState();
  }

  @action handleSelectAllClick(newValue) {
    for (let fileModel of this.filesModelList) {
      fileModel[1].isSelected = newValue;
    }
    this.updateSelectAllInputIndeterminateState();
  }

  @action downloadSelectedFiles() {
    let dataToDisplay = "";
    for (let fileModel of this.filesModelList) {
      if (fileModel[1].isSelected && fileModel[1].status === AVAILABLE_VALUE) {
        dataToDisplay += `${fileModel[1].device} ${fileModel[1].path} \n`;
      }
    }
    alert(dataToDisplay);
  }

  // TODO: Add will destroy for input
  @action handleSelectAllInserted(selectAllElement) {
    this.selectAllInput = selectAllElement;
  }
}
