import Component from "@glimmer/component";
import { action } from "@ember/object";

export default class CustomTableCheckboxComponent extends Component {
  constructor(owner, args) {
    super(owner, args);
  }

  @action
  handleInputChange(event) {
    if (this.args.changeValue) {
      this.args.changeValue(event.target.checked);
    }
  }
}
