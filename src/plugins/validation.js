import { 
  Form as VeeForm, Field as VeeField, defineRule, ErrorMessage, configure,
} from 'vee-validate';
import { 
  alpha_spaces as alphaSpaces, required, min, max, email, min_value as minValue, max_value as maxValue, confirmed, not_one_of as excluded,
} from '@vee-validate/rules';

export default {
  install(app) {
    app.component('VeeForm', VeeForm);
    app.component('VeeField', VeeField);
    app.component('ErrorMessage', ErrorMessage);

    defineRule('required', required);
    defineRule('tos', required);
    defineRule('alpha_spaces', alphaSpaces);
    defineRule('min', min);
    defineRule('max', max);
    defineRule('email', email);
    defineRule('min_value', minValue);
    defineRule('max_value', maxValue);
    defineRule('passwords_mismatch', confirmed);
    defineRule('excluded', excluded);
    defineRule('country_excluded', excluded);
    defineRule('song_required', required);

    configure({
      generateMessage: (ctx) => {
        const messages = {
          required: `The ${ctx.field} field is required.`,
          min: `The ${ctx.field} field is too short.`,
          max: `The ${ctx.field} field is too long.`,
          alpha_spaces: `The ${ctx.field} field may only contain alphabetic characters and spaces.`,
          email: `The ${ctx.field} field must be a valid email.`,
          min_value: `The ${ctx.field} field is too low.`,
          max_value: `The ${ctx.field} field is too high.`,
          excluded: `You are not allowed to select this value for the ${ctx.field} field.`,
          country_excluded: 'Due to restrictions, we currently do not accept users from this location.',
          passwords_mismatch: 'The passwords do not match.',
          tos: 'You must accept the terms of service.',
          song_required: 'The song title field is required.',
        }

        const message = messages[ctx.rule.name] 
          ? messages[ctx.rule.name] 
          : `The field ${ctx.field} is invalid.`

        return message;
      },
      validateOnBlur: true,
      validateOnChange: true,
      validateOnInput: false,
      validateOnModelUpdate: true,
    });
  },
}
