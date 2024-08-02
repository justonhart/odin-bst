import Node from './Node';
export default class Tree {
	private root: Node;

	constructor(arr: number[]) {
		this.root = this.buildTree(arr);
	}

	/**
	 * Recursively build a balanced BST from an unsorted array
	 */
	private buildTree(arr: number[]): Node {
		if (!arr || arr.length < 1) {
			throw new Error(
				'Input must be valid array with at least one value',
			);
		}

		//remove duplicates and sort
		arr = Array.from(new Set(arr));
		arr.sort();

		//get midpoint of array for root
		let midpointIndex = Math.floor(arr.length / 2);

		let rootNode = new Node();
		rootNode.data = arr[midpointIndex];

		if (arr.length > 1) {
			let leftArr = arr.slice(0, midpointIndex);
			rootNode.left = this.buildTree(leftArr);

			if (arr.length > 2) {
				let rightArr = arr.slice(midpointIndex + 1, arr.length);
				rootNode.right = this.buildTree(rightArr);
			}
		}

		return rootNode;
	}

	/**
	 * Recursively visualizes a tree by drawing nodes
	 */
	private prettyPrintNode(node: Node, prefix = '', isLeft = true): void {
		if (node) {
			if (node.right) {
				this.prettyPrintNode(
					node.right,
					`${prefix}${isLeft ? '│   ' : '    '}`,
					false,
				);
			}
			console.log(`${prefix}${isLeft ? '└── ' : '┌── '}${node.data}`);
			if (node.left) {
				this.prettyPrintNode(
					node.left,
					`${prefix}${isLeft ? '    ' : '│   '}`,
					true,
				);
			}
		}
	}

	/**
	 * Public method to pretty print a tree
	 */
	public prettyPrint(): void {
		this.prettyPrintNode(this.root);
	}

	public insert(value: number): void {}

	public deleteItem(value: number): void {}

	public find(value: number): Node {
		return;
	}

	/**
	 * Execute a callback function on tree values using level-order traversal
	 */
	public levelOrder(callback: Function): void {
		const nodesToTraverse = [this.root];
		const traverseNode = (node: Node) => {
			if (node.left) {
				nodesToTraverse.push(node.left);
			}
			if (node.right) {
				nodesToTraverse.push(node.right);
			}
			callback(node.data);
		};

		while (nodesToTraverse.length) {
			traverseNode(nodesToTraverse.shift());
		}
	}

	/**
	 * Execute a callback function on tree values using in-order traversal
	 */
	public inOrder(callback: Function): void {
		const traverseNode = (node: Node) => {
			if (node.left) traverseNode(node.left);
			callback(node.data);
			if (node.right) traverseNode(node.right);
		};
		traverseNode(this.root);
	}

	/**
	 * Execute a callback function on tree values using pre-order traversal
	 */
	public preOrder(callback: Function): void {
		const traverseNode = (node: Node) => {
			callback(node.data);
			if (node.left) traverseNode(node.left);
			if (node.right) traverseNode(node.right);
		};
		traverseNode(this.root);
	}

	/**
	 * Execute a callback function on tree values using post-order traversal
	 */
	public postOrder(callback: Function): void {
		const traverseNode = (node: Node) => {
			if (node.left) traverseNode(node.left);
			if (node.right) traverseNode(node.right);
			callback(node.data);
		};
		traverseNode(this.root);
	}

	public isBalanced(): boolean {
		return;
	}

	public rebalance(): void {}
}
