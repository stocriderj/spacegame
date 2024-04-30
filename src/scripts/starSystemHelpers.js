const spectralClasses = {
  O: {
    temperature: [30000, 60000],
    color: "Blue",
  },
  B: {
    temperature: [10000, 30000],
    color: "Blue-White",
  },
  A: {
    temperature: [7500, 10000],
    color: "White",
  },
  F: {
    temperature: [6000, 7500],
    color: "White-Yellow",
  },
  G: {
    temperature: [5200, 6000],
    color: "Yellow",
  },
  K: {
    temperature: [3700, 5200],
    color: "Orange",
  },
  M: {
    temperature: [2400, 3700],
    color: "Red",
  },
};

function generateStarName() {
  const prefixes = [
    "Alpha",
    "Beta",
    "Gamma",
    "Delta",
    "Epsilon",
    "Zeta",
    "Eta",
    "Theta",
    "Iota",
    "Kappa",
    "Lambda",
    "Mu",
    "Nu",
    "Xi",
    "Omicron",
    "Pi",
    "Rho",
    "Sigma",
    "Tau",
    "Upsilon",
    "Phi",
    "Chi",
    "Psi",
    "Omega",
  ];
  const suffixes = [
    "Majoris",
    "Minoris",
    "Centauri",
    "Lyrae",
    "Pegasi",
    "Aquarii",
    "Coronae",
    "Virginis",
    "Arietis",
    "Draconis",
    "Canis",
    "Hydrae",
    "Crucis",
    "Leporis",
    "Ursae",
    "Ceti",
    "Orionis",
    "Librae",
    "Scorpii",
    "Capricorni",
    "Sagittae",
    "Andromedae",
    "Cephei",
    "Cygni",
  ];
  const prefix = prefixes[Math.floor(Math.random() * prefixes.length)];
  const suffix = suffixes[Math.floor(Math.random() * suffixes.length)];
  const designation = `${Math.round(Math.random() * 10)}${Math.round(Math.random() * 10)}${Math.round(Math.random() * 10)}${Math.round(Math.random() * 10)}`;
  return `${prefix} ${suffix} ${designation}`;
}

function getRandomSpectralClass() {
  const keys = Object.keys(spectralClasses);
  return keys[Math.floor(Math.random() * keys.length)];
}

function getAttributeBySpectralClass(spectralClass, attribute) {
  const min = spectralClasses[spectralClass][attribute][0];
  const max = spectralClasses[spectralClass][attribute][1];
  return Math.random() * (max - min) + min;
}

export function generateStar() {
  const name = generateStarName();
  const spectralClass = getRandomSpectralClass();
  const temperature = getAttributeBySpectralClass(spectralClass, "temperature");
  const color = spectralClasses[spectralClass].color;

  return {
    name,
    spectralClass,
    temperature: Math.round(temperature),
    color,
  };
}

export function generatePlanets() {
  const planets = [];
  const planetDensity = Math.random();

  const types = ["Terrestrial", "Continental", "Gaseous", "Ice", "Oceanic"];

  for (let i = 0; i < 8; i++) {
    if (Math.random() < planetDensity) {
      const type = types[Math.floor(Math.random() * types.length)];

      let pressure;
      const iridite =
        type === "Gaseous" ? 0 : Math.round(Math.random() * 100000);
      switch (type) {
        case "Gaseous":
          pressure = Math.random() * 1000000 + 100000;
          break;
        case "Terrestrial":
          pressure = Math.random() * 1000;
          break;
        case "Continental":
        case "Oceanic":
          pressure = Math.random() * 100000 + 80000;
          break;
        case "Ice":
          pressure = Math.random() * 100;
          break;
        default:
          pressure = 0;
      }

      const radius = Math.random() * 99900 + 100;

      planets.push({
        type,
        pressure: Math.round(pressure),
        radius: Math.round(radius),
        iridite,
      });
    } else {
      planets.push(null);
    }
  }

  return planets;
}

const star = generateStar();
console.log(star);
const planets = generatePlanets();
console.log(planets);
