import vine, { SimpleMessagesProvider } from '@vinejs/vine'

vine.messagesProvider = new SimpleMessagesProvider({
  'required': 'The {{ field }} field is required',
  'string': 'The value of {{ field }} field must be a string',
  'number': 'The value of {{ field }} field must be a number',
  'boolean': 'The value of {{ field }} field must be a boolean',
  'email': 'The value is not a valid email address',

  'username.required': 'Please choose a username for your account',
})
