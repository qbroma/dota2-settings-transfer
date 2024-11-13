import inquirer from 'inquirer';
import { existsSync } from 'node:fs';
import { join } from 'node:path';
import { PROGRAM_FILES_X86_ENV } from '../../env/constants.js';
import { readJson } from '../../fs/read-json.js';
import { saveJson } from '../../fs/save-json.js';
import { SETTINGS_FILE } from '../constants.js';

const removeOuterQuotes = (input) => {
    if (input.startsWith('"') && input.endsWith('"')) {
        return input.slice(1, -1);
    }
    return input;
};

export const getSteamUserDataFolder = async () => {
    const folder = join(PROGRAM_FILES_X86_ENV, 'Steam', 'userdata');

    const settingsFile = existsSync(SETTINGS_FILE) ? readJson(SETTINGS_FILE) : { isIntroQuestionAnswered: false };

    if (settingsFile?.customSteamUserdataPath && existsSync(settingsFile.customSteamUserdataPath)) {
        return settingsFile.customSteamUserdataPath;
    }

    if (!existsSync(folder)) {
        const { userPath } = await inquirer.prompt([
            {
                type: 'input',
                name: 'userPath',
                message: 'Введите путь к папке Steam:',
                suffix: '(например, C:\\Program Files (x86)\\Steam)',
                filter: input => removeOuterQuotes(input.trim()),
                validate: input => {
                    const inputWithoutQuotes = removeOuterQuotes(input.trim());
                    const userdataPath = join(inputWithoutQuotes, 'userdata');

                    if (existsSync(userdataPath)) {
                        return true;
                    }

                    return 'Папка "**\\Steam\\userdata" не найдена. Проверьте путь и попробуйте снова';
                },
            },
        ]);

        if (existsSync(SETTINGS_FILE)) {
            const customSteamUserdataPath = join(userPath, 'userdata');
            saveJson(SETTINGS_FILE, {
                isIntroQuestionAnswered: settingsFile.isIntroQuestionAnswered,
                customSteamUserdataPath,
            });

            return customSteamUserdataPath;
        }

    }

    return folder;
};