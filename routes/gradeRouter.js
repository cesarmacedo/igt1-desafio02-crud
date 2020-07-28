import express from "express";
import controllerGrade from "../controller/gradesController.js";

const controller = new controllerGrade();
const router = express.Router();

router.get("/", async (req, res) => {
    try {
        const result = await controller.getAll();
        res.json(result)
    } catch (error) {
        res.status(error.status).json(error.erroMsg);
    }
})
router.post("/", async (req, res) => {
    try {
        const result = await controller.save(req.body);
        res.json(result)
    } catch (error) {
        res.status(error.status).json(error.erroMsg);
    }
})
router.get("/:id", async (req, res) => {
    try {
        const result = await controller.getById(req.params.id);
        res.json(result)
    } catch (error) {
        res.status(error.status).json(error.erroMsg);
    }
})
router.put("/", async (req, res) => {
    try {
        const result = await controller.update(req.body);
        res.json(result)
    } catch (error) {
        res.status(error.status).json(error.erroMsg);
    }
})
router.delete("/:id", async (req, res) => {
    try {
        const result = await controller.delete(req.params.id);
        res.json(result)
    } catch (error) {
        res.status(error.status).json(error.erroMsg);
    }
})
router.post("/three/highest-notes", async (req, res) => {
    try {
        const result = await controller.threeHighestNotes(req.body);
        res.json(result)
    } catch (error) {
        res.status(error.status).json(error.erroMsg);
    }
})
router.post("/student/total-note", async (req, res) => {
    try {
        const result = await controller.totalNoteStudent(req.body);
        res.json(result)
    } catch (error) {
        res.status(error.status).json(error.erroMsg);
    }
})
router.post("/student/average-note", async (req, res) => {
    try {
        const result = await controller.averageNoteStudent(req.body);
        res.json(result)
    } catch (error) {
        res.status(error.status).json(error.erroMsg);
    }
})

export default router;


