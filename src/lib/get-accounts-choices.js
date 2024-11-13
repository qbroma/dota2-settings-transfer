import { getAccountNick } from './vdf/get/account-nick.js';

export const getAccountsChoices = (accounts) => {
    const maxLength = Math.max(...accounts.map(account => String(account).length));

    return accounts.map((account) => {
        const nick = getAccountNick(account);
        return {
            name: `${String(account).padEnd(maxLength)}${nick ? ` (${nick})` : ''}`,
            value: account,
        };
    });
};