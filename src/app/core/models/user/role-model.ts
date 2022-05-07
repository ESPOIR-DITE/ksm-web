export class Role{
  id: string;
  role: string;
  description: string;

  constructor(id: string, role: string, description: string) {
    this.id = id;
    this.role = role;
    this.description = description;
  }
}
