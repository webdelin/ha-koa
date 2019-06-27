const fs = require('fs');
const path = require('path');

const skillsPath = path.join(__dirname, '../temp/skills.json');

exports.get = () => new Promise(async (resolve, reject) => {
  try {
    let skills = [];
    if (fs.existsSync(skillsPath)) {
      skills = JSON.parse(fs.readFileSync(skillsPath, 'utf-8'));
    }
    resolve(skills);
  }
  catch(err) {
    reject(err);
  }
});

exports.add = (age, concerts, cities, years) => new Promise(async (resolve, reject) => {
  console.log(resolve, reject)
  try {
    if (!age == age) {
      reject('All fields age');
      return;
    } else if (!concerts == concerts) {
      reject('All fields concerts ');
      return;
    } else if (!cities == cities) {
      reject('All fields cities');
      return;
    } else if (!years == years) {
      reject('All fields years');
      return;
    }

    let skills = [];
    if (fs.existsSync(skillsPath)) {
      skills = JSON.parse(fs.readFileSync(skillsPath, 'utf-8'));
    }
    let newSkills = skills.slice();
    newSkills.push({
      "age": age,
      "concerts": concerts,
      "cities": cities,
      "years": years
    });

    fs.writeFileSync(path.join(process.cwd(), '/temp/skills.json'), JSON.stringify(newSkills));

    resolve(true);
  }
  catch(err) {
    reject(err);
  }
});
