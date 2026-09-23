// Get buttons
const generateBtn = document.getElementById("generateBtn");
const printBtn = document.getElementById("printBtn");
const resetBtn = document.getElementById("resetBtn");

// Get student details
const studentName = document.getElementById("studentName");
const RegisterNumber = document.getElementById("RegisterNumber");
const attendance = document.getElementById("attendance");

// Get report elements
const displayName = document.getElementById("displayName");
const displayRegisterNumber = document.getElementById("displayRegisterNumber");
const resultBody = document.getElementById("resultBody");
const grandTotal = document.getElementById("grandTotal");
const percentage = document.getElementById("percentage");
const grade = document.getElementById("grade");
const displayAttendance = document.getElementById("displayAttendance");
const result = document.getElementById("result");

// Get all mark inputs
const externalInputs = document.querySelectorAll(".external");
const internalInputs = document.querySelectorAll(".internal");
const totalSpans = document.querySelectorAll(".total");

// Subject names
const subjects = [
    "Web Programming",
    "Java",
    "DBMS",
    "Operating System",
    "Software Engineering"
];


// Calculate individual subject total while typing
function updateSubjectTotal(index) {
    let external = parseFloat(externalInputs[index].value) || 0;
    let internal = parseFloat(internalInputs[index].value) || 0;

    // Keep values within allowed limits
    if (external > 80) {
        external = 80;
        externalInputs[index].value = 80;
    }

    if (internal > 20) {
        internal = 20;
        internalInputs[index].value = 20;
    }

    if (external < 0) {
        external = 0;
        externalInputs[index].value = 0;
    }

    if (internal < 0) {
        internal = 0;
        internalInputs[index].value = 0;
    }

    const total = external + internal;

    totalSpans[index].textContent = total;
}


// Add live calculation to every mark input
externalInputs.forEach((input, index) => {
    input.addEventListener("input", () => {
        updateSubjectTotal(index);
    });
});

internalInputs.forEach((input, index) => {
    input.addEventListener("input", () => {
        updateSubjectTotal(index);
    });
});


// Generate report
generateBtn.addEventListener("click", function () {

    // Validate student name
    if (studentName.value.trim() === "") {
        alert("Please enter the student name.");
        studentName.focus();
        return;
    }

    // Validate USN
    if (usn.value.trim() === "") {
        alert("Please enter the USN.");
        usn.focus();
        return;
    }

    // Validate attendance
    if (attendance.value === "") {
        alert("Please enter the attendance percentage.");
        attendance.focus();
        return;
    }

    const attendanceValue = parseFloat(attendance.value);

    if (attendanceValue < 0 || attendanceValue > 100) {
        alert("Attendance must be between 0 and 100.");
        attendance.focus();
        return;
    }


    // Display student information
    displayName.textContent = studentName.value.trim();
    displayUSN.textContent = usn.value.trim();
    displayAttendance.textContent = attendanceValue + "%";


    // Clear old result table
    resultBody.innerHTML = "";

    let totalMarks = 0;
    let allSubjectsPassed = true;


    // Generate subject rows
    subjects.forEach((subject, index) => {

        const external = parseFloat(externalInputs[index].value) || 0;
        const internal = parseFloat(internalInputs[index].value) || 0;
        const total = external + internal;

        totalMarks += total;

        // Passing condition:
        // Total must be at least 40/100
        if (total < 40) {
            allSubjectsPassed = false;
        }


        const row = document.createElement("tr");

        row.innerHTML = `
            <td>${subject}</td>
            <td>${external}</td>
            <td>${internal}</td>
            <td>${total}</td>
        `;

        resultBody.appendChild(row);
    });


    // Calculate percentage
    const percent = (totalMarks / 500) * 100;

    // Calculate grade
    let gradeValue;

    if (percent >= 90) {
        gradeValue = "A+";
    } else if (percent >= 80) {
        gradeValue = "A";
    } else if (percent >= 70) {
        gradeValue = "B";
    } else if (percent >= 60) {
        gradeValue = "C";
    } else if (percent >= 50) {
        gradeValue = "D";
    } else if (percent >= 40) {
        gradeValue = "E";
    } else {
        gradeValue = "F";
    }


    // Final result
    // Student passes if all subjects >= 40
    // and attendance >= 75%
    const passed = allSubjectsPassed && attendanceValue >= 75;

    if (passed) {
        result.textContent = "PASS";
        result.style.color = "green";
    } else {
        result.textContent = "FAIL";
        result.style.color = "red";
    }


    // Display summary
    grandTotal.textContent = `${totalMarks} / 500`;
    percentage.textContent = `${percent.toFixed(2)}%`;
    grade.textContent = gradeValue;


    // Show report
    document.getElementById("report").style.display = "block";

    // Scroll to report
    document.getElementById("report").scrollIntoView({
        behavior: "smooth"
    });
});


// Print report
printBtn.addEventListener("click", function () {

    const report = document.getElementById("report");

    if (report.style.display === "none" || report.style.display === "") {
        alert("Please generate the report first.");
        return;
    }

    window.print();
});


// Reset everything
resetBtn.addEventListener("click", function () {

    // Clear student details
    studentName.value = "";
    RegisterNumber.value = "";
    attendance.value = "";

    // Clear marks
    externalInputs.forEach(input => {
        input.value = "";
    });

    internalInputs.forEach(input => {
        input.value = "";
    });

    // Reset subject totals
    totalSpans.forEach(span => {
        span.textContent = "0";
    });

    // Reset report
    displayName.textContent = "-";
    displayRegisterNumber.textContent = "-";
    displayAttendance.textContent = "0%";
    grandTotal.textContent = "0 / 500";
    percentage.textContent = "0%";
    grade.textContent = "-";
    result.textContent = "-";

    resultBody.innerHTML = "";

    // Hide report
    document.getElementById("report").style.display = "none";
});
