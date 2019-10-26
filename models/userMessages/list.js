module.exports = (knex, UserMessage) => {
  return async params => {
    const fromId = params.fromId;
    const toId = params.toId;
    const serializedMessages = [];

    const userInfo = await knex("user_messages")
      .join("users", "user_messages.from_id", "=", "users.id")
      .where({ from_id: fromId, to_id: toId })
      .orWhere({ from_id: toId, to_id: fromId })
      .select();

    for (const message in userInfo) {
      const newUserMessage = new UserMessage(userInfo[message]);
      serializedMessages.push(newUserMessage);
    }
    console.log(serializedMessages);
    return serializedMessages; // fix me!
  };
};
