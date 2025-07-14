const courses = [
  { name: "Filosofía" },
  { name: "Introducción a la investigación en las ciencias sociales", unlocks: ["Metodología de la Investigación Cualitativa"] },
  { name: "Historia de la psicología" },
  { name: "Antropología cultural" },
  { name: "Teoría social y mundo contemporáneo" },
  { name: "Inglés 1", unlocks: ["Inglés 2"] },
  { name: "Procesos psicológicos" },
  { name: "Neuropsicología 1", unlocks: ["Neuropsicología 2"] },
  { name: "Psicología Social 1", unlocks: ["Psicología Social 2"] },
  { name: "Epistemología Psicológica" },
  { name: "Metodología de la Investigación Cualitativa", unlocks: ["Metodología de la Investigación Cuantitativa"] },
  { name: "Inglés 2", unlocks: ["Inglés 3"] },
  { name: "Psicopatología 1", unlocks: ["Psicopatología 2"] },
  { name: "Psicología del Desarrollo 1", unlocks: ["Psicología del Desarrollo 2"] },
  { name: "Psicología Social 2" },
  { name: "Neuropsicología 2" },
  { name: "Metodología de la Investigación Cuantitativa", unlocks: ["Taller de investigación"] },
  { name: "Psicometría 1", unlocks: ["Psicometría 2"] },
  { name: "Inglés 3", unlocks: ["Inglés 4"] },
  { name: "Psicopatología 2", unlocks: ["Taller Clínico 1"] },
  { name: "Psicología del Desarrollo 2", unlocks: ["Fundamentos Conceptuales de la Clínica Infanto Juvenil"] },
  { name: "Psicología del Aprendizaje", unlocks: ["Psicología Educacional 1"] },
  { name: "Psicología del Trabajo y de las Organizaciones", unlocks: ["Comportamiento Humano en las Organizaciones"] },
  { name: "Psicometría 2" },
  { name: "Inglés 4" },
  { name: "Psicología Educacional 1", unlocks: ["Psicología Educacional 2"] },
  { name: "Comportamiento Humano en las Organizaciones", unlocks: ["Gestión de Recursos Humanos"] },
  { name: "Fundamentos Conceptuales de la Clínica Psicoanalítica" },
  { name: "Fundamentos Conceptuales de la Clínica Cognitiva" },
  { name: "Análisis de Problemas Psicosociales" },
  { name: "Taller de investigación" },
  { name: "Psicología Educacional 2", unlocks: ["Taller Educacional 1"] },
  { name: "Fundamentos Conceptuales de la Clínica Sistémica" },
  { name: "Fundamentos Conceptuales de la Clínica Infanto Juvenil" },
  { name: "Gestión de Recursos Humanos", unlocks: ["Taller de Análisis de las Organizaciones"] },
  { name: "Taller Educacional 1", unlocks: ["Taller Educacional 2"] },
  { name: "Taller de Análisis de las Organizaciones", unlocks: ["Taller de Cambio en las Organizaciones"] },
  { name: "Taller Clínico 1", unlocks: ["Taller Clínico 2"] },
  { name: "Taller Educacional 2", unlocks: ["Seminario de Tesis"] },
  { name: "Taller de Cambio en las Organizaciones", unlocks: ["Seminario de Tesis"] },
  { name: "Taller Clínico 2", unlocks: ["Seminario de Tesis"] },
  { name: "Seminario de Tesis", unlocks: ["Tesis"] },
  { name: "Práctica Profesional", unlocks: ["Tesis"] },
  { name: "Tesis" }
];

const malla = document.getElementById('malla');
const state = {};

courses.forEach((course, index) => {
  const div = document.createElement('div');
  div.className = 'course';
  div.textContent = course.name;
  div.dataset.name = course.name;
  state[course.name] = { element: div, unlocked: index < 5 };

  if (!state[course.name].unlocked) {
    div.classList.add('locked');
  }

  div.addEventListener('click', () => {
    if (!state[course.name].unlocked || div.classList.contains('approved')) return;
    div.classList.add('approved');
    if (course.unlocks) {
      course.unlocks.forEach(name => {
        const target = state[name];
        if (target && !target.unlocked) {
          target.unlocked = true;
          target.element.classList.remove('locked');
        }
      });
    }
  });

  malla.appendChild(div);
});
