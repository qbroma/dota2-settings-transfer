import { existsSync, readFileSync } from 'node:fs';
import { join } from 'path';
import vdf from 'vdf';
import { STEAM_USERDATA_FOLDER_PATH } from '../../path/constants.js';

export const getAccountNick = (accountId) => {
    const configPath = join(STEAM_USERDATA_FOLDER_PATH, accountId, 'config', 'localconfig.vdf');

    if (existsSync(configPath)) {
        const data = readFileSync(configPath, 'utf-8');
        const parsed = vdf.parse(data);

        if (typeof parsed === 'object'
            && parsed !== null
            && 'UserLocalConfigStore' in parsed
            && typeof parsed.UserLocalConfigStore === 'object'
            && parsed.UserLocalConfigStore !== null
            && 'friends' in parsed.UserLocalConfigStore
            && typeof parsed.UserLocalConfigStore.friends === 'object'
            && parsed.UserLocalConfigStore.friends !== null
            && 'PersonaName' in parsed.UserLocalConfigStore.friends
            && typeof parsed.UserLocalConfigStore.friends.PersonaName === 'string'
            && parsed.UserLocalConfigStore.friends.PersonaName.length > 0
        ) {
            return parsed.UserLocalConfigStore.friends.PersonaName;
        }
    }

    return null;
};