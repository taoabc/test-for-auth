const fetch = require("node-fetch").default;

// add role names to this object to map them to group ids in your AAD tenant
const roleGroupMappings = {
  admin: "9b090519-6302-4c0d-b747-30e7ecf1770b",
  reader: "d870939a-0e63-4226-9b85-09b8aa82c521",
};

module.exports = async function (context, req) {
  const user = req.body || {};
  const roles = ["reader", user.accessToken];

  // for (const [role, groupId] of Object.entries(roleGroupMappings)) {
  //   if (await isUserInGroup(groupId, user.accessToken)) {
  //     roles.push(role);
  //   }
  // }

  //   const r = await graphResult(user.accessToken);
  // const roles = ["admin", "reader"];

  context.res.json({
    roles,
  });
};

async function isUserInGroup(groupId, bearerToken) {
  const url = new URL("https://graph.microsoft.com/v1.0/me/memberOf");
  url.searchParams.append("$filter", `id eq '${groupId}'`);
  const response = await fetch(url, {
    method: "GET",
    headers: {
      Authorization: `Bearer ${bearerToken}`,
    },
  });

  if (response.status !== 200) {
    return false;
  }

  const graphResponse = await response.json();
  const matchingGroups = graphResponse.value.filter(
    (group) => group.id === groupId
  );
  return matchingGroups.length > 0;
}

async function graphResult(bearerToken) {
  const url = new URL("https://graph.microsoft.com/v1.0/me/memberOf");
  url.searchParams.append("$filter", `id eq '${groupId}'`);
  const response = await fetch(url, {
    method: "GET",
    headers: {
      Authorization: `Bearer ${bearerToken}`,
    },
  });

  if (response.status !== 200) {
    return false;
  }

  return response.json();
}
