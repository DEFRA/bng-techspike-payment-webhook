const { getEvents } = require('../lib/pay-events')

module.exports = async function (context, req) {
    context.log('JavaScript HTTP trigger function processed a request.');

    const reference = req.query.reference;
    const responseMessage = await getEvents(reference)

    context.res = {
        // status: 200, /* Defaults to 200 */
        body: responseMessage,
        headers: {
            'Content-Type': 'application/json'
        }
    };
}
