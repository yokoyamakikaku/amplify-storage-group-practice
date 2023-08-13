/**
 * @type {import('@types/aws-lambda').APIGatewayProxyHandler}
 */
exports.handler = async (event) => {
    event.response = {
        claimsOverrideDetails: {
          claimsToAddOrOverride: {
            my_first_attribute: "first_value",
            my_second_attribute: "second_value",
          },
          claimsToSuppress: ["email"],
        },
    };

    return event;
};
