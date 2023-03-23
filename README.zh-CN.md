<p align='center'>
<a href='./README.md'>English</a> | 中文
</p>

# Vue3-Terminal

## 关于本项目

Vue3-Terminal 是一个基于 Vue3 的迷你终端，和其他类似的前端模拟终端不同，Vue3-Term 基于 *N叉树*，实现了一些基本的 cd、mkdir、pwd、touch、clear 等命令。

在线访问: https://term.mphy.me

![demo](./.github/img/demo.png)

一些已经实现的具有最基本功能的命令：

- `tree` - 将文件和文件夹以树结构展示
- `echo [message]` - 打印信息
- `echo [message] > [filename]` - 文件写入
- `echo [message] >> [filename]` - 文件内容追加
- `cat [filename]` - 文件读取
- `cd [dirname]` - 改变当前目录
- `cd ..` - 返回上一级目录
- `ls` - 列出当前目录下的文件和目录（文件显示白色，文件夹显示绿色）
- `pwd` - 打印当前目录
- `clear` - 清屏
- `mkdir [dirname]` - 创建目录
- `touch [filename]` - 创建文件
- `welcome` - 欢迎信息
- `help` - 帮助信息
- `google [keywords]` - 在 Google 搜索关键词
- `baidu [keywords]` - 在百度搜索关键词
- `github` - 打开项目源码地址


## 未来计划

- `rm` - remove file
- `rd` - remove directory
- `j` - jump to a directory
- `mv` - move file
- `mkdir` - limit name of directory（`/`）
- `tree` - optimize the display of file tree
- Make a visual desktop file system(?)

## 技术栈

- Vue3 + TypeScript + Vite
- Pinia
- TailwindCSS

## 开发

```bash
# Install
pnpm install
# Run
pnpm dev
# Build
pnpm build
```

## 原理

这个终端系统的数据结构是一个 *N叉树（N-ary Tree）*，它模拟了真机的目录结构，以便实现新建文件和目录等功能。但是有一点不同，我设计了一个指针属性 `previous`，指向它的父节点，以便实现 `cd ..` 命令。

>  **Note**  
> 更多关于 N 叉树的知识: [N-ary Tree Data Structure](https://www.studytonight.com/advanced-data-structures/nary-tree)

目录类型的结构：
```ts
interface Directory {
  id: number  // id
  name: string // 当前目录名称
  files: File[] // 当前目录下的文件列表
  directories: Directory[]   // 当前目录下的子目录列表，同时也是指向子目录的指针
  previous: Directory | null // 指向父目录的指针
}
```

文件类型的结构：
```ts
interface File {
  name: string // file name
  value: string // file content
}
```