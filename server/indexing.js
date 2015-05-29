// unique index on follower_id & following_id
Follows._ensureIndex({follower_id: 1, following_id: 1}, {unique: true});