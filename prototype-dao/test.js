const test = document.getElementById("test");
console.log(test);
test.addEventListener("click", async (e) => {
  let logements = await LogementDao.ListerLogement(-71.2399, 46.8138, 2, 0, 1000);
  let logement = await LogementDao.RecupererLogementParId(3);
  console.log(logement);
  console.log(logements);
});
