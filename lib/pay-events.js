const { TableClient, AzureNamedKeyCredential, odata } = require('@azure/data-tables')

const credential = new AzureNamedKeyCredential(process.env.STORAGE_ACCOUNT_NAME, process.env.STORAGE_ACCOUNT_KEY)

const getClient = () => {
  return new TableClient(process.env.TABLE_STORAGE_URL, process.env.EVENT_TABLE_NAME, credential)
}

const createEvent = async (event) => {
  const client = getClient()

  await client.createEntity(event)
}

const getEvents = async (paymentReference) => {
  const client = getClient()

  let eventsIter = client.listEntities({
    queryOptions: {
      filter: odata `PartitionKey eq ${paymentReference}`
    }
  })

  const events = []

  for await (const event of eventsIter) {
    events.push(event)
  }

  const event = events.sort((a, b) => new Date(a.timestamp) - new Date(b.timestamp))

  return event.length !== 0 ? JSON.parse(event[0].event) : {}
}

module.exports = {
  createEvent,
  getEvents
}
