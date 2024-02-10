import {AbstractEntity} from "./abstract-entity";
import {Role} from "./role";

export class User extends AbstractEntity {
  name !: string;
  email !: string;
  password !: string;
  roles !: Role[];
}
