//function for fetch data
const fetchData = async (url) => {
  try {
    const response = await fetch(url);
    const data = await response.json();
    if (response.ok) {
      return data;
    } else {
      throw new Error("Failed to fetch data");
    }
  } catch (err) {
    console.error("Error fetching data:", err.message);
  }
};

//function for input validation check
const onChangeValidationCheck = (fieldName, value) => {
  const emailRegex =
    /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;

  let fieldErrors = {};

  switch (fieldName) {
    case "name":
      fieldErrors.name = value.trim() === "" ? "Vendor name is required" : "";
      break;

    case "type":
      fieldErrors.type = value === "" ? "Vendor type is required" : "";
      break;

    case "criticality":
      fieldErrors.criticality = value === "" ? "Criticality is required" : "";
      break;

    case "status":
      fieldErrors.status = value === "" ? "Status is required" : "";
      break;

    case "contact":
      if (value.trim() === "") {
        fieldErrors.contact = "Contact email is required";
      } else if (!emailRegex.test(value)) {
        fieldErrors.contact = "Invalid email format";
      } else {
        fieldErrors.contact = "";
      }
      break;

    case "serviceProvided":
      fieldErrors.serviceProvided = value.trim() === "" ? "Service provided is required" : "";
      break;

    default:
      break;
  }

  return fieldErrors;
};

export  {fetchData, onChangeValidationCheck};