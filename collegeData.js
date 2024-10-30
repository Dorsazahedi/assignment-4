
const fs = require("fs")
const path = require("path")

let students = []


fs.readFile(path.join(__dirname, "data", "students.json"), "utf-8", (err, data) => {
    if (err) {
        console.error("Error reading students.json:", err)
        return
    }
    students = JSON.parse(data)
})


module.exports.getStudentsByCourse = function(course) {
    return new Promise((resolve, reject) => {
        let studentsByCourse = students.filter(student => student.course == course)
        
        if (studentsByCourse.length > 0) resolve(studentsByCourse)
        else reject("No Results Returned!")
    })
}

module.exports.addStudent = addStudent;

module.exports.getStudentByNum = function(num) {
    return new Promise((resolve, reject) => {
        let student = students.find(student => student.studentNum == num)
        
        if (student) resolve(student)
        else reject("No Results Returned!")
    })
}


module.exports.getAllStudents = function() {
    return new Promise((resolve, reject) => {
        if (students.length > 0) resolve(students)
        else reject("No Results Returned!")
    })
}


module.exports.getAllTAs = function() {
    return new Promise((resolve, reject) => {
        
        if (students.length > 0) { 
            const teachingAssistants = students.filter(student => student.role === "TA") // Adjust based on your data structure
            resolve(teachingAssistants)
        } else {
            reject("No Results Returned!")
        }
    })
}

let courses = [
    { id: 1, name: "Course 1", description: "Description for Course 1" },
    { id: 2, name: "Course 2", description: "Description for Course 2" },
    { id: 3, name: "Course 3", description: "Description for Course 3" }
]

function addStudent(studentData) {
    return new Promise((resolve, reject) => {
        if (!studentData) {
            reject("No student data provided");
            return;
        }

        // Set TA value based on the employment field from the form
        studentData.TA = studentData.employment === "Teaching Assistant"; // Adjusted to match your HTML

        // Assign a student number
        studentData.studentNum = students.length + 261;

        // Push the new student data into the students array
        students.push(studentData);

        // Write updated students array back to the JSON file
        fs.writeFile(path.join(__dirname, "data", "students.json"), JSON.stringify(students, null, 2), (err) => {
            if (err) {
                console.error("Error writing to students.json:", err);
                reject("Error saving student data.");
            } else {
                resolve();
            }
        });
    });
}

// Export the addStudent function
module.exports.addStudent = addStudent;


module.exports.getAllCourses = function() {
    return new Promise((resolve, reject) => {
        if (courses.length > 0) resolve(courses)
        else reject("No Courses Available!")
    })
}

