/**
 * @type {import('@types/aws-lambda').PreTokenGenerationTriggerHandler}
 */
exports.handler = async (event) => {
  event.response = {
    claimsOverrideDetails: {
      claimsToAddOrOverride: {
        attribute_key1: 'attribute_value1',
        attribute_key2: 'attribute_value2',
        ['cognito:groups']: ['appended-group-pretoken-generation']
      },
      claimsToSuppress: ['attribute_key3'],
    },
  };
  // Return to Amazon Cognito
  return event;
};
