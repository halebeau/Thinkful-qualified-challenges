const LinkedList = require("./linkedList");

const linkedList = new LinkedList();

linkedList.insert({
  id: "ba96e669-7a46-46c5-95fe-0f3e02221882",
  first_name: "Rosalie",
  last_name: "Grisedale",
  email: "rgrisedale0@delicious.com",
});

linkedList.insert({
  id: "3651fe4f-2e29-48f3-98dd-d7e90349a4d4",
  first_name: "Gennifer",
  last_name: "Sarfat",
  email: "gsarfat1@techcrunch.com",
});

linkedList.insert({
  id: "96e9d139-aa21-4182-9361-46eb62b954c0",
  first_name: "Melodie",
  last_name: "Baudains",
  email: "mbaudains2@nba.com",
});

linkedList.insert({
  id: "4a47c19a-3c4d-4e57-bd8d-920b1e10fcec",
  first_name: "Sayres",
  last_name: "Massel",
  email: "smassel3@aboutads.info",
});

linkedList.insert({
  id: "07f6cab3-0131-4a53-bd02-7e64c98eecaf",
  first_name: "Finlay",
  last_name: "Cellier",
  email: "fcellier4@cafepress.com",
});

console.log(JSON.stringify(linkedList, null, 2));
