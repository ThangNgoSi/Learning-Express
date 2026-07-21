const CourseList = document.querySelector(".course-list");
const courses = [
  "Course 1: Introduction to Confetti Cooking",
  "Course 2: Advanced Confetti Techniques",
  "Course 3: Confetti Dessert Making",
];

courses.forEach((course) => {
  const listItem = document.createElement("li");
  listItem.textContent = course;
  CourseList.appendChild(listItem);
});
