import { request } from "@ombiel/aek-lib"

const getUser = () => {
  return new Promise((resolve, reject) => {
    request
      .action("get-user")
      .end((err, res) => {
        if (err) {
          console.error("Error fetching user data:", err);
          reject(new Error("Failed to fetch user data"));
        } else {
          if (res && res.body && res.body.username) {
            console.log("User data retrieved:", res.body.username);
            resolve(res.body.username);
          } else {
            const error = new Error("Invalid user data format");
            console.error(error);
            reject(error);
          }
        }
      });
  });
};

export async function fetchUserData() {
  try {
    const userResponse = await getUser();
    const username = userResponse.split('@')[0];
    return username;
  } catch (error) {
    console.error("Error in fetchUserData:", error);
    throw new Error("No se pudo recuperar la información del usuario.");
  }
}
