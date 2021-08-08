import Component from "@glimmer/component";

const AVAILABLE_VALUE = "available";
const AVAILABLE_CLASS = "file-manager-status--available";
export default class FilesManagerStatusComponent extends Component {
  constructor(owner, args) {
    super(owner, args);
  }

  get statusClass() {
    if (this.args.value === AVAILABLE_VALUE) {
      return AVAILABLE_CLASS;
    } else {
      return "";
    }
  }
}
