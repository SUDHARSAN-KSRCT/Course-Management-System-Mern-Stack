const express = require('express');
const bodyParser = require('body-parser');
const cors = require('cors');

const app = express();
const PORT = 5000;

app.use(bodyParser.json());
app.use(cors());

let courses = [];
let nextCourseId = 1;

// Get all courses
app.get('/courses', (req, res) => {
  res.json(courses);
});

// Add a new course
app.post('/courses', (req, res) => {
  const { title, instructor } = req.body;
  const newCourse = { id: nextCourseId++, title, instructor };
  courses.push(newCourse);
  res.json(newCourse);
});

// Update an existing course
// Update an existing course
app.put('/courses/:id', (req, res) => {
  const id = parseInt(req.params.id);
  const { title, instructor } = req.body;
  const index = courses.findIndex(course => course.id === id);
  if (index !== -1) {
    courses[index] = { ...courses[index], title, instructor };
    res.json(courses[index]);
  } else {
    res.status(404).send('Course not found');
  }
});

// Delete a course
app.delete('/courses/:id', (req, res) => {
  const id = parseInt(req.params.id);
  const initialLength = courses.length;
  courses = courses.filter(course => course.id !== id);
  if (courses.length < initialLength) {
    res.send('Course deleted successfully');
  } else {
    res.status(404).send('Course not found');
  }
});

app.listen(PORT, () => {
  console.log(`Server is running on http://localhost:${PORT}`);
});
