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

const prerequisitos = {
  "Metodología de la Investigación Cualitativa": ["Introducción a la investigación en las ciencias sociales"],
  "Metodología de la Investigación Cuantitativa": ["Metodología de la Investigación Cualitativa"],
  "Taller de investigación": ["Metodología de la Investigación Cuantitativa"],
  "Inglés 2": ["Inglés 1"],
  "Inglés 3": ["Inglés 2"],
  "Inglés 4": ["Inglés 3"],
  "Neuropsicología 2": ["Neuropsicología 1"],
  "Psicología Social 2": ["Psicología Social 1"],
  "Psicopatología 2": ["Psicopatología 1"],
  "Psicología del Desarrollo 2": ["Psicología del Desarrollo 1"],
  "Psicometría 2": ["Psicometría 1"],
  "Taller Clínico 1": ["Psicopatología 2"],
  "Fundamentos Conceptuales de la Clínica Infanto Juvenil": ["Psicología del Desarrollo 2"],
  "Psicología Educacional 1": ["Psicología del Aprendizaje"],
  "Comportamiento Humano en las Organizaciones": ["Psicología del Trabajo y de las Organizaciones"],
  "Psicología Educacional 2": ["Psicología Educacional 1"],
  "Gestión de Recursos Humanos": ["Comportamiento Humano en las Organizaciones"],
  "Taller Educacional 1": ["Psicología Educacional 2"],
  "Taller de Análisis de las Organizaciones": ["Gestión de Recursos Humanos"],
  "Taller Educacional 2": ["Taller Educacional 1"],
  "Taller de Cambio en las Organizaciones": ["Taller de Análisis de las Organizaciones"],
  "Taller Clínico 2": ["Taller Clínico 1"],
  "Seminario de Tesis": ["Taller Educacional 2", "Taller de Cambio en las Organizaciones", "Taller Clínico 2"],
  "Tesis": ["Seminario de Tesis", "Práctica Profesional"]
};

const malla = document.getElementById("malla-container");
const state = {};

// Función para chequear si todos los prerequisitos están aprobados
function prereqsAprobados(course) {
  if (!prerequisitos[course]) return true;
  return prerequisitos[course].every(pr => state[pr] && state[pr].approved);
}

// Función para actualizar el desbloqueo de todos los cursos
function actualizarDesbloqueos() {
  let cambios;
  do {
    cambios = false;
    Object.keys(state).forEach(course => {
      if (!state[course].unlocked && prereqsAprobados(course)) {
        state[course].unlocked = true;
        state[course].element.classList.remove("locked");
        cambios = true;
      }
    });
  } while (cambios);
}

// Crear la malla curricular en el DOM
semesters.forEach((semester, index) => {
  const semDiv = document.createElement("div");
  semDiv.className = "semester";

  const title = document.createElement("h2");
  title.textContent = semester.name;
  semDiv.appendChild(title);

  semester.courses.forEach(course => {
    const div = document.createElement("div");
    div.className = "course";
    div.textContent = course;
    div.dataset.name = course;

    // Inicializar estado: aprobado = false, desbloqueado si no tiene prerequisitos
    state[course] = {
      element: div,
      approved: false,
      unlocked: prereqsAprobados(course) // desbloqueado si no tiene prerequisitos
    };

    if (!state[course].unlocked) {
      div.classList.add("locked");
    }

    div.addEventListener("click", () => {
      if (!state[course].unlocked || state[course].approved) return;
      // Aprobar curso
      state[course].approved = true;
      div.classList.add("approved");
      // Actualizar desbloqueos en cadena
      actualizarDesbloqueos();
    });

    semDiv.appendChild(div);
  });

  malla.appendChild(semDiv);
});
