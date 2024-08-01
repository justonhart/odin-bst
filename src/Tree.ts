import Node from './Node';
export default class Tree {
	private root: Node;

	private buildTree(arr: Number[]): void {}

	public prettyPrint(node: Node, prefix = '', isLeft = true): void {
		if (node) {
			if (node.right) {
				this.prettyPrint(
					node.right,
					`${prefix}${isLeft ? '│   ' : '    '}`,
					false,
				);
			}
			console.log(`${prefix}${isLeft ? '└── ' : '┌── '}${node.data}`);
			if (node.left) {
				this.prettyPrint(
					node.left,
					`${prefix}${isLeft ? '    ' : '│   '}`,
					true,
				);
			}
		}
	}

	public insert(value: Number): void {}

	public deleteItem(value: Number): void {}

	public find(value: Number): Node {
		return;
	}

	public levelOrder(callback: Function): void {}

	public inOrder(callback: Function): void {}

	public preOrder(callback: Function): void {}

	public postOrder(callback: Function): void {}

	public isBalanced(): boolean {
		return;
	}

	public rebalance(): void {}
}
