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

export function filterHospitals({
  processedPlansRecords,
  planTypes,
  genders,
  locations,
}) {
  // console.log("processedPlansRecords");
  // console.log(processedPlansRecords);

  const planTypesChecked = [];
  if (!Array.isArray(planTypes)) planTypesChecked.push(planTypes);
  else planTypesChecked = planTypes;

  const gendersChecked = [];
  if (!Array.isArray(genders)) gendersChecked.push(genders);
  else gendersChecked = genders;

  const locationsChecked = [];
  if (!Array.isArray(locations)) locationsChecked.push(locations);
  else locationsChecked = locations;

  const filtered = processedPlansRecords.filter(function (record) {
    return (
      planTypesChecked.includes(record["Plan Type"]) &&
      gendersChecked.includes(record["Gender"]) &&
      locationsChecked.includes(record["Location"])
    );
  });
  // console.log("planTypesChecked");
  // console.log(planTypesChecked);
  // console.log("gendersChecked");
  // console.log(gendersChecked);
  // console.log("hospitalsChecked");
  // console.log(hospitalsChecked);

  // console.log("filtered");
  // console.log(filtered);

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
