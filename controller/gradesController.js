import { promises as fs, write } from "fs";
import logger from "../helper/winston.js";

const { readFile, writeFile } = fs;

class grade {
    constructor() {
    }

    async save(grade) {
        try {
            const result = {};
            if (!grade.student) {
                result.erroMsg = "[save] O nome do estudante é obrigatorio"
                result.status = 422
                throw result;
            } else if (!grade.subject) {
                result.erroMsg = "[save] A materia é obrigatoria"
                result.status = 422
                throw result;
            } else if (!grade.type) {
                result.erroMsg = "[save] A atividade é obrigatoria"
                result.status = 422
                throw result;
            } else if (!grade.value) {
                result.erroMsg = "[save] A nota é obrigatoria"
                result.status = 422
                throw result;
            }
            const data = JSON.parse(await readFile("./files/grades.json",
                "utf-8"));
            const newGrade = {
                id: data.nextId++, ...grade,
                timestamp: new Date
            }

            data.grades.push(newGrade);
            writeFile("./files/grades.json", JSON.stringify(data))

            return grade;
        } catch (error) {
            if (!error.hasOwnProperty("erroMsg") &&
                !error.hasOwnProperty("status")) {
                logger().error(error)
                const result = {}
                result.erroMsg = "Ocorreu um erro interno"
                result.status = 500
                throw result;
            } else {
                logger().error(error)
                throw error;
            }
        }
    }

    async update(entite) {
        try {
            let result = {};

            if (!entite.student) {
                result.erroMsg = "O nome do estudante é obrigatorio"
                result.status = 422
                throw result;
            } else if (!entite.subject) {
                result.erroMsg = "A materia é obrigatoria"
                result.status = 422
                throw result;
            } else if (!entite.type) {
                result.erroMsg = "A atividade é obrigatoria"
                result.status = 422
                throw result;
            } else if (!entite.value) {
                result.erroMsg = "A nota é obrigatoria"
                result.status = 422
                throw result;
            } else if (!entite.id) {
                result.erroMsg = "O id é obrigatorio"
                result.status = 422
                throw result;
            }

            const data = JSON.parse(await readFile("./files/grades.json",
                "utf-8"));
            const index = data.grades.findIndex(grade =>
                grade.id === entite.id);

            if (index == -1) {
                result.erroMsg = `Grade id: ${entite.id} não encontrada`;
                result.status = 404;
                throw result;
            } else {
                data.grades[index] = entite;
                writeFile("./files/grades.json", JSON.stringify(data))
                return "atualizado com sucesso"
            }

        } catch (error) {
            if (!error.hasOwnProperty("erroMsg") &&
                !error.hasOwnProperty("status")) {
                logger().error(error)
                const result = {}
                result.erroMsg = "Ocorreu um erro interno"
                result.status = 500
                throw result;
            } else {
                logger().error(error.erroMsg)
                throw error;
            }
        }
    }

    async delete(id) {
        try {
            let result = {};
            const data = JSON.parse(await readFile("./files/grades.json",
                "utf-8"));
            const grade = data.grades.filter(grade => {
                if (grade.id === parseInt(id)) {
                    return grade;
                }
            })
            if (grade.length < 1) {
                result.erroMsg = `Grade id: ${id} não encontrada`;
                result.status = 404;
                throw result;
            } else {
                data.grades.splice(data.grades.findIndex(grade =>
                    grade.id === parseInt(id)), 1)
                writeFile("./files/grades.json", JSON.stringify(data))
                return `Grade id: ${id} deletado com sucesso`;
            }

        } catch (error) {
            if (!error.hasOwnProperty("erroMsg") &&
                !error.hasOwnProperty("status")) {
                logger().error(error)
                const result = {}
                result.erroMsg = "Ocorreu um erro interno"
                result.status = 500
                throw result;
            } else {
                logger().error(error.erroMsg)
                throw error;
            }
        }
    }

    async getAll() {
        try {
            const data = JSON.parse(await readFile("./files/grades.json",
                "utf-8"));
            return data;

        } catch (error) {
            if (!error.hasOwnProperty("erroMsg") &&
                !error.hasOwnProperty("status")) {
                logger().error(error)
                const result = {}
                result.erroMsg = "Ocorreu um erro interno"
                result.status = 500
                throw result;
            } else {
                logger().error(error)
                throw error;
            }
        }
    }

    async getById(id) {
        try {
            let result = {};
            const data = JSON.parse(await readFile("./files/grades.json",
                "utf-8"));
            const grade = data.grades.filter(grade => {
                if (grade.id === parseInt(id)) {
                    return grade;
                }
            })
            if (grade.length < 1) {
                result.erroMsg = `Grade id: ${id} não encontrada`;
                result.status = 404;
                throw result;
            } else {
                return grade;
            }

        } catch (error) {

            if (!error.hasOwnProperty("erroMsg") &&
                !error.hasOwnProperty("status")) {
                logger().error(error)
                const result = {}
                result.erroMsg = "Ocorreu um erro interno"
                result.status = 500
                throw result;
            } else {
                logger().error(error.erroMsg)
                throw error;
            }
        }

    }

    async totalNoteStudent(entite) {
        try {
            const result = {}

            if (!entite.student) {
                result.erroMsg = "[totalNote] O nome do estudante é obrigatorio"
                result.status = 422
                throw result;
            } else if (!entite.subject) {
                result.erroMsg = "[totalNote] A materia é obrigatoria"
                result.status = 422
                throw result;
            }

            let sumNotes = 0;
            const data = JSON.parse(await readFile("./files/grades.json",
                "utf-8"));
            const grades = data.grades.filter(grade => {
                if (grade.student.toLowerCase() ===
                    entite.student.toLowerCase() &&
                    grade.subject.toLowerCase() ===
                    entite.subject.toLowerCase()) {
                    sumNotes += grade.value;
                    return grade;
                }
            })

            if (grades.length < 1) {
                result.erroMsg = `Materia ou usuario inexistente`;
                result.status = 404;
                throw result;
            } else {
                return sumNotes;
            }

        } catch (error) {
            if (!error.hasOwnProperty("erroMsg") &&
                !error.hasOwnProperty("status")) {
                logger().error(error)
                const result = {}
                result.erroMsg = "Ocorreu um erro interno"
                result.status = 500
                throw result;
            } else {
                logger().error(error.erroMsg)
                throw error;
            }
        }
    }

    async averageNoteStudent(entite) {
        try {
            const result = {}

            if (!entite.type) {
                result.erroMsg = "O nome da atividade é obrigatorio"
                result.status = 422
                throw result;
            } else if (!entite.subject) {
                result.erroMsg = "A materia é obrigatoria"
                result.status = 422
                throw result;
            }

            const data = JSON.parse(await readFile("./files/grades.json",
                "utf-8"));
            const grades = data.grades.filter(grade => {
                if (grade.type.toLowerCase() ===
                    entite.type.toLowerCase() &&
                    grade.subject.toLowerCase() ===
                    entite.subject.toLowerCase()) {
                    return grade;
                }
            })

            if (grades.length < 1) {
                result.erroMsg = `Materia ou usuario inexistente`;
                result.status = 404;
                throw result;
            }

            const sumValueGrade = grades.reduce((acumulator, current) => {
                return acumulator + current.value;
            }, 0)

            return sumValueGrade / grades.length;

        } catch (error) {

            if (!error.hasOwnProperty("erroMsg") &&
                !error.hasOwnProperty("status")) {
                logger().error(error)
                const result = {}
                result.erroMsg = "Ocorreu um erro interno"
                result.status = 500
                throw result;
            } else {
                logger().error(error.erroMsg)
                throw error;
            }
        }

    }

    async threeHighestNotes(entite) {
        try {
            const result = {}

            if (!entite.type) {
                result.erroMsg = "O nome da atividade é obrigatorio"
                result.status = 422
                throw result;
            } else if (!entite.subject) {
                result.erroMsg = "A materia é obrigatoria"
                result.status = 422
                throw result;
            }

            const data = JSON.parse(await readFile("./files/grades.json",
                "utf-8"));
            const grades = data.grades.filter(grade => {
                if (grade.type.toLowerCase() ===
                    entite.type.toLowerCase() &&
                    grade.subject.toLowerCase() ===
                    entite.subject.toLowerCase()) {
                    return grade;
                }
            }).sort((a, b) => {
                return (a.value < b.value) ? 1 : ((b.value < a.value) ? -1 : 0);
            })

            if (grades.length < 1) {
                result.erroMsg = `Materia ou usuario inexistente`;
                result.status = 404;
                throw result;
            }

            return grades.slice(0, 3)

        } catch (error) {

            if (!error.hasOwnProperty("erroMsg") &&
                !error.hasOwnProperty("status")) {
                logger().error(error)
                const result = {}
                result.erroMsg = "Ocorreu um erro interno"
                result.status = 500
                throw result;
            } else {
                logger().error(error.erroMsg)
                throw error;
            }
        }

    }
}

export default grade;
