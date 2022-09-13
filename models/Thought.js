const { Schema, Types, model } = require('mongoose');

const thoughtSchema = new Schema(
    {
        thoughtText: {
            type: String,
            required: true,
            max_length: 280,
            min_length: 1
        },
        createdAt: {
            type: Date,
            default: Date.now(),
            get: d => d.toLocaleString()
        },
        username: {
            type: String,
            required: true
        },
        reactions: [reactionSchema]
    },
    {
        toJSON: {
          getters: true,
          virtuals: true
        },
      }
    );
thoughtSchema
    .virtual('reactionCount')
    // Getter
    .get(function () {
        return this.reactions.length;
    })

    const Thought = model('thought', thoughtSchema);
    
    module.exports = Thought;