const emailRegex = /^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/;
let passwordRegex = new RegExp("^(?=.*[a-z])(?=.*[A-Z])(?=.*[0-9])(?=.*[!@#$%^&*])(?=.{8,})");

export function isEmailValid(email: string) {
  return emailRegex.test(email);
}

export function isPasswordValid(password: string) {
  return passwordRegex.test(password);
}
