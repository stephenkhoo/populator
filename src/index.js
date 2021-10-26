module.exports = function (shouldPopulate, populateData) {

  const populate = function (domain, name, initialValue) {
    if (!shouldPopulate) return initialValue;

    let populateValue = populateData[domain][name];
    if (initialValue === null || initialValue === undefined) {
      throw new Error('Initial Value is invalid');
    }
    if (populateValue.constructor.name !== initialValue.constructor.name) {
      throw new TypeError(`${domain}.${name} is ${populateValue.constructor.name}, and initial value is ${initialValue.constructor.name}`);
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
    Object.entries(fields).forEach(([name, initialValue]) => {
      result[name] = populate(domain, name, initialValue);
    });

    return result;
  }

  return {
    populate, massPopulate, populateFactory
  };
}
