const database = require("./database");
/*
// INSERINDO UM DADO
const data = {
  nome: "CRASH BANDICOOT",
  preco: 100,
};
// VÁRIOS DADOS
const dataArr = [
  {
    nome: "Prince of persia",
    preco: 20,
  },
  {
    nome: "Valorant",
    preco: 0,
  },
];
database
  .insert(dataArr)
  .into("games")
  .then((d) => {
    console.log("SUCESSSO", d);
  })
  .catch((e) => console.error("ERROR", e));

  */
/*
// SELECT
database
  .select(["id", "preco"])
  .into("games")
  .then((g) => {
    console.log(g);
  })
  .catch((error) => {
    console.error(error);
  });
*/
// database
//   .insert({nome:"GOD OF WAR", preco:300})
//   .into("games")
//   .then((d) => {
//     console.log("SUCESSSO", d);
//   })
//   .catch((e) => console.error("ERROR", e));

async function InsertAndGet() {
  try {
    const response = await database
      .insert({ nome: "GOD OF WAR", preco: 300 })
      .into("gamess");
    console.log(response);
    // const consult = await response.select("*").into("games");
    // console.log(consult);
  } catch (error) {
    console.error(error);
  }
}
// InsertAndGet();

async function condicionalGet() {
  try {
    const response = await database.where({ nome: "GOD OF WAR" }).into("games");
    console.log(response);
  } catch (error) {
    console.error(error);
  }
}
// condicionalGet();
async function condicionalDelete() {
  try {
    const response = await database.where({ id: 6 }).del("*").into("games");
    console.log(response);
  } catch (error) {
    console.error(error);
  }
}

// deleteCondicional();
async function condicionalUpdate() {
  try {
    const response = await database
      .where({ id: 3 })
      .update({ preco: 0 })
      .into("games");
    console.log(response);
  } catch (error) {
    console.error(error);
  }
}
condicionalUpdate();

async function orderBy() {
  try {
    const result = await database
      .select()
      .into("games")
      .orderBy("preco", "desc");
    console.log(result);
  } catch (error) {
    console.error(error);
  }
}
orderBy();
