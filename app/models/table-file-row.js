import TableRow from "./table-row";

export default class TableFileRow extends TableRow {
  constructor(args) {
    super(args);
    this.name = args.name;
    this.device = args.device;
    this.path = args.path;
    this.status = args.status;
  }
}
