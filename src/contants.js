export const DOTA_2_FOLDER = '570'; // ID игры Dota 2 равен 570, отсюда такое число
export const TOOL_NAME = 'dota_2_settings_transfer_tool'; // Используется для названия папки в APPDATA

export const I_HAVE_CHANGED_MY_MIND_MESSAGE = 'Я передумал!';
// export const OK_TO_CHANGED_MIND_MESSAGE = 'Передумали и передумали!';

export const YES_CHOICE = 'Да';
export const NO_CHOICE = 'Нет';

export const CONTINUE_CHOICE = 'Продолжить';
export const I_UNDERSTAND_CHOICE = 'Понял';

export const MAIN_MENU_MESSAGE = 'Выберите действие:';

export const APPLY_FAVORITE_SETTINGS_MESSAGE = 'Применить любимые настройки';
export const CREATE_BACKUP_MESSAGE = 'Создать бекап';
export const RESTORE_FROM_BACKUP_MESSAGE = 'Восстановить из бекапа';
export const TRANSFER_SETTINGS_MESSAGE = 'Перенести настройки между аккаунтами';
export const SET_FAVORITE_MESSAGE = 'Установить любимые настройки';
export const EXIT_FROM_PROGRAM_MESSAGE = 'Выйти';


export const I_WILL_NOT_BOTHER_YOU_ANYMORE_MESSAGE = 'Хорошо, больше надоедать не буду!';

export const OK_TO_SAVED_FAVORITE_SETTINGS_MESSAGE = 'Супер, теперь ты можешь применять любимые настройки!';
export const OK_TO_SAVED_FAVORITE_SETTINGS_SUFFIX = 'В меню есть опция "Установить любимые настройки"';

export const DO_YOU_WANT_TO_SET_FAVORITE_SETTINGS_MESSAGE = 'Желаете установить любимые настройки?';
export const DO_YOU_WANT_TO_SET_FAVORITE_SETTINGS_SUFFIX = 'Если у вас есть аккаунт с готовыми настройками, то их можно сохранить (Можно установить позже)';
export const CHOOSE_ACCOUNT_FROM_SET_FAVORITE_SETTINGS_MESSAGE = 'Выберите аккаунт, откуда копировать настройки:';
export const CHOOSE_ACCOUNT_FROM_SET_FAVORITE_SETTINGS_SUFFIX = 'Будет создана копия настроек';
export const SET_FAVORITE_SETTINGS_SUCCESS_MESSAGE = 'Любимые настройки установлены!';

export const APPLY_FAVORITE_SETTINGS_ERROR_MESSAGE = 'Любимые настройки не заданы!';

export const CHOOSE_ACCOUNT_TO_APPLY_SETTINGS_MESSAGE = 'Выберите аккаунт к которому хотите применить настройки:';

export const APPLY_FAVORITE_SETTING_SUCCESS_MESSAGE = (targetAccount) => `Настройки успешно применены для аккаунта ${targetAccount}!`;


export const CHOOSE_ACCOUNT_TO_CREATE_BACKUP_MESSAGE = 'Выберите аккаунт для создания бекапа:';
export const INPUT_BACKUP_NAME_MESSAGE = 'Введите название для бекапа:';
export const BACKUP_CREATED_SUCCESS_MESSAGE = (backupName) => `Бекап ${backupName} успешно создан!`;

export const CHOOSE_ACCOUNT_TO_RESTORE_BACKUP_MESSAGE = 'Выберите аккаунт для восстановления из бекапа:';
export const NO_BACKUPS_TO_RESTORE_ERROR_MESSAGE = (targetAccount) => `Нет бекапов для аккаунта ${targetAccount}!`;
export const CHOOSE_BACKUP_TO_RESTORE_MESSAGE = 'Выберите бекап для восстановления:';
export const BACKUP_RESTORE_SUCCESS = (backupName) => `Настройки восстановлены из бекапа ${backupName}`;

export const CHOOSE_ACCOUNT_FROM_TRANSFER_SETTINGS_MESSAGE = 'Выберите аккаунт, откуда копировать настройки:';
export const CHOOSE_ACCOUNT_TO_TRANSFER_SETTINGS_MESSAGE = 'Выберите аккаунт, куда переносить настройки:';
export const TRANSFER_SUCCESS_MESSAGE = (sourceAccount, targetAccount) => `Настройки успешно перенесены из аккаунта ${sourceAccount} в аккаунт ${targetAccount}`;

