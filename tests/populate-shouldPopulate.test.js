const populator = require('../src/');

const populateData = {
  domain_1: {
    field_1: 'value 1',
  }
}

let {
  populate,
  massPopulate,
  populateFactory
} = populator(true, populateData);

test('it will return populate value', () => {
  const initial_value = 'initial_value';

  const outcome = populate('domain_1', 'field_1', initial_value);

  expect(outcome).toBe(populateData['domain_1']['field_1']);
});

test('it will return populate fields value', () => {
  const initial_value = 'initial_value';

  const outcome = massPopulate('domain_1', {
    field_1: initial_value
  });

  expect(outcome).toEqual(populateData['domain_1']);
});

test('it will return populate function of certain domain', () => {
  const initial_value = 'initial_value';

  const populate = populateFactory('domain_1');
  const outcome = populate('field_1', initial_value);

  expect(outcome).toBe(populateData['domain_1']['field_1']);
});

test('it will throw error on empty initial value', () => {
  const test = () => {
    populate('domain_1', 'field_1');
  }

  expect(test).toThrow(Error);
  expect(test).toThrow('Initial Value is invalid');
});

test('it will throw error on populate value and initial value mismatch', () => {
  const initial_value = 0;
  const test = () => {
    populate('domain_1', 'field_1', initial_value);
  }

  expect(test).toThrow(TypeError);
  expect(test).toThrow(`domain_1.field_1 is ${populateData['domain_1']['field_1'].constructor.name}, and initial value is ${initial_value.constructor.name}`);
});
