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
} = populator(false, populateData);

test('it will return initial_value', () => {
  const initial_value = 'initial_value';

  const outcome = populate('domain_1', 'field_1', initial_value);

  expect(outcome).toBe(initial_value);
});

test('it will return populate fields value', () => {
  const initial_value = 'initial_value';

  const outcome = massPopulate('domain_1', {
    field_1: initial_value
  });

  expect(outcome).toEqual({
    field_1: initial_value
  });
});

test('it will return populate function of certain domain', () => {
  const initial_value = 'initial_value';

  const populate = populateFactory('domain_1');
  const outcome = populate('field_1', initial_value);

  expect(outcome).toBe(initial_value);
});
