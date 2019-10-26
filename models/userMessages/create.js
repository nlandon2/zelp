module.exports = (knex, UserMessage) => {
  return params => {
    const fromId = params.fromId;
    const toId = params.toId;
    const message = params.message;

    return knex("user_messages")
      .insert({
        from_id: fromId,
        to_id: toId,
        message
      })
      .then(() => {
        return (
          knex("user_messages")
            .join("users", "user_messages.from_id", "=", "users.id")
            //.join("users", "user_messages.to_id", "=", "users.id")
            .where({ from_id: fromId, to_id: toId })
            .select()
        );
      })
      .then(newUserMessage => {
        const messageArray = newUserMessage.map(
          message => new UserMessage(message)
        );
        return messageArray;
      })
      .catch(err => {
        return Promise.reject(err);
      });
  }; // fix me!
};
