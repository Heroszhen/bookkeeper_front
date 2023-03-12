export default class User{
    constructor(id = null,firstname = "", lastname = "", email = "", password = "", photo = "") {
      this._id = id;
      this.firstname = firstname;
      this.lastname = lastname;
      this.email = email;
      this.password = password;
      this.photo = photo;
    }
}