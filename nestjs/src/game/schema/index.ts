import * as Joi from 'joi';
import { isCuid } from 'cuid';

export const PlayerInputSchema = Joi.object({

  match: Joi.string()
    .custom((value, helpers) => {

      if (!isCuid(value))
        return helpers.error('Match must be a valid cuid.');

      return true;
    })
    .required(),

  key: Joi.string()
    .valid('ArrowDown', 'ArrowUp')
    .required(),

  pressed: Joi.boolean()
    .required(),

});

export const JoinQueueSchema = Joi.object({
  type: Joi.valid('DRAFT_1vs1', 0, 'RANKED_1vs1', 1)
    .required(),
});