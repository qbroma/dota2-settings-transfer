import inquirer from 'inquirer';
import { readdirSync } from 'node:fs';
import { join } from 'node:path';
import {
    BACKUP_RESTORE_SUCCESS,
    CHOOSE_ACCOUNT_TO_RESTORE_BACKUP_MESSAGE,
    CHOOSE_BACKUP_TO_RESTORE_MESSAGE,
    CONTINUE_CHOICE,
    DOTA_2_FOLDER,
    I_HAVE_CHANGED_MY_MIND_MESSAGE,
    I_UNDERSTAND_CHOICE,
    NO_BACKUPS_TO_RESTORE_ERROR_MESSAGE,
} from '../../contants.js';
import { copyFolder } from '../fs/copy-folder.js';
import { getAccountPaths } from '../get-account-paths.js';
import { getAccountsChoices } from '../get-accounts-choices.js';
import { BACKUP_FOLDER, STEAM_USERDATA_FOLDER_PATH } from '../path/constants.js';

export const restoreBackup = async () => {
    const accounts = getAccountPaths();

    const { targetAccount } = await inquirer.prompt([
        {
            type: 'list',
            name: 'targetAccount',
            message: CHOOSE_ACCOUNT_TO_RESTORE_BACKUP_MESSAGE,
            choices: [...getAccountsChoices(accounts), I_HAVE_CHANGED_MY_MIND_MESSAGE],
        },
    ]);

    if (targetAccount === I_HAVE_CHANGED_MY_MIND_MESSAGE) {
        return;
    }

    const backups = readdirSync(BACKUP_FOLDER).filter(folder =>
        folder.endsWith(`_${targetAccount}`),
    );

    if (backups.length === 0) {
        await inquirer.prompt([
            {
                type: 'list',
                name: 'taskStatus',
                choices: [I_UNDERSTAND_CHOICE],
                message: NO_BACKUPS_TO_RESTORE_ERROR_MESSAGE(targetAccount),
            },
        ]);
        return;
    }

    const { backupName } = await inquirer.prompt([
        {
            type: 'list',
            name: 'backupName',
            message: CHOOSE_BACKUP_TO_RESTORE_MESSAGE,
            choices: backups,
        },
    ]);

    const src = join(BACKUP_FOLDER, backupName);
    const dest = join(STEAM_USERDATA_FOLDER_PATH, targetAccount, DOTA_2_FOLDER);
    copyFolder(src, dest);

    await inquirer.prompt([
        {
            type: 'list',
            name: 'taskStatus',
            choices: [CONTINUE_CHOICE],
            message: BACKUP_RESTORE_SUCCESS(backupName),
        },
    ]);
};