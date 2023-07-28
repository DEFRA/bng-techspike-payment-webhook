const crypto = require('crypto')

/**
 * Verifies that event message has been received from GOV.UK
 * Pay
 * 
 * @param {object} data - POST body to be verified
 * @param {object} headers - POST request headers
 * @param {string} secret - GOV Pay webhook signing secret - Can be found on GOV Pay dashboard
 * @returns true if the data is verified to be from GOV Pay. Returns false otherwise.
 */
function verifyGovPay(data, headers, secret) {
  const hmac = crypto.createHmac('sha256', secret)
    .update(JSON.stringify(data))
    .digest('hex')

  if (!headers['pay-signature'] || hmac !== headers['pay-signature']) {
    return false;
  }

  return true;
}

module.exports = {
  verifyGovPay
}
