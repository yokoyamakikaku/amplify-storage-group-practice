/**
 * @type {import('@types/aws-lambda').PreTokenGenerationTriggerHandler}
 */
exports.handler = async (event) => {
  const groupConfiguration  = event.request.groupConfiguration

  /** @type {string[]} */
  const groupsToOverride = groupConfiguration.groupsToOverride ?? []
  /** @type {string[]} */
  const iamRolesToOverride = groupConfiguration.iamRolesToOverride ?? []
  /** @type {string[]} */
  const preferredRole = groupConfiguration.preferredRole ?? []

  // NOTE: グループの追加
  groupsToOverride.push(...['additional-group-1', 'additional-group-2'])

  event.response = {
    claimsOverrideDetails: {
      claimsToAddOrOverride: {
        attribute_key1: 'attribute_value1',
        attribute_key2: 'attribute_value2',
      },
      groupOverrideDetails: {
        groupsToOverride: groupsToOverride,
        iamRolesToOverride: iamRolesToOverride,
        preferredRole: preferredRole,
      },
      claimsToSuppress: ['attribute_key3'],
    },
  };
  // Return to Amazon Cognito
  return event;
};
