import fs from 'fs';
import path from 'path';
import repl from 'repl';
import db from 'src/db/models';

const { sequelize } = db;
const envName = process.env.NODE_ENV || "dev";

// open the repl session
const replServer = repl.start({
  prompt: "app - " + envName + " >> ",
});

// attach my modules to the repl context
replServer.context.db = db;
replServer.context.path = path;
replServer.context.fs = fs;
replServer.context.dirname = __dirname;
replServer.context.filename = __filename;
replServer.context.getAll = getAll;
replServer.context.findExistingIngredients = findExistingIngredients;
replServer.context.determineNewIngredients = determineNewIngredients;

function getAll(modelName) {
  db[modelName].findAll().then(res => {
    res.forEach(record => {
      console.log('*** RECORD START ***');
      console.log(record.dataValues || 'No Record Found');
      console.log('*** RECORD END ***');
    });
  });
}

// test product data
//
// const data = {
//   product: {
//     addedSugars: "5",
//     barcodeValue: "12345",
//     brand: "test brand two",
//     calcium: "70",
//     calories: "100",
//     cholesterol: "123",
//     dietaryFiber: "5",
//     ingredient: "",
//     ingredients: [
//       {name: "test one"},
//       {name: "test two"},
//       {name: "test three"},
//       {name: "test four"},
//       {name: "test five"},
//       {name: "test six"},
//       {name: "test seven"},
//       {name: "test eight"},
//     ],
//     iron: "80",
//     name: "test name two",
//     protein: "10",
//     saturatedFat: "5",
//     servingSize: "100g",
//     servingsPerContainer: "2",
//     sodium: "12",
//     totalCarbs: "20",
//     totalFat: "15",
//     totalSugars: "10",
//     transFat: "10",
//     vitaminA: "50",
//     vitaminC: "60",
//   }
// };

//
// let ingredientList = [
//   { name: 'test one' },
//   { name: 'test two' },
//   { name: 'test three' },
//   { name: 'test four' },
//   { name: 'test five' },
// ];
//
// let exi;
// db.ingredient.getExistingIngredients({
//   ingredients: ingredientList
// }).then(r => {
//   exi = r;
// });
//
// nexi = db.ingredient.determineNewIngredients({
//   ingredients: ingredientList,
//   existingIngredients: exi,
// });
//
// let newIngr;
//
// db.ingredient.createNewIngredients({
//   ingredients: nexi,
// }).then(r => {
//   console.log(r);
//   newIngr = r;
// });
//
// newIngr.forEach(i => {
//   const raw = i.get({ raw: true });
//   console.log(raw);
// });


// ***
// some useful sequelize queries
// ***

// db.politician.findAll({
//   include: [
//     db.officeHolderTerm,
//     db.contactInfo,
//   ]
// }).then(res => {
//   politician = res[0].dataValues;
// });
//
// politician.officeHolderTerms[0].dataValues
// politician.contactInfos[0].dataValues
//
// db.contactInfo.create({
//   ...contactInfoPolitician,
//   id: null,
//   politicianId: null,
//   officeHolderTermId: officeHolderTerm.id
// }).then(res => {
//   contactInfoOht = res;
// });
//
// db.politician.findAll({
//   include: [{
//     model: db.officeHolderTerm,
//     required: true,
//     where: {
//       levelOfResponsibility: 'district',
//       areaOfResponsibility: '1',
//     },
//     include: [{
//       model: db.contactInfo,
//       required: true,
//       where: {
//         city: { ilike: 'new haven' },
//         state: { ilike: 'connecticut' },
//       },
//     }],
//   }],
// }).then(res => {
//   result = res;
// });
//
// result[0].dataValues.officeHolderTerms[0].dataValues
//
// db.politician.findAll({
//   include: [ db.contactInfo ],
// }).then(res => {
//   res.forEach(item => {
//     console.log(item.get({ plain: true }));
//   });
// });
