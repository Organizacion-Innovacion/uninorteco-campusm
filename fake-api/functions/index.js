const functions = require("firebase-functions");
const express = require("express");
const axios = require("axios");

const app = express();

app.get("/salas", (req, res) => {
    const salas = [
        { "nombre": "Sala 5 Bloque B Piso 3°", "computadorasDisponibles": 55 },
        { "nombre": "Salas 2-3 Bloque B Piso 2°", "computadorasDisponibles": 74 },
        { "nombre": "Sala 1 Bloque C Piso 1°", "computadorasDisponibles": 30 },
        { "nombre": "Sala 4 Bloque D Piso 3°", "computadorasDisponibles": 60 },
        { "nombre": "Sala 7 Bloque G Piso 5°", "computadorasDisponibles": 113 },
        { "nombre": "Sala 11, Bloque J, Piso 5°", "computadorasDisponibles": 30 },
        { "nombre": "Sala 10 Bloque K Piso 5°", "computadorasDisponibles": 143 }
    ];
    res.json(salas);
});

app.get("/combined-info/:user", async (req, res) => {
    const user = req.params.user;

    try {
        const periodsResponse = await axios.get(`https://intun.uninorte.edu.co/sba-estudiantes/api/v1/estudiante/userBanner/${user}/periodo`);
        const periods = periodsResponse.data.resultado;

        const latestPeriod = periods.reduce((latest, period) => {
            return latest.PERIODO > period.PERIODO ? latest : period;
        });

        const coursesResponse = await axios.get(`https://intun.uninorte.edu.co/sba-estudiantes/api/v1/matricula/user/${user}/periodo/${latestPeriod.PERIODO}`);
        const courses = coursesResponse.data.resultado;

        const courseDetailsPromises = courses.map(async (course) => {
            const courseDetailsResponse = await axios.post('https://intun.uninorte.edu.co/sba-estudiantes/api/v1/notas-parciales', {
                user: user,
                nrc: course.SFRSTCR_CRN,
                periodo: latestPeriod.PERIODO
            });

            const components = courseDetailsResponse.data.resultado;
            const finalGrade = components.reduce((total, component) => total + (component.NOTA * (component.SHRGCOM_WEIGHT / 100)), 0);

            return {
                id: course.SFRSTCR_CRN,
                name: course.SSBSECT_CRSE_TITLE,
                grade: finalGrade,
                credits: course.SFRSTCR_CREDIT_HR,
                components: components.map(component => ({
                    id: component.SHRGCOM_SEQ_NO,
                    name: component.SHRGCOM_NAME,
                    grade: component.NOTA,
                    weight: component.SHRGCOM_WEIGHT
                }))
            };
        });

        const detailedCourses = await Promise.all(courseDetailsPromises);

        const totalCredits = detailedCourses.reduce((total, course) => total + course.credits, 0);
        const totalPoints = detailedCourses.reduce((total, course) => total + (course.grade * course.credits), 0);
        const pga = totalPoints / totalCredits;

        res.json({
            statusCode: 200,
            currentPGA: pga,
            creditsSoFar: totalCredits,
            semester: {
                name: latestPeriod.DESCRIPTION,
                courses: detailedCourses.map(course => ({
                    id: course.id,
                    name: course.name,
                    grade: course.grade,
                    credits: course.credits
                }))
            },
            courses: detailedCourses
        });
    } catch (error) {
        console.error(error);
        res.status(500).json({ error: "Internal server error" });
    }
});

exports.api = functions.https.onRequest(app);
