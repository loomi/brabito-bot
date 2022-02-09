export const availableCommands = {
  ping: 'this is a ping description...',
  whoami: 'command will mention you as reply',
  comandos: 'will list all commands and their description',
  tem_pr: ' will list all PRs with status equals to **not_allocated**',
  alocados: ' list every pr who is with someone allocated',
  prs: " list all PRs registered, but you can filter passing tags withing the command, i.e. (/prs pr_id=<some_value>).\nKeys to pass: [pr_id; user_nick; status['urgent' | 'important']; project]",
};

export type AvailableCommands = keyof typeof availableCommands;
