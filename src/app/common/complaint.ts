import {AbstractEntity} from "./abstract-entity";

export class Complaint extends AbstractEntity {
  username !: string;
  userEmail !: string;
  complaintContent !: string;
}
