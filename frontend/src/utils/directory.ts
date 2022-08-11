import { DirectoryTree } from '@/types/api';
import path from 'path';

function createNode(paths: string[], dir: DirectoryTree, tree: DirectoryTree[]): void {
  const name = paths.shift() as string;
  const idx = tree.findIndex((node) => {
    return node.name === name;
  });
  if (idx < 0) {
    tree.push({
      ...dir,
      id: paths.length === 0 ? dir.id : undefined,
      name,
      type: 'directory',
      children: [],
    });
    if (paths.length !== 0) {
      createNode(paths, dir, tree[tree.length - 1].children!);
    }
  } else {
    createNode(paths, dir, tree[idx].children!);
  }
}

export default function dirList2Tree(dirs: DirectoryTree[]): DirectoryTree[] {
  const tree: DirectoryTree[] = [];
  for (let i = 0; i < dirs.length; i++) {
    const dir = dirs[i];
    const splittedPath: string[] = dir.path.split('/');
    createNode(splittedPath, dir, tree);
  }
  return tree;
}
