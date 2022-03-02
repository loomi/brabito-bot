export const availableCommands = {
  ping: 'this is a ping description...',
  whoami: 'command will mention you as reply',
  whereami: ' command will find your location at loomiverse',
  help: 'will list all commands and their description',
  comandos: 'will list all commands and their description',
  tem_pr: ' will list all PRs with status equals to **not_allocated**',
  alocados: ' list every PR that have someone **allocated**',
  prs: " list all PRs registered. You can filter them passing tags withing the command.\n\t\t~\t*How to use: `/prs <key_01>=<value_01> <key_02>=<value_02> ... <key_n>=<value_n>`*\n\t\t~\t*Available filters: `[pr_id: string as <PR_ID>, user_nick= string as <userGithubNick>, status: 'urgent' | 'important', project: string as <projectName>]`*",
  me_aloca_aqui:
    ' this command will try to allocate the user who send the message as reviwer of the PR indicated.\n\t\t~\t*How to use: `/me_aloca_aqui <pr_id>`*',
};

export type AvailableCommands = keyof typeof availableCommands;
