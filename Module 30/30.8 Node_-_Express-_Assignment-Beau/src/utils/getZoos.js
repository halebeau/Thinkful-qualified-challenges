const zoos = {
  33890: [
    "HARDEE COUNTY BOARD OF COUNTY COMMISSION, Zolfo Springs, Florida",
    "PEACE RIVER REFUGE & RANCH INC, Zolfo Springs, Florida",
  ],
  "02121": ["COMMONWEALTH ZOOLOGICAL CORPORATION, Boston, Massachusetts"],
  34117: [
    "CLOSE UP CREATURES L L C, Naples, Florida",
    "KOWIACHOBEE ANIMAL PRESERVE INC, Naples, Florida",
    "PRIVATE OWNER, Naples, Florida",
  ],
  "07502": [],
  10460: ["WILDLIFE CONSERVATION SOCIETY, Bronx, New York"],
};

function getZoos(zip = "all") {
  if (zip === "all") {
    return Object.values(zoos).flat();
  }

  return zoos[zip];
}

module.exports = getZoos;
