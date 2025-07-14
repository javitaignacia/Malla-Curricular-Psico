const semesters = [
  {
    name: "1° Semestre",
    courses: [
      "Filosofía",
      "Introducción a la investigación en las ciencias sociales",
      "Historia de la psicología",
      "Antropología cultural",
      "Teoría social y mundo contemporáneo"
    ]
  },
  {
    name: "2° Semestre",
    courses: [
      "Inglés 1",
      "Procesos psicológicos",
      "Neuropsicología 1",
      "Psicología Social 1",
      "Epistemología Psicológica",
      "Metodología de la Investigación Cualitativa"
    ]
  },
  {
    name: "3° Semestre",
    courses: [
      "Inglés 2",
      "Psicopatología 1",
      "Psicología del Desarrollo 1",
      "Psicología Social 2",
      "Neuropsicología 2",
      "Metodología de la Investigación Cuantitativa",
      "Psicometría 1"
    ]
  },
  {
    name: "4° Semestre",
    courses: [
      "Inglés 3",
      "Psicopatología 2",
      "Psicología del Desarrollo 2",
      "Psicología del Aprendizaje",
      "Psicología del Trabajo y de las Organizaciones",
      "Psicometría 2"
    ]
  },
  {
    name: "5° Semestre",
    courses: [
      "Inglés 4",
      "Psicología Educacional 1",
      "Comportamiento Humano en las Organizaciones",
      "Fundamentos Conceptuales de la Clínica Psicoanalítica",
      "Fundamentos Conceptuales de la Clínica Cognitiva",
      "Análisis de Problemas Psicosociales"
    ]
  },
  {
    name: "6° Semestre",
    courses: [
      "Taller de investigación",
      "Psicología Educacional 2",
      "Fundamentos Conceptuales de la Clínica Sistémica",
      "Fundamentos Conceptuales de la Clínica Infanto Juvenil",
      "Gestión de Recursos Humanos"
    ]
  },
  {
    name: "7° Semestre",
    courses: [
      "Taller Educacional 1",
      "Taller de Análisis de las Organizaciones",
      "Taller Clínico 1"
    ]
  },
  {
    name: "8° Semestre",
    courses: [
      "Taller Educacional 2",
      "Taller de Cambio en las Organizaciones",
      "Taller Clínico 2"
    ]
  },
  {
    name: "9° Semestre",
    courses: [
      "Seminario de Tesis",
      "Práctica Profesional"
    ]
  },
  {
   name: "10° Semestre",
    courses: ["Tesis"]
  }
];

const unlocksMap = {
  "Introducción a la investigación en las ciencias sociales": ["Metodología de la Investigación Cualitativa"],
  "Metodología de la Investigación Cualitativa": ["Metodología de la Investigación Cuantitativa"],
  "Metodología de la Investigación Cuantitativa": ["Taller de investigación"],
  "Inglés 1": ["Inglés 2"],
  "Inglés 2": ["Inglés 3"],
  "Inglés 3": ["Inglés 4"],
  "Neuropsicología 1": ["Neuropsicología 2"],
  "Psicología Social 1": ["Psicología Social 2"],
  "Psicopatología 1": ["Psicopatología 2"],
  "Psicología del Desarrollo 1": ["Psicología del Desarrollo 2"],
  "Psicometría 1": ["Psicometría 2"],
  "Psicopatología 2": ["Taller Clínico 1"],
  "Psicología del Desarrollo 2": ["Fundamentos Conceptuales de la Clínica Infanto Juvenil"],
  "Psicología del Aprendizaje": ["Psicología Educacional 1"],
  "Psicología del Trabajo y de las Organizaciones": ["Comportamiento Humano en las Organizaciones"],
  "Psicología Educacional 1": ["Psicología Educacional 2"],
  "Comportamiento Humano en las Organizaciones": ["Gestión de Recursos Humanos"],
  "Psicología Educacional 2": ["Taller Educacional 1"],
  "Gestión de Recursos Humanos": ["Taller de Análisis de las Organizaciones"],
  "Taller Educacional 1": ["Taller Educacional 2"],
  "Taller de Análisis de las Organizaciones": ["Taller de Cambio en las Organizaciones"],
  "Taller Clínico 1": ["Taller Clínico 2"],
  "Taller Educacional 2": ["Seminario de Tesis"],
  "Taller de Cambio en las Organizaciones": ["Seminario de Tesis"],
  "Taller Clínico 2": ["Seminario de Tesis"],
  "Seminario de Tesis": ["Tesis"],
  "Práctica Profesional": ["Tesis"]
};

const malla = document.getElementById("malla-container");
const state = {};

function unlockCourses(courseName) {
  const unlocks = unlocksMap[courseName];
  if (!unlocks) return;
  unlocks.forEach((name) => {
    const target = state[name];
    if (target && !target.unlocked) {
      target.unlocked = true;
      target.element.classList.remove("locked");
      // Desbloquear en cadena
      unlockCourses(name);
    }
  });
}

semesters.forEach((semester, index) => {
  const semDiv = document.createElement("div");
  semDiv.className = "semester";
  const title = document.createElement("h2");
  title.textContent = semester.name;
  semDiv.appendChild(title);

  semester.courses.forEach((course) => {
    const div = document.createElement("div");
    div.className = "course";
    div.textContent = course;
    div.dataset.name = course;

    const isFirstSemester = index === 0;
    state[course] = { element: div, unlocked: isFirstSemester };

    if (!isFirstSemester) div.classList.add("locked");

    div.addEventListener("click", () => {
      if (!state[course].unlocked || div.classList.contains("approved")) return;
      div.classList.add("approved");
      unlockCourses(course);
    });

    semDiv.appendChild(div);
  });

  malla.appendChild(semDiv);
});
