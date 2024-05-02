// import { generateStar, generatePlanets } from "./starSystemHelpers";
import supabase from "../supabase";
import {randomNumber} from "./helpers";

async function getGalaxy() {
  try {
    let {data, error} = await supabase.from("galaxy").select("*");
    if (error) {
      console.error(error);
    } else {
      return data;
    }
  } catch (error) {
    console.error(error);
  }
}

async function addStar(starSys) {
  try {
    let {data, error} = await supabase
      .from("galaxy")
      .insert([starSys])
      .select();
    if (error) {
      console.error(error);
    } else {
      console.log("Star system added successfully:  ", data[0]);
      return data[0];
    }
  } catch (error) {
    console.error(error);
  }
}

async function addPlanet(planet) {
  try {
    let {data, error} = await supabase.from("planets").insert([planet]);
    if (error) {
      console.error("Error adding planet: ", error);
    } else {
      console.log("Planet added successfully: ", planet);
    }
  } catch (error) {
    console.error(error);
  }
}

// -----------------
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
  const designation = `${Math.round(Math.random() * 10)}${Math.round(
    Math.random() * 10
  )}${Math.round(Math.random() * 10)}${Math.round(Math.random() * 10)}`;
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

export async function generateStar() {
  const galaxy = await getGalaxy();
  console.log(galaxy);

  const name = generateStarName();
  const spectralClass = getRandomSpectralClass();
  const temperature = getAttributeBySpectralClass(spectralClass, "temperature");
  const color = spectralClasses[spectralClass].color;

  let coordinates;
  while (
    galaxy.filter(galaxy => galaxy.coordinates == coordinates).length > 0 ||
    !coordinates
  ) {
    coordinates = {x: randomNumber(-100, 100), y: randomNumber(-100, 100)};
  }

  return await addStar({
    name,
    coordinates,
    spectral_class: spectralClass,
    temperature: Math.round(temperature),
    color,
  });
}

export function generatePlanets(star) {
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

      const radius =
        type === "Gaseous"
          ? Math.random() * 100000 + 50000
          : Math.random() * 49000 + 1000;

      planets.push({
        type,
        star_id: star.id,
        owner_id: null,
        name: `${star.name} ${i + 1}`,
        pressure: Math.round(pressure),
        radius: Math.round(radius),
        iridite,
        orbit: i + 1,
      });
    } else {
      if (Math.random() > 0.6) {
        planets.push({
          type: "Space Dust",
          star_id: star.id,
          name: `${star.name} Space Dust ${i + 1}`,
          iridite: Math.round(Math.random() * 100000 + 5000),
          orbit: i + 1,
        });
      } else {
        planets.push({
          type: "Empty Space",
          star_id: star.id,
          name: `Empty Space`,
          iridite: Math.round(Math.random() * 1000),
          orbit: i + 1,
        });
      }
    }
  }

  return planets;
}

// const star = generateStar();
// console.log(star);
// const planets = generatePlanets(star);
// console.log(planets);

// -----------------

export default async function seed() {
  for (let i = 0; i < 1; i++) {
    const star = await generateStar();
    console.log(star);
    const planets = generatePlanets(star);
    console.log(planets);

    for (let planet of planets) {
      console.log(planet);
      addPlanet(planet);
    }
  }
}
