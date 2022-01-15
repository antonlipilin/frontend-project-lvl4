const ru = {
  translation: {
    errors: {
      authFailed: 'Неверный логин или пароль. Проверьте правильность введёных данных',
      required: 'Обязательное поле',
      minLength3: 'Минимальная длина логина - 3 символа',
      minLength6: 'Минимальная длина пароля - 6 символов',
      maxLength20: 'Максимальная длина логина - 20 символов',
      confirmPassword: 'Пароли должны совпадать',
      registrationFailed: 'Такой пользователь уже существует',
      uniqueChannelName: 'Имя канала должно быть уникальным',
      unknown: 'Неизвестная ошибка. Повторите попытку позже',
    },
    loginForm: {
      login: 'Введите логин',
      password: 'Введите пароль',
      button: 'Войти',
      loginPlaceholder: 'Логин',
      passwordPlaceholder: 'Пароль',
      heading: 'Войти',
      text: 'Нет аккаунта?',
      link: 'Регистрация',
    },
    signupForm: {
      login: 'Введите логин',
      password: 'Введите пароль',
      confirmPassword: 'Подтвердите пароль',
      button: 'Зарегестрироваться',
      heading: 'Регистрация',
      loginPlaceholder: 'Логин',
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
      successRemoveChannel: 'Канал переименован',
      successRenameChannel: 'Канал удалён',
    },
  },
};

export default ru;
