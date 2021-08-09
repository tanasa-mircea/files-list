import Component from "@glimmer/component";
import { action } from "@ember/object";

export default class TableControlsComponent extends Component {
  get selectAllCheckedState() {
    return this.args.selectedCount === this.args.maxCount;
  }

  @action updateSelectAllInputIndeterminateState() {
    this.selectAllInput.indeterminate =
      !this.selectAllCheckedState && this.args.selectedCount !== 0;
  }

  @action handleSelectAllInserted(selectAllElement) {
    this.selectAllInput = selectAllElement;
  }

  @action handleSelectAllDestroy() {
    this.selectAllInput = null;
  }

  @action handleSelectAllClick(event) {
    let newValue = event.target.checked;
    this.args.selectAll(newValue);
  }
}
