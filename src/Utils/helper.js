import jwt from 'jsonwebtoken'

export const isError = (object) => {
  for (let value of Object.values(object)) {
    if(value=="") return true
  }
  return false
}

export const isAuthenticated = () =>
{
  const token = localStorage.getItem("token");
  const decode = jwt.decode(token)

  let isValid = decode ? true : false

  return isValid
}

export const getUser = () => {
  const token = localStorage.getItem("token");
  const decode = jwt.decode(token)

  if(!decode)  return
  return decode.detailUser
}
