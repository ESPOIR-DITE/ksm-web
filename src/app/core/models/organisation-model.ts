export class Organisation{
  id: string;
  name: string;
  organisationId: string;

  constructor(id: string, name: string, organisationId: string) {
    this.id = id;
    this.name = name;
    this.organisationId = organisationId;
  }
}
