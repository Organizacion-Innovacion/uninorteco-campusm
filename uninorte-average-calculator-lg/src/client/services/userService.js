import { request } from "@ombiel/aek-lib"

export const getUser = () => {
  return new Promise((resolve, reject) => {
    request.action("get-user").end((err, res) => {
      if (err) {
        reject(err)
      } else {
        resolve(res.body.username)
      }
    })
  })
}