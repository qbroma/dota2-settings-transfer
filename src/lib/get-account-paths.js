import fs from 'fs';
import { join } from 'path';

import { DOTA_2_FOLDER } from '../contants.js';
import { STEAM_USERDATA_FOLDER_PATH } from './path/constants.js';

// Из массива папок оставляет только те, в которых есть папка с Dota 2 (папка имеет название 570)
const dota2ExistFilter = (folder) => fs.existsSync(join(STEAM_USERDATA_FOLDER_PATH, folder, DOTA_2_FOLDER));

// Возвращает массив с аккаунтами стим
export const getAccountPaths = () => fs.readdirSync(STEAM_USERDATA_FOLDER_PATH).filter(dota2ExistFilter);