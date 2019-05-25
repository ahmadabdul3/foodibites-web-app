#!/usr/local/bin/node

function print(object) {
    console.log(object);
}

var ingredients = "Enriched Flour (Wheat Flour, Niacin, Reduced Iron, Thiamin Mononitrate [Vitamin B1],\
 Riboflavin [Vitamin B2], Folic Acid), Corn Syrup, High Fructose Corn Syrup, Dextrose, Soybean and\
 Palm Oil (with TBHQ for Freshness), Sugar, Contains Two Percent or Less of Cracker Meal, Wheat\
 Starch, Salt, Dried Strawberries, Dried Pears, Dried Apples, Cornstarch, Leavening (Baking Soda,\
 Sodium Acid Pyrophosphate, Monocalcium Phosphate), Milled Corn, Citric Acid, Gelatin, Caramel\
 Color, Soy Lecithin, Partially Hydrogenated Soybean and/or Cottonseed Oil (Less than 0.5 g Trans Fat\
 per Serving), Modified Corn Starch, Xanthan Gum, Modified Wheat Starch, Color Added, Vitamin A\
 Palmitate, Red 40, Niacinamide, Reduced Iron, Pyridoxine Hydrochloride (Vitamin B6), Yellow 6,\
 Riboflavin (Vitamin B2), Tricalcium Phosphate, Thiamin Hydrochloride (Vitamin B1), Turmeric\
 Color, Folic Acid, Blue 1.";

function getIngredientParts(ingredients) {
    const seperator = ',';
    const exceptions = {
        '(': true,
        '[': true,
    };
    const exceptionClosers = {
        ')': '(',
        ']': '[',
    };
    const exceptionsEncountered = [];
    const parts = [];
    let part = '';

    for (let i = 0; i < ingredients.length; i++) {
        const character = ingredients[i];
        if (!part && character === ',') continue;
        else if (exceptions[character]) {
            const exception = { character };
            exceptionsEncountered.push(exception);
            part += character;
        } else if (exceptionClosers[character]) {
            const exceptionCloser = exceptionClosers[character];
            const lastExceptionIndex = exceptionsEncountered.length - 1;
            const lastException = exceptionsEncountered[lastExceptionIndex];
            if (lastException.character === exceptionCloser) {
                exceptionsEncountered.pop();
            }
            part += character;
        } else if (character === ',') {
            if (exceptionsEncountered.length > 0) part += character;
            else {
                parts.push(part);
                part = '';
            }
        } else {
            part += character;
        }

        if (i === ingredients.length - 1) parts.push(part);
    }
    var ipart = parts;
    if (exceptionsEncountered.length > 0) return { parts, readyForAdding: false };
    parts.map((ingredient, index) => {
        if(ingredient.toLowerCase().includes("and")) {
            ipart = [
                ipart.slice(0, index),
                ingredient.split("and")[0],
                ingredient.split("and")[1],
                ipart.slice(index+1, ipart.length + 1)
            ].flat();
        }
    });
    parts.length = 0;
    parts.push(ipart.flat());
    return { parts, readyForAdding: true };
}

print(getIngredientParts(ingredients));

function parseIngredients(ingredientList) {
    
}

// var x = ['hello', 'there', 'general', 'kenobi'];
// var a = [
//     x.slice(0, 2),
//     "help",
//     x.slice(2, 5)
// ].flat();

// print(a)