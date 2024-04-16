import { useEffect, useState } from "react";
// import { calculatorRepository } from "../../../core/repositories/repository-factory";
import { RepositoryError } from "../../../../common/errors";
import { usePageFatalError } from "../../../hooks/usePageFatalError";

export function useAcademicInfo() {
  const [academicInfo, setAcademicInfo] = useState(null);
  const { setFatalError } = usePageFatalError();

  const loadAcademicInfo = async () => {
    setLoadingStatus(true);
    try {
      //   const currentAcademicInfo = await calculatorRepository.getAcademicInfo();
      const currentAcademicInfo = {
        courses: [
          {
            id: "1",
            name: "Course 1",
            credits: 3,
            grade: 4.5,
            period: "2021-2",
          },
          {
            id: "2",
            name: "Course 2",
            credits: 4,
            grade: 3.5,
            period: "2021-2",
          },
          {
            id: "3",
            name: "Course 3",
            credits: 2,
            grade: 2.5,
            period: "2021-2",
          },
        ],
        totalCredits: 9,
        totalGrade: 3.5,
      };

      myLogger.info("academic info fetched", { currentAcademicInfo });
      setAcademicInfo(currentAcademicInfo);
    } catch (error) {
      if (error instanceof RepositoryError) {
        setFatalError({
          error,
          userMessage:
            "Hubo un error obteniendo las asignaturas matriculadas. Es posible que no hayas realizado la evaluación docente",
        });
      }
    } finally {
      setLoadingStatus(false);
    }
  };

  useEffect(() => {
    myLogger.debug("loading academic info");
    loadAcademicInfo();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  return {
    academicInfo,
  };
}
