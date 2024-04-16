import React from "react";
import { Button, Snackbar } from "@ellucian/react-design-system/core";
import { CoursesContainer } from "../../../common/components/CoursesContainer";
import { useHowMuchCourse } from "./useHowMuch";
import { PartialComponentCard } from "../../components/PartialComponentCard";
import { HowMuchResultCard } from "../../components/HowMuchResultCard";

function HowMuchCourse({ course }) {
  const {
    components,
    onLockIconPress,
    onGradeChange,
    finalCourseGrade,
    onFinalGradeChange,
    onComputeNeededGrade,
    errorSnackbarOptions,
    onCloseSnackbar,
  } = useHowMuchCourse({
    course,
  });

  return (
    <>
      <CoursesContainer>
        {components.map((component) => (
          <PartialComponentCard
            key={component.id}
            partialComponent={component}
            onGradeChange={onGradeChange}
            onLockIconPress={onLockIconPress}
          />
        ))}
      </CoursesContainer>
      <CoursesContainer sxProps={{ mt: 16 }}>
        <HowMuchResultCard
          title="Nota final"
          subtitle="Los componentes no bloqueados serán modificados para obtener una nota final de"
          value={finalCourseGrade}
          onGradeChange={onFinalGradeChange}
          helpMessage="¿Cómo se calcula la nota final?"
        />
        <Button
          sx={{
            width: "85%",
            alignSelf: "center",
            justifySelf: "center",
            my: 4,
          }}
          onClick={onComputeNeededGrade}
        >
          Calcular lo que necesito!
        </Button>
      </CoursesContainer>
      <Snackbar
        variant="error"
        open={errorSnackbarOptions.open}
        onClose={onCloseSnackbar}
        message={errorSnackbarOptions.message}
      />
    </>
  );
}

export default HowMuchCourse;