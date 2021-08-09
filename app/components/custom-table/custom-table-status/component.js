import Component from "@glimmer/component";

const CUSTOM_CLASSES = Object.freeze({
  available: "custom-table-status--available",
});
export default class CustomTableStatusComponent extends Component {
  constructor(owner, args) {
    super(owner, args);
  }

  get statusClass() {
    return CUSTOM_CLASSES[this.args.value];
  }
}
