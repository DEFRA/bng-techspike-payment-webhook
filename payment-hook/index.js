const { verifyGovPay } = require('../lib/verify-pay-signature')
const { createEvent } = require('../lib/pay-events')

module.exports = async function (context, req) {
    context.log('Web hook received');
     
    if (!verifyGovPay(req.body, req.headers, process.env.WEBHOOK_SIGNING_SECRET)) {
        context.log.info('Request not from GOV Pay')

        context.res = {
            status: 403
        }

        return;
    }

    context.log.info('Request verified from GOV Pay')
        
    const event = {
        partitionKey: req.body.resource.reference,
        rowKey: req.body.webhook_message_id,
        timestamp: req.body.created_date,
        event_type: req.body.event_type,
        payment_status: req.body.resource?.state?.status,
        payment_finished: req.body.resource?.state?.finished,
        event: JSON.stringify(req.body)
    }

    await createEvent(event)
}
