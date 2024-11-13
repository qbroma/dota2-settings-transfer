import inquirer from 'inquirer';
import { join } from 'node:path';
import {
    CHOOSE_ACCOUNT_FROM_TRANSFER_SETTINGS_MESSAGE,
    CHOOSE_ACCOUNT_TO_TRANSFER_SETTINGS_MESSAGE,
    CONTINUE_CHOICE,
    DOTA_2_FOLDER,
    I_HAVE_CHANGED_MY_MIND_MESSAGE,
    TRANSFER_SUCCESS_MESSAGE,
} from '../../contants.js';
import { copyFolder } from '../fs/copy-folder.js';
import { getAccountPaths } from '../get-account-paths.js';
import { getAccountsChoices } from '../get-accounts-choices.js';
import { STEAM_USERDATA_FOLDER_PATH } from '../path/constants.js';

export const transferSettings = async () => {
    const accounts = getAccountPaths();

    const { sourceAccount } = await inquirer.prompt([
        {
            type: 'list',
            name: 'sourceAccount',
            message: CHOOSE_ACCOUNT_FROM_TRANSFER_SETTINGS_MESSAGE,
            choices: [...getAccountsChoices(accounts), I_HAVE_CHANGED_MY_MIND_MESSAGE],
        },
    ]);

    if (sourceAccount === I_HAVE_CHANGED_MY_MIND_MESSAGE) {
        return;
    }

    const { targetAccount } = await inquirer.prompt([
        {
            type: 'list',
            name: 'targetAccount',
            message: CHOOSE_ACCOUNT_TO_TRANSFER_SETTINGS_MESSAGE,
            choices: [...getAccountsChoices(accounts.filter(acc => acc !== sourceAccount)), I_HAVE_CHANGED_MY_MIND_MESSAGE],
        },
    ]);

    if (targetAccount === I_HAVE_CHANGED_MY_MIND_MESSAGE) {
        return;
    }

    const src = join(STEAM_USERDATA_FOLDER_PATH, sourceAccount, DOTA_2_FOLDER);
    const dest = join(STEAM_USERDATA_FOLDER_PATH, targetAccount, DOTA_2_FOLDER);

    copyFolder(src, dest);

    await inquirer.prompt([
        {
            type: 'list',
            name: 'taskStatus',
            choices: [CONTINUE_CHOICE],
            message: TRANSFER_SUCCESS_MESSAGE(sourceAccount, targetAccount),
        },
    ]);
};