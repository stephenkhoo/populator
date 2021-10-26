module.exports = function (shouldPopulate, populateData) {

  const populate = function (domain, name, initialValue) {
    if (!shouldPopulate) return initialValue;

    let populateValue = populateData[domain][name];
    if (populateValue.constructor.name !== initialValue.constructor.name) {
      console.error('Type of initial value is not match with provided populate data\'s value');
    }

    return populateData[domain][name];
  }

  const populateFactory = function (domain) {
    return function (name, initialValue) {
      return populate(domain, name, initialValue);
    };
  }


  const massPopulate = function (domain, fields) {
    if (!shouldPopulate) return fields;

    let result = {};
    Object.keys(fields).forEach((name) => {
      result[name] = filler(domain, name);
    });

    return result;
  }

  return {
    populate, massPopulate, populateFactory
  };
}
