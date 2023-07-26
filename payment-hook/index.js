const { TableClient, AzureNamedKeyCredential } = require('@azure/data-tables')
const crypto = require('crypto')

const credential = new AzureNamedKeyCredential(process.env.STORAGE_ACCOUNT_NAME, process.env.STORAGE_ACCOUNT_KEY)

module.exports = async function (context, req) {
    context.log('Web hook received');
  
    const hmac = crypto.createHmac('sha256', process.env.WEBHOOK_SIGNING_SECRET)
        .update(JSON.stringify(req.body))
        .digest('hex')
    
    if (!req.headers['pay-signature'] || hmac !== req.headers['pay-signature']) {
        context.log.info('Request not from GOV Pay')

        context.res = {
            status: 403
        }

        return;
    }

    context.log.info('Request verified from GOV Pay')
    
    const tableClient = new TableClient(process.env.TABLE_STORAGE_URL, process.env.EVENT_TABLE_NAME, credential)
    
    const event = {
        partitionKey: req.body.resource.reference,
        rowKey: req.body.webhook_message_id,
        timestamp: req.body.created_date,
        event_type: req.body.event_type,
        payment_status: req.body.resource?.state?.status,
        payment_finished: req.body.resource?.state?.finished,
        event: JSON.stringify(req.body)
    }

    await tableClient.createEntity(event)
}
