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

		let rootNode = new Node(arr[midpointIndex]);
		rootNode.value = arr[midpointIndex];

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
			console.log(`${prefix}${isLeft ? '└── ' : '┌── '}${node.value}`);
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

	public insert(value: number): void {
		const traverseNodes = (node: Node) => {
			if (value < node.value) {
				if (node.left) {
					traverseNodes(node.left);
				} else {
					node.left = new Node(value);
				}
			} else if (value > node.value) {
				if (node.right) {
					traverseNodes(node.right);
				} else {
					node.right = new Node(value);
				}
			}
		};

		traverseNodes(this.root);
	}

	public deleteItem(value: number): void {
		let parentNode: Node = null;
		let currentNodeIsLeftChild = false;
		let currentNode = this.root;
		while (true) {
			if (value < currentNode.value) {
				if (currentNode.left) {
					parentNode = currentNode;
					currentNodeIsLeftChild = true;
					currentNode = currentNode.left;
				} else {
					//if there are no more children, return;
					return;
				}
			} else if (value > currentNode.value) {
				if (currentNode.right) {
					parentNode = currentNode;
					currentNodeIsLeftChild = false;
					currentNode = currentNode.right;
				} else {
					return;
				}
			} else {
				//we have found target node; handle delete cases
				//if node has no children, just remove reference from parent
				if (!currentNode.left && !currentNode.right) {
					if (parentNode === null) {
						this.root = null;
						return;
					}
					if (currentNodeIsLeftChild) {
						parentNode.left = null;
						return;
					} else {
						parentNode.right = null;
						return;
					}
				}

				//if node only has one child, replace node reference on parent with child
				else if (currentNode.left && !currentNode.right) {
					if (parentNode === null) {
						this.root = currentNode.left;
						return;
					}
					if (currentNodeIsLeftChild) {
						parentNode.left = currentNode.left;
						return;
					} else {
						parentNode.right = currentNode.left;
						return;
					}
				} else if (!currentNode.left && currentNode.right) {
					if (parentNode === null) {
						this.root = currentNode.right;
						return;
					}
					if (currentNodeIsLeftChild) {
						parentNode.left = currentNode.right;
						return;
					} else {
						parentNode.right = currentNode.right;
						return;
					}
				}

				//if node has two children, find the next in-order value among them and replace the current node's value with it, then delete that node
				else {
					let currentChild = currentNode.right;

					if (currentChild.left) {
						while (currentChild.left.left) {
							currentChild = currentChild.left;
						}

						currentNode.value = currentChild.left.value;
						currentChild.left = null;
					} else {
						currentNode.value = currentChild.value;
						currentNode.right = null;
					}
					return;
				}
			}
		}
	}

	public find(value: number): Node | null {
		let targetNode = null;

		const searchNodes = (node: Node) => {
			if (value === node.value) {
				targetNode = node;
				return;
			}
			if (value < node.value && node.left) searchNodes(node.left);
			if (value > node.value && node.right) searchNodes(node.right);
		};

		searchNodes(this.root);

		return targetNode;
	}

	/**
	 * Execute a callback function on tree values using level-order traversal
	 */
	public levelOrder(callback: Function): void {
		if (this.root === null) return null;
		const nodesToTraverse = [this.root];
		const traverseNode = (node: Node) => {
			if (node.left) {
				nodesToTraverse.push(node.left);
			}
			if (node.right) {
				nodesToTraverse.push(node.right);
			}
			callback(node.value);
		};

		while (nodesToTraverse.length) {
			traverseNode(nodesToTraverse.shift());
		}
	}

	/**
	 * Execute a callback function on tree values using in-order traversal
	 */
	public inOrder(callback: Function): void {
		if (this.root === null) return null;
		const traverseNode = (node: Node) => {
			if (node.left) traverseNode(node.left);
			callback(node.value);
			if (node.right) traverseNode(node.right);
		};
		traverseNode(this.root);
	}

	/**
	 * Execute a callback function on tree values using pre-order traversal
	 */
	public preOrder(callback: Function): void {
		if (this.root === null) return null;
		const traverseNode = (node: Node) => {
			callback(node.value);
			if (node.left) traverseNode(node.left);
			if (node.right) traverseNode(node.right);
		};
		traverseNode(this.root);
	}

	/**
	 * Execute a callback function on tree values using post-order traversal
	 */
	public postOrder(callback: Function): void {
		if (this.root === null) return null;
		const traverseNode = (node: Node) => {
			if (node.left) traverseNode(node.left);
			if (node.right) traverseNode(node.right);
			callback(node.value);
		};
		traverseNode(this.root);
	}

	public isBalanced(): boolean {
		return;
	}

	public rebalance(): void {}
}
