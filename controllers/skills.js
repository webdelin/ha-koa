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
  exports.add = (data) => new Promise(async (resolve, reject) => {
    JSON.stringify(data)
    try {
      let skills = [];
      let newSkills = skills.slice()
      newSkills.push(
        {"number": data.age, text:"Возраст начала занятий на скрипке"},
        {"number": data.concerts, text: 'Концертов отыграл'},
        {"number": data.cities, text: 'Максимальное число городов в туре'},
        {"number": data.years, text: 'Лет на сцене в качестве скрипача'},
      );
      fs.writeFileSync(path.join(process.cwd(), '/temp/skills.json'),JSON.stringify(newSkills));
  //console.log('newSkills' , data)
      resolve(true);
    
  }
  catch(err) {
    reject(err);
  }
});
