export class UserAccount{
  id: string
  email: string;
  organizationId: string
  roleId: string
  password: string
  date: Date
  state: boolean
  description: string

  constructor(id: string, email: string, organizationId: string, roleId: string, password: string, date: Date, state: boolean, description: string) {
    this.id = id;
    this.email = email;
    this.organizationId = organizationId;
    this.roleId = roleId;
    this.password = password;
    this.date = date;
    this.state = state;
    this.description = description;
  }
  public setOrganisation(organisation: string){
    this.organizationId = organisation;
  }
}
