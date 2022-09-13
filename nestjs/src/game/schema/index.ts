import * as Joi from 'joi';
import { isCuid } from 'cuid';

export const MovePaddleInputSchema = Joi.object({

  match_id: Joi.string()
    .custom((value, helpers) => {

      if (!isCuid(value))
        return helpers.error('Match id must be a valid cuid.');

      return true;
    })
    .required(),

  key: Joi.string()
    .valid('ArrowDown', 'ArrowUp')
    .required(),

  pressed: Joi.boolean()
    .required(),

});

export const JoinQueueInputSchema = Joi.object({
  type: Joi.valid('DRAFT_1vs1', 'RANKED_1vs1', 'CUSTOM_1vs1', 0, 1, 2)
    .required(),
});

export const SpectateMatchInputSchema = Joi.object({

  id: Joi.string()
    .custom((value, helpers) => {

      if (!isCuid(value))
        return helpers.error('Match id must be a valid cuid.');

      return true;
    })
    .required(),

});