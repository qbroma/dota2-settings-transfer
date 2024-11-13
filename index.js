import inquirer from 'inquirer';
import {
    APPLY_FAVORITE_SETTINGS_MESSAGE,
    CREATE_BACKUP_MESSAGE,
    EXIT_FROM_PROGRAM_MESSAGE,
    MAIN_MENU_MESSAGE,
    RESTORE_FROM_BACKUP_MESSAGE,
    SET_FAVORITE_MESSAGE,
    TRANSFER_SETTINGS_MESSAGE,
} from './src/contants.js';
import { applyFavoriteSettings } from './src/lib/domain/apply-favorite-settings.js';
import { createBackup } from './src/lib/domain/create-backup.js';
import { initialStart } from './src/lib/domain/initial-start.js';
import { restoreBackup } from './src/lib/domain/restore-backup.js';
import { setFavoriteSettings } from './src/lib/domain/set-favorite-settings.js';
import { transferSettings } from './src/lib/domain/transfer-settings.js';
import { isFolderEmpty } from './src/lib/fs/is-folder-empty.js';
import { BACKUP_FOLDER, DEFAULT_SETTINGS_FOLDER } from './src/lib/path/constants.js';

const mainMenu = async () => {
    await initialStart();

    while (true) {
        const { action } = await inquirer.prompt([
            {
                type: 'list',
                name: 'action',
                message: MAIN_MENU_MESSAGE,
                choices: [
                    ...(isFolderEmpty(DEFAULT_SETTINGS_FOLDER) ? [] : [APPLY_FAVORITE_SETTINGS_MESSAGE]),
                    CREATE_BACKUP_MESSAGE,
                    ...(isFolderEmpty(BACKUP_FOLDER) ? [] : [RESTORE_FROM_BACKUP_MESSAGE]),
                    TRANSFER_SETTINGS_MESSAGE,
                    SET_FAVORITE_MESSAGE,
                    EXIT_FROM_PROGRAM_MESSAGE,
                ],
            },
        ]);

        switch (action) {
            case APPLY_FAVORITE_SETTINGS_MESSAGE:
                await applyFavoriteSettings();
                break;

            case CREATE_BACKUP_MESSAGE:
                await createBackup();
                break;

            case RESTORE_FROM_BACKUP_MESSAGE:
                await restoreBackup();
                break;

            case TRANSFER_SETTINGS_MESSAGE:
                await transferSettings();
                break;

            case SET_FAVORITE_MESSAGE:
                await setFavoriteSettings();
                break;

            default:
            case EXIT_FROM_PROGRAM_MESSAGE:
                return;
        }
    }
};

mainMenu().catch(console.error);