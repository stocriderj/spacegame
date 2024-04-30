import { generateStar, generatePlanets } from "./starSystemHelpers";
import supabase from "../supabase";
import { randomNumber } from "./helpers";

async function getGalaxy() {try {
      let {data, error} = await supabase.from("galaxy").select("*");
      if (error) {
        console.error(error);
      } else {
      return data;}
    } catch (error) {
      console.error(error);
    }}

async function addStarSys(starSys) {
  try {
    let {data, error} = await supabase.from("galaxy").insert([starSys]);
    if (error) {
      console.error(error);
    } else {
      console.log("Star system added successfully:  " + data);
    }
  } catch (error) {
    console.error(error);
  }
}

export default async function seed(){
for (let i = 0; i < 10; i++) {
  
    const galaxy = await getGalaxy();
  console.log(galaxy);

  let coordinates;
  while (galaxy.filter(galaxy => galaxy.coordinates == coordinates).length > 0 || !coordinates) {
    coordinates = {x:randomNumber(-100, 100), y:randomNumber(-100, 100)};
  }
  
  const star = generateStar();
const starSystem = {star, planets: generatePlanets(), name: star.name, coordinates};

  addStarSys(starSystem)
  console.log(starSystem);
}}