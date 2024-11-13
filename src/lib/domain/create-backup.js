import inquirer from 'inquirer';
import { join } from 'path';
import {
    BACKUP_CREATED_SUCCESS_MESSAGE,
    CHOOSE_ACCOUNT_TO_CREATE_BACKUP_MESSAGE,
    CONTINUE_CHOICE,
    DOTA_2_FOLDER,
    I_HAVE_CHANGED_MY_MIND_MESSAGE,
    INPUT_BACKUP_NAME_MESSAGE,
} from '../../contants.js';
import { copyFolder } from '../fs/copy-folder.js';
import { getAccountPaths } from '../get-account-paths.js';
import { getAccountsChoices } from '../get-accounts-choices.js';
import { BACKUP_FOLDER, STEAM_USERDATA_FOLDER_PATH } from '../path/constants.js';

export const createBackup = async () => {
    const accounts = getAccountPaths();

    const { sourceAccount } = await inquirer.prompt([
        {
            type: 'list',
            name: 'sourceAccount',
            message: CHOOSE_ACCOUNT_TO_CREATE_BACKUP_MESSAGE,
            choices: [...getAccountsChoices(accounts), I_HAVE_CHANGED_MY_MIND_MESSAGE],
        },
    ]);

    if (sourceAccount === I_HAVE_CHANGED_MY_MIND_MESSAGE) {
        return;
    }

    const { backupName } = await inquirer.prompt([{
        type: 'input',
        name: 'backupName',
        message: INPUT_BACKUP_NAME_MESSAGE,
    }]);


    const src = join(STEAM_USERDATA_FOLDER_PATH, sourceAccount, DOTA_2_FOLDER);
    const dest = join(BACKUP_FOLDER, `${backupName}_${sourceAccount}`);
    copyFolder(src, dest);

    await inquirer.prompt([
        {
            type: 'list',
            name: 'taskStatus',
            choices: [CONTINUE_CHOICE],
            message: BACKUP_CREATED_SUCCESS_MESSAGE(backupName),
        },
    ]);
};