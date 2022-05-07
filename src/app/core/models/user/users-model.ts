export class Users {
  email: string
  firstName: string
  middleName: string
  lastName: string

  constructor(email: string, firstName: string, middleName: string, lastName: string) {
    this.email = email;
    this.firstName = firstName;
    this.middleName = middleName;
    this.lastName = lastName;
  }
}
