import { GENDER_SPECIFIC_PLAN_TYPES } from "./settings";

export function processRawAirtableRecords(rawAirtableRecords) {
  // filter out rows with empty Plan Type
  const airtableRecordsFiltered = rawAirtableRecords.filter(
    (row) => row["Plan Type"]
  );

  const processedAirtableRecords = airtableRecordsFiltered.map((record) => {
    let newRecord = {};
    for (var key of Object.keys(record)) {
      const value = record[key];

      if (Array.isArray(value)) {
        if (value[0]) {
          typeof value[0] === "string"
            ? (newRecord[key] = value[0].trim())
            : (newRecord[key] = value[0].toString().trim());
        } else {
          newRecord[key] = null;
        }
      } else {
        typeof value === "string"
          ? (newRecord[key] = value.trim())
          : (newRecord[key] = value.toString().trim());
      }
    }
    return newRecord;
  });

  return processedAirtableRecords;
}

export function filterHospitals(
  processedPlansRecords,
  planTypes,
  genders,
  locations
) {
  if (!processedPlansRecords) return null;

  let planTypesArray = [];
  if (!Array.isArray(planTypes)) planTypesArray.push(planTypes);
  else planTypesArray = planTypes;

  let gendersArray = [];
  if (!Array.isArray(genders)) gendersArray.push(genders);
  else gendersArray = genders;

  let locationsArray = [];
  if (!Array.isArray(locations)) locationsArray.push(locations);
  else locationsArray = locations;

  let filtered = processedPlansRecords.filter(function (record) {
    return planTypesArray.includes(record["Plan Type"]);
  });

  if (GENDER_SPECIFIC_PLAN_TYPES.includes(planTypes)) {
    if (gendersArray[0] === "Both") {
      gendersArray = ["Male"];
    }
  } else {
    if (gendersArray[0] !== "Both") gendersArray = ["Both"];
  }

  if (gendersArray.length > 0)
    filtered = filtered.filter(function (record) {
      return gendersArray.includes(record["Gender"]);
    });

  if (locationsArray.length > 0)
    filtered = filtered.filter(function (record) {
      return locationsArray.includes(record["Location"]);
    });

  filtered.sort((a, b) => {
    if (a["Hospital"] && b["Hospital"]) {
      return a["Hospital"].localeCompare(b["Hospital"]);
    } else return null;
  });
  return filtered;
}

export const getHospitalInfo = function (processedServicePlansRecords) {
  const hospitalInfoTemp = [];
  const hospitalMap = new Map(); // keep track of hospitals that have been added
  for (const record of processedServicePlansRecords) {
    if (!hospitalMap.has(record["Hospital"])) {
      hospitalMap.set(record["Hospital"], true);
      hospitalInfoTemp.push({
        hospital: record["Hospital"],
        hospitalCN: record["醫院"],
        buttonLabel: record["Button Label"],
        hospitalHours: record["Hospital Hours"],
        hospitalHoursCN: record["開放時間"],
        telephone: record["Telephone"],
        location: record["Location"],
        address: record["Address"],
        addressCN: record["Address CN"],
        addressLink: record["Address Link"],
        booking: record["Booking"],
        bookingCN: record["Booking CN"],
        website: record["Website"],
        websiteCN: record["Website CN"],
        planType: [record["Plan Type"]],
      });
    }
    const hospitalInArray = hospitalInfoTemp.find(
      (hospital) => hospital.hospital === record["Hospital"]
    );
    if (!hospitalInArray.planType.includes(record["Plan Type"])) {
      hospitalInArray.planType.push(record["Plan Type"]);
    }
  }
  // Sort by Hospital
  hospitalInfoTemp.sort((a, b) => {
    if (a.hospital && b.hospital) {
      return a.hospital.localeCompare(b.hospital);
    } else return null;
  });
  return hospitalInfoTemp;
};
