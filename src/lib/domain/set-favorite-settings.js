import inquirer from 'inquirer';
import { join } from 'path';
import {
    CHOOSE_ACCOUNT_FROM_SET_FAVORITE_SETTINGS_MESSAGE,
    CHOOSE_ACCOUNT_FROM_SET_FAVORITE_SETTINGS_SUFFIX,
    CONTINUE_CHOICE,
    DOTA_2_FOLDER,
    I_HAVE_CHANGED_MY_MIND_MESSAGE,
    SET_FAVORITE_SETTINGS_SUCCESS_MESSAGE,
} from '../../contants.js';
import { copyFolder } from '../fs/copy-folder.js';
import { saveJson } from '../fs/save-json.js';
import { getAccountPaths } from '../get-account-paths.js';
import { getAccountsChoices } from '../get-accounts-choices.js';
import { DEFAULT_SETTINGS_FOLDER, SETTINGS_FILE, STEAM_USERDATA_FOLDER_PATH } from '../path/constants.js';

export const setFavoriteSettings = async () => {
    const accounts = getAccountPaths();

    const { sourceAccount } = await inquirer.prompt([
        {
            type: 'list',
            name: 'sourceAccount',
            message: CHOOSE_ACCOUNT_FROM_SET_FAVORITE_SETTINGS_MESSAGE,
            suffix: CHOOSE_ACCOUNT_FROM_SET_FAVORITE_SETTINGS_SUFFIX,
            choices: [...getAccountsChoices(accounts), I_HAVE_CHANGED_MY_MIND_MESSAGE],
        },
    ]);

    if (sourceAccount === I_HAVE_CHANGED_MY_MIND_MESSAGE) {
        return;
    }

    const ACCOUNT_SETTINGS_FOLDER = join(STEAM_USERDATA_FOLDER_PATH, sourceAccount, DOTA_2_FOLDER);

    copyFolder(ACCOUNT_SETTINGS_FOLDER, DEFAULT_SETTINGS_FOLDER);

    saveJson(SETTINGS_FILE, { isIntroQuestionAnswered: true });

    await inquirer.prompt([
        {
            type: 'list',
            name: 'taskStatus',
            choices: [CONTINUE_CHOICE],
            message: SET_FAVORITE_SETTINGS_SUCCESS_MESSAGE,
        },
    ]);
};