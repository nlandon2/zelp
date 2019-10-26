module.exports = (knex, ChannelMessage) => params => {
  const userId = params.fromId;
  const channelId = params.channelId;
  const message = params.message;

  return knex("channel_messages")
    .insert({
      from_id: userId,
      channel_id: channelId,
      message
    })
    .then(() => {
      return knex("channel_messages")
        .join("channels", "channel_messages.channel_id", "=", "channels.id")
        .join("users", "channel_messages.from_id", "=", "users.id")
        .where({ channel_id: channelId, from_id: userId })
        .select();
    })
    .then(newChannelMessage => {
      const messageArray = newChannelMessage.map(
        message => new ChannelMessage(message)
      );
      return messageArray;
    })
    .catch(err => {
      return Promise.reject(err);
    });
};
