import inquirer from 'inquirer';
import { join } from 'node:path';
import {
    APPLY_FAVORITE_SETTING_SUCCESS_MESSAGE,
    APPLY_FAVORITE_SETTINGS_ERROR_MESSAGE,
    CHOOSE_ACCOUNT_TO_APPLY_SETTINGS_MESSAGE,
    CONTINUE_CHOICE,
    DOTA_2_FOLDER,
    I_HAVE_CHANGED_MY_MIND_MESSAGE,
    I_UNDERSTAND_CHOICE,
} from '../../contants.js';
import { copyFolder } from '../fs/copy-folder.js';
import { isFolderEmpty } from '../fs/is-folder-empty.js';
import { getAccountPaths } from '../get-account-paths.js';
import { getAccountsChoices } from '../get-accounts-choices.js';
import { DEFAULT_SETTINGS_FOLDER, STEAM_USERDATA_FOLDER_PATH } from '../path/constants.js';

export const applyFavoriteSettings = async () => {
    if (isFolderEmpty(DEFAULT_SETTINGS_FOLDER)) {
        await inquirer.prompt([
            {
                type: 'list',
                name: 'taskStatus',
                choices: [I_UNDERSTAND_CHOICE],
                message: APPLY_FAVORITE_SETTINGS_ERROR_MESSAGE,
            },
        ]);
    }

    const accounts = getAccountPaths();

    const { targetAccount } = await inquirer.prompt([
        {
            type: 'list',
            name: 'targetAccount',
            message: CHOOSE_ACCOUNT_TO_APPLY_SETTINGS_MESSAGE,
            choices: [...getAccountsChoices(accounts), I_HAVE_CHANGED_MY_MIND_MESSAGE],
        },
    ]);

    if (targetAccount === I_HAVE_CHANGED_MY_MIND_MESSAGE) {
        return;
    }

    const src = DEFAULT_SETTINGS_FOLDER;
    const dest = join(STEAM_USERDATA_FOLDER_PATH, targetAccount, DOTA_2_FOLDER);
    copyFolder(src, dest);

    await inquirer.prompt([
        {
            type: 'list',
            name: 'taskStatus',
            choices: [CONTINUE_CHOICE],
            message: APPLY_FAVORITE_SETTING_SUCCESS_MESSAGE(targetAccount),
        },
    ]);
};