const { sp } = require("@pnp/sp");
const { SPFetchClient } = require("@pnp/nodejs");

const siteUrl = "";
const listTitle = "";
const webhookUrl = "";
const webhookExpiration = "";
const clientId = process.env.CLIENT_ID;
const clientSecret = process.env.CLIENT_SECRET;

sp.setup({
  sp: {
    fetchClientFactory: () => new SPFetchClient(siteUrl, clientId, clientSecret)
  }
});

const createSubscription = async () => {
  try {
    return await sp.web.lists
      .getByTitle(listTitle)
      .subscriptions.add(webhookUrl, webhookExpiration);
  } catch (error) {
    return error;
  }
};

module.exports = {
  createSubscription
};
