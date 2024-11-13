import { getBackupFolder } from './get/backup-folder.js';
import { getDefaultSettingsFolder } from './get/default-settings-folder.js';
import { getSettingsFile } from './get/settings-file.js';
import { getSteamUserDataFolder } from './get/steam-userdata-folder.js';
import { getToolFolder } from './get/tool-folder.js';

getToolFolder(); // Эта строка нужна для инициализации приложения!
export const SETTINGS_FILE = getSettingsFile();
export const STEAM_USERDATA_FOLDER_PATH = await getSteamUserDataFolder();
export const BACKUP_FOLDER = getBackupFolder();
export const DEFAULT_SETTINGS_FOLDER = getDefaultSettingsFolder();