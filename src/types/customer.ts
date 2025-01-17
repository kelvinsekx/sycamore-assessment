// for humans: for some damn reasons I like to use class to define my types

export class CustomerType {
  firstName: string
  lastName: string
  email: string
  phone: string
  state: string
  status: boolean
  details: string
  constructor(
    firstName: string,
    lastName: string,
    email: string,
    phone: string,
    state: string,
    status: boolean,
    details: string,
  ) {
    this.firstName = firstName
    this.lastName = lastName
    this.email = email
    this.phone = phone
    this.state = state
    this.status = status
    this.details = details
  }
}
