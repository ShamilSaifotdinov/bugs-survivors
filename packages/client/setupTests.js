require('@testing-library/jest-dom')

global.alert = msg => {
  console.log(msg)
}
