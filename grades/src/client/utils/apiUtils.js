import { getUser } from "../services/userService";
import { getTerm } from "../services/termService";
import { getRegistration } from "../services/registrationService";
import { getGrades } from "../services/gradeService";

export async function fetchUserData() {
  try {
    const userResponse = await getUser();
    const username = userResponse.split('@')[0];
    return username;
  } catch (error) {
    console.error('Error fetching user data:', error);
    throw new Error('Error obteniendo los datos de usuario. Porfavor intente más tarde.');
  }
}

export async function fetchUserTerms(user) {
  try {
    console.log('user on fetchUserTerms', user);
    const termsResponse = await getTerm(user);
    return termsResponse;
  } catch (error) {
    console.error('Error fetching user terms:', error);
    throw new Error('Error obteniendo los periodos del usuario. Porfavor intente más tarde.');
  }
}

export async function fetchUserGrades(selectedTerm, user) {
  try {
    const registration = await getRegistration(selectedTerm, user);
    const promises = registration.map(async (element) => {
      const grades = await getGrades(user, element.SFRSTCR_CRN, selectedTerm);
      return {
        materia: element.SSBSECT_CRSE_TITLE,
        items: grades.map(({ SHRGCOM_NAME, SHRGCOM_WEIGHT, NOTAA }) => ({ name: SHRGCOM_NAME, peso: SHRGCOM_WEIGHT, value: NOTAA })),
      };
    });

    return await Promise.all(promises);
  } catch (error) {
    console.error('Error fetching user grades:', error);
    throw new Error('Error obteniendo las notas de usuario. Porfavor intente más tarde.');
  }
}
