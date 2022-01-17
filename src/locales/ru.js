const ru = {
  translation: {
    errors: {
      authFailed: 'Неверные имя пользователя или пароль',
      required: 'Обязательное поле',
      minLength3: 'От 3 до 20 символов',
      minLength6: 'Не менее 6 символов',
      maxLength20: 'От 3 до 20 символов',
      confirmPassword: 'Пароли должны совпадать',
      registrationFailed: 'Такой пользователь уже существует',
      uniqueChannelName: 'Имя канала должно быть уникальным',
      unknown: 'Ошибка загрузки данных. Повторите попытку позже',
    },
    loginForm: {
      login: 'Ваш ник',
      password: 'Пароль',
      button: 'Войти',
      loginPlaceholder: 'Ник',
      passwordPlaceholder: 'Пароль',
      heading: 'Войти',
      text: 'Нет аккаунта?',
      link: 'Регистрация',
    },
    signupForm: {
      login: 'Имя пользователя',
      password: 'Пароль',
      confirmPassword: 'Подтвердите пароль',
      button: 'Зарегестрироваться',
      heading: 'Регистрация',
      loginPlaceholder: 'Имя пользователя',
      passwordPlaceholder: 'Пароль',
      confirmPasswordPlaceholder: 'Подтвердите пароль',
    },
    nav: {
      logout: 'Выйти',
    },
    notFoundPage: {
      toMain: 'Вернуться на главную',
    },
    modals: {
      cancelButton: 'Отменить',
      deleteButton: 'Удалить',
      sendButton: 'Отправить',
      addChannelTitle: 'Добавить канал',
      renameChannelTitle: 'Переименовать канал',
      removeChannelTitle: 'Удалить канал',
      removeChannelText: 'Уверены?',
    },
    chat: {
      message_one: '{{count}} сообщение',
      message_few: '{{count}} сообщения',
      message_many: '{{count}} сообщений',
      channels: 'Каналы',
      newMessagePlaceholder: 'Введите сообщение...',
      delete: 'Удалить',
      rename: 'Переименовать',
      successAddChannel: 'Канал создан',
      successRemoveChannel: 'Канал удалён',
      successRenameChannel: 'Канал переименован',
    },
  },
};

export default ru;
