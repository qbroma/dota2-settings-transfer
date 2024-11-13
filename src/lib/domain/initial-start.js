import inquirer from 'inquirer';
import {
    CONTINUE_CHOICE,
    DO_YOU_WANT_TO_SET_FAVORITE_SETTINGS_MESSAGE,
    DO_YOU_WANT_TO_SET_FAVORITE_SETTINGS_SUFFIX,
    I_WILL_NOT_BOTHER_YOU_ANYMORE_MESSAGE,
    NO_CHOICE,
    OK_TO_SAVED_FAVORITE_SETTINGS_MESSAGE,
    OK_TO_SAVED_FAVORITE_SETTINGS_SUFFIX,
    YES_CHOICE,
} from '../../contants.js';
import { readJson } from '../fs/read-json.js';
import { saveJson } from '../fs/save-json.js';
import { SETTINGS_FILE } from '../path/constants.js';
import { setFavoriteSettings } from './set-favorite-settings.js';

export const initialStart = async () => {
    const settings = readJson(SETTINGS_FILE);

    if (settings?.isIntroQuestionAnswered) {
        return;
    }

    const { action } = await inquirer.prompt([
        {
            type: 'list',
            name: 'action',
            message: DO_YOU_WANT_TO_SET_FAVORITE_SETTINGS_MESSAGE,
            suffix: DO_YOU_WANT_TO_SET_FAVORITE_SETTINGS_SUFFIX,
            choices: [
                YES_CHOICE,
                NO_CHOICE,
            ],
        },
    ]);

    if (action === YES_CHOICE) {
        await setFavoriteSettings();

        await inquirer.prompt([
            {
                type: 'list',
                name: 'taskStatus',
                choices: [CONTINUE_CHOICE],
                message: OK_TO_SAVED_FAVORITE_SETTINGS_MESSAGE,
                suffix: OK_TO_SAVED_FAVORITE_SETTINGS_SUFFIX,
            },
        ]);
    } else {
        await inquirer.prompt([
            {
                type: 'list',
                name: 'taskStatus',
                choices: [CONTINUE_CHOICE],
                message: I_WILL_NOT_BOTHER_YOU_ANYMORE_MESSAGE,
            },
        ]);
    }

    saveJson(SETTINGS_FILE, { isIntroQuestionAnswered: true });
};