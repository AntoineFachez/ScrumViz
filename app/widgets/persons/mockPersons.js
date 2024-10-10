export const persons = [
  {
    id: 'a164ca85-671f-422b-8493-a61898882bfb',
    name: 'Alice Boer',
    firstName: 'Alice',
    lastName: 'Boer',
  },
  {
    id: '25ac2b23-573e-4b84-807e-32af48d4d06c',
    name: 'Bob Lincke',
    firstName: 'Bob',
    lastName: 'Lincke',
  },
  {
    id: 'd54ffc3a-332f-498e-9aca-9aafb5bf780e',
    name: 'Charlie Friedman',
    firstName: 'Charlie',
    lastName: 'Friedman',
  },
  {
    id: 'f92389c9-65d4-4a7b-a3fa-c4a2f47a1653',
    name: 'David Pakman',
    firstName: 'David',
    lastName: 'Pakman',
  },
  {
    id: '230d78ae-73c6-4609-ac77-d676ff8d6d03',
    name: 'Eve Cortez',
    firstName: 'Eve',
    lastName: 'Cortez',
  },
  {
    id: 'd1de71e0-542d-494d-a2b1-00860e6c8d0a',
    name: 'Frank Shorn',
    firstName: 'Frank',
    lastName: 'Shorn',
  },
  {
    id: 'e6bfe037-a681-405e-81ec-2b421075c09d',
    name: 'Grace Ritz',
    firstName: 'GraceE',
    lastName: 'Ritz',
  },
  {
    id: '6cb38473-520f-4b38-accb-905d0e52fdf3',
    name: 'Henry Scolotti',
    firstName: 'Henry',
    lastName: 'Scolotti',
  },
  {
    id: 'c78ae857-fed7-4c38-b38d-5b74a6395c7a',
    name: 'Ivy Natal',
    firstName: 'Ivy',
    lastName: 'Natal',
  },
  {
    id: '5f42648d-4dae-4ead-9a34-e0360e03f464',
    name: 'Jack Smith',
    firstName: 'Jack',
    lastName: 'Smith',
  },
];

export function generateMockPerson(member) {
  const [firstName, lastName] = member.name.split(' ');
  const birthDate = getRandomBirthDate();
  const education = generateRandomEducation();
  const location = generateRandomLocation();
  return {
    firstName,
    lastName,
    location,
    birthDate,
    education,
  };
}
const cities = ['New York', 'London', 'Tokyo', 'Berlin', 'Paris'];
const certificates = [
  'Bachelor of Science',
  'Master of Arts',
  'PhD',
  'Diploma',
];

function getRandomBirthDate() {
  const start = new Date(1970, 0, 1); // January 1, 1970
  const end = new Date(2006, 0, 1); // Today
  const diff = end.getTime() - start.getTime();
  const randomDate = new Date(start.getTime() + Math.random() * diff);
  return randomDate.toISOString().split('T')[0]; // YYYY-MM-DD
}
const generateRandomLocation = () => {
  const location = cities[Math.floor(Math.random() * cities.length)];
  return location;
};
function generateRandomEducation() {
  const numCertificates = Math.floor(Math.random() * 3) + 1; // 1 to 3 certificates
  const education = [];
  for (let i = 0; i < numCertificates; i++) {
    const certificate =
      certificates[Math.floor(Math.random() * certificates.length)];
    const city = cities[Math.floor(Math.random() * cities.length)];
    education.push({ certificate, city });
  }

  return education;
}
