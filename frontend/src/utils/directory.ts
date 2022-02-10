import { DirectoryTree } from '@/types/api'

function createNode(
  path: string[],
  dir: DirectoryTree,
  tree: DirectoryTree[]
): void {
  const name = path.shift() as string
  const idx = tree.findIndex((node) => {
    return node.name === name
  })
  if (idx < 0) {
    tree.push({
      ...dir,
      name,
      children: []
    })
    if (path.length !== 0) {
      createNode(path, dir, tree[tree.length - 1].children!)
    }
  } else {
    createNode(path, dir, tree[idx].children!)
  }
}

export default function dirList2Tree(dirs: DirectoryTree[]): DirectoryTree[] {
  const tree: DirectoryTree[] = []
  for (let i = 0; i < dirs.length; i++) {
    const dir = dirs[i]
    const splittedPath: string[] = dir.path.split('/')
    createNode(splittedPath, dir, tree)
  }
  return tree
}
