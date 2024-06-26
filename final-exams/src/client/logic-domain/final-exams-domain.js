import { request } from "@ombiel/aek-lib";
import { DateTimeService } from "./date-services";
import { ExamSortingService } from "./sort-services";

class FinalExamService {
  constructor(user) {
    this.finalExamResponse = null;
    this.examsLoaded = false;
    this.USER = user;
  }

  async initializeFinalExamResponse() {
    try {
      console.log('this.USER', this.USER);
      if (!this.examsLoaded) {
        const { error, body } = await new Promise((resolve, reject) => {
          request.action("get-exams").send({ user: this.USER }).end((e, res) => {
            if (e) {
              console.error("Error fetching exams:", e);
              reject(new Error("Failed to fetch exams"));
              return;
            }
            resolve({ error: null, body: res });
          });
        });

        if (error) {
          console.error("Error in response body:", error);
          throw new Error(`Error fetching exams: ${error}`);
        }

        this.finalExamResponse = body;
        this.examsLoaded = true;
      }
    } catch (error) {
      console.error("Error initializing final exam response:", error);
      throw new Error(`Error initializing final exam response: ${error.message}`);
    }
  }

  async ensureFinalExamsLoaded() {
    if (!this.examsLoaded) {
      await this.initializeFinalExamResponse();
    }
  }

  async getGroupExamByDate() {
    await this.ensureFinalExamsLoaded();

    try {
      if (!this.finalExamResponse) {
        return null;
      }
      const allExams = this.finalExamResponse.body.resultado;
      if (allExams.length === 0) {
        return null;
      }

      const sortedExams = ExamSortingService.sortExamsByDate(allExams);

      const examsByDate = {};

      sortedExams.forEach((item) => {
        const date = item.FECHA;
        if (!examsByDate[date]) {
          examsByDate[date] = [];
        }
        examsByDate[date].push(item);
      });
      return ExamSortingService.sortExamsByHour(examsByDate);
    } catch (error) {
      console.error("Error grouping exams by date:", error);
      throw new Error(`Error agrupando los exámenes por fecha: ${error.message}`);
    }
  }

  async getNextExam() {
    await this.ensureFinalExamsLoaded();
    const groupedExams = await this.getGroupExamByDate();
    if (!groupedExams) {
      return null;
    }

    const currentDate = DateTimeService.getCurrentDate();
    const currentTime = DateTimeService.getCurrentTime();

    for (const date of Object.keys(groupedExams)) {
      const exams = groupedExams[date];
      for (const exam of exams) {
        if (DateTimeService.dateCompare(exam.FECHA, currentDate) === 0) {
          if (DateTimeService.compareTimes(exam.HORA, currentTime) > 0) {
            return exam;
          }
        } else if (DateTimeService.dateCompare(exam.FECHA, currentDate) > 0) {
          return exam;
        }
      }
    }

    return null;
  }
}

export default FinalExamService;
