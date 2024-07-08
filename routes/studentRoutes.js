const express = require('express');
const fs = require('fs');
const path = require('path');
const router = express.Router();

const studentsFilePath = path.join(__dirname, '../data/students.json');

const getStudents = () => {
  const data = fs.readFileSync(studentsFilePath);
  return JSON.parse(data);
};

const saveStudents = (students) => {
  fs.writeFileSync(studentsFilePath, JSON.stringify(students, null, 2));
};

// Add a new student
router.post('/api/v1/students', (req, res) => {
  try {
    const students = getStudents();
    const student = { id: students.length + 1, ...req.body };
    students.push(student);
    saveStudents(students);
    res.status(201).send(student);
  } catch (error) {
    res.status(400).send(error.message);
  }
});

// Get all students
router.get('/api/v1/students', (req, res) => {
  try {
    const students = getStudents();
    res.status(200).json(students);
  } catch (error) {
    res.status(500).send(error.message);
  }
});

// Get a student with an ID
router.get('/api/v1/students/:id', (req, res) => {
  try {
    const students = getStudents();
    const student = students.find((s) => s.id === parseInt(req.params.id));
    if (!student) return res.status(404).send();
    res.status(200).send(student);
  } catch (error) {
    res.status(500).send(error.message);
  }
});

// Update existing student information
router.put('/api/v1/students/:id', (req, res) => {
  try {
    const students = getStudents();
    const index = students.findIndex((s) => s.id === parseInt(req.params.id));
    if (index === -1) return res.status(404).send();
    students[index] = { id: parseInt(req.params.id), ...req.body };
    saveStudents(students);
    res.status(200).send(students[index]);
  } catch (error) {
    res.status(400).send(error.message);
  }
});

// Delete a student record
router.delete('/api/v1/students/:id', (req, res) => {
  try {
    const students = getStudents();
    const index = students.findIndex((s) => s.id === parseInt(req.params.id));
    if (index === -1) return res.status(404).send();
    const deletedStudent = students.splice(index, 1);
    saveStudents(students);
    res.status(200).send(deletedStudent[0]);
  } catch (error) {
    res.status(500).send(error.message);
  }
});

// Healthcheck endpoint
router.get('/healthcheck', (req, res) => {
  res.status(200).send({ status: 'healthy' });
});

module.exports = router;
