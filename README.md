# vue3-terminal

## welcome

Hello, here is a mini terminal built with Vue3 + TS + Pinia + TailwindCSS!

Onlie: https://vue3-terminal.vercel.app

It has some basic commands below(with the most basic usage):
- `cd [dirname]` - change directory
- `cd ..` - goto last directory
- `ls` - list files in current directory
- `pwd` - print current directory
- `clear` - clear screen
- `mkdir [dirname]` - create directory
- `touch [filename]` - create file
- `welcome` - welcome message
- `help` - help message

More commands will be added...

## Develop

I used [unplugin-auto-import](https://github.com/antfu/unplugin-auto-import) and [unplugin-vue-components](https://github.com/antfu/unplugin-vue-components) to auto import api and components, remember to set the code below to `true` to generate `.eslintrc-auto-import.json` when you first run `pnpm dev`: (to make eslint not report errors)
```ts
eslintrc: {
  // default false，when you fisrt `pnpm dev` or need to update, set it to true
  enabled: true, 
  filepath: './.eslintrc-auto-import.json'
}
```

Then you can start:
```bash
# Install
pnpm install
# Run
pnpm dev
# Build
pnpm build
```