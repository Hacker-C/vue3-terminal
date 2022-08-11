<p align='center'>
English | <a href='./README.zh-CN.md'>中文</a>
</p>

# Vue3-Terminal

## About

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

## Framework and library

- Vue3 + TypeScript + Vite
- Pinia
- TailwindCSS
- unplugin-auto-import + unplugin-vue-components: for auto inports of api and components

## Develop

I used [unplugin-auto-import](https://github.com/antfu/unplugin-auto-import) and [unplugin-vue-components](https://github.com/antfu/unplugin-vue-components) to auto import api and components, remember to set the code below to `true` to generate `.eslintrc-auto-import.json` when you first run `pnpm dev`: (to make eslint not report errors)
```ts
// vite.config.ts, Ln 26, Col 7
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

## Descriptiton

The data structure of the terminal system is a *N-ary tree* which simulates the diractory structure of real machine. But there is a slight difference between them, I design a pointer called previous point to its parent node.

>  **Note**
> More about n-ary-tree: [N-ary Tree Data Structure](https://www.studytonight.com/advanced-data-structures/nary-tree)

```ts
interface Directory {
  id: number  // id
  name: string // current directory name
  files: string[] // all files below current directory
  directories: Directory[]   // all diractories, alos a pointer which points to its children nodes
  previous: Directory | null // a pointer which points to its parent node
}
```