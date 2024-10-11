export const profile = {
  userName: '',
  email: '',
  image: '',
};

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
