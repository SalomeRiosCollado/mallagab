
const data = {
    "Ciclo 1": [
        { name: "ACTIVIDADES I", req: [] },
        { name: "ANTROPOLOGIA RELIGIOSA", req: [] },
        { name: "CIENCIAS NATURALES Y EDUCACION AMBIENTAL", req: [] },
        { name: "HISTORIA DE LA CIVILIZACIÓN", req: [] },
        { name: "INGLÉS I", req: [] },
        { name: "LENGUA: COMUNICACIÓN ESCRITA ACADÉMICA", req: [] },
        { name: "MATEMÁTICA BASICA I", req: [] }
    ],
    "Ciclo 2": [
        { name: "CULTURA PERUANA Y SOCIEDAD", req: ["HISTORIA DE LA CIVILIZACIÓN"] },
        { name: "EDUCACION MUSICAL", req: [] },
        { name: "INGLES II", req: ["INGLÉS I"] },
        { name: "PSICOLOGIA GENERAL", req: ["CIENCIAS NATURALES Y EDUCACION AMBIENTAL"] },
        { name: "REDACCION ACADEMICA", req: ["LENGUA: COMUNICACIÓN ESCRITA ACADÉMICA"] },
        { name: "TEOLOGIA I", req: [] },
        { name: "TEORIA DE LA EDUCACION", req: ["ANTROPOLOGIA RELIGIOSA"] }
    ]
    // Aquí seguirían todos los ciclos que me diste...
};

let completed = JSON.parse(localStorage.getItem("completedCourses") || "[]");

function renderMalla() {
    const container = document.getElementById("malla");
    container.innerHTML = "";
    for (let ciclo in data) {
        const div = document.createElement("div");
        div.className = "cycle";
        const title = document.createElement("h2");
        title.textContent = ciclo;
        div.appendChild(title);
        data[ciclo].forEach(course => {
            const courseDiv = document.createElement("div");
            courseDiv.className = "course";
            courseDiv.textContent = course.name;
            const locked = course.req.some(r => !completed.includes(r));
            if (locked) {
                courseDiv.classList.add("locked");
            } else if (completed.includes(course.name)) {
                courseDiv.classList.add("completed");
            }
            courseDiv.addEventListener("click", () => toggleCourse(course.name));
            div.appendChild(courseDiv);
        });
        container.appendChild(div);
    }
}

function toggleCourse(name) {
    const index = completed.indexOf(name);
    if (index >= 0) {
        completed.splice(index, 1);
    } else {
        completed.push(name);
    }
    localStorage.setItem("completedCourses", JSON.stringify(completed));
    renderMalla();
}

renderMalla();
