// links.js

const enlaces = {
    1: "campusm://uniloc?posCode=1000020709",
    2: "campusm://uniloc?posCode=1000020710",
    3: "campusm://uniloc?posCode=1000020710",
    4: "campusm://uniloc?posCode=1000020711",
    5: "campusm://uniloc?posCode=1000020714",
    6: "campusm://uniloc?posCode=1000020712",
    7: "campusm://uniloc?posCode=1000020712",
    8: "campusm://uniloc?posCode=1000020713",
    9: "campusm://uniloc?posCode=1000020713",
    10: "campusm://uniloc?posCode=1000020713"
  };
  
  export const getEnlace = (id) => {
    return enlaces[id] || ""; // Devolver el enlace correspondiente o una cadena vacía si no se encuentra
};
  