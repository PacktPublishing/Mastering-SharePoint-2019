const { sp } = require("@pnp/sp");
const { SPFetchClient } = require("@pnp/nodejs");

const siteUrl = "";
const clientId = process.env.CLIENT_ID;
const clientSecret = process.env.CLIENT_SECRET;
const changeTypes = {
  "1": "Added",
  "2": "Updated",
  "3": "Deleted",
  "7": "Restored"
};

sp.setup({
  sp: {
    fetchClientFactory: () => new SPFetchClient(siteUrl, clientId, clientSecret)
  }
});

const updateHistory = async ({ list, itemId, changeType }) => {
  try {
    const result = await sp.web.lists.getByTitle("WebhookHistory").items.add({
      Title: `An item was ${changeType} in ${list} with an Item ID of ${itemId}`
    });
    return result;
  } catch (error) {
    return error;
  }
};

const getChanges = async ({ resource, token }) => {
  try {
    const changes = await sp.web.lists.getById(resource).getChanges({
      Item: true,
      Add: true,
      Update: true,
      DeleteObject: true,
      Restore: true,
      ChangeTokenStart: { StringValue: token }
    });

    const list = await sp.web.lists
      .getById(resource)
      .select("Title")
      .get();

    const changeType = changes[0].ChangeType;
    const itemId = changes[0].ItemId;
    const changeToken = changes[0].ChangeToken.StringValue;

    return {
      list: list.Title,
      itemId: itemId,
      changeType: changeTypes[changeType],
      changeToken: changeToken
    };
  } catch (error) {
    return error;
  }
};

module.exports = {
  updateHistory,
  getChanges
};
