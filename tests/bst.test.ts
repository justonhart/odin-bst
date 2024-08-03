import Tree from '../src/Tree';
import Node from '../src/Node';

// simple string and function to validate methods
let testString: string;
const appendTestString = (node: Node) => {
	testString += node.value.toString();
};

afterEach(() => (testString = ''));

describe('constructor testing', () => {
	test("valid input doesn't error", () => {
		const constMock = jest.fn(() => new Tree([1, 6, 2, 5, 2, 4, 3]));
		constMock();
		expect(constMock).toHaveReturned();
	});

	test('empty array input throws error', () => {
		expect(() => new Tree([])).toThrow();
	});
});

describe('traversal method testing', () => {
	let myTree = new Tree([1, 6, 2, 5, 3, 4]);

	test('level order test', () => {
		myTree.levelOrder(appendTestString);
		expect(testString).toBe('426135');
	});

	test('in order test', () => {
		myTree.inOrder(appendTestString);
		expect(testString).toBe('123456');
	});

	test('pre order test', () => {
		myTree.preOrder(appendTestString);
		expect(testString).toBe('421365');
	});

	test('post order test', () => {
		myTree.postOrder(appendTestString);
		expect(testString).toBe('132564');
	});
});

describe('find method testing', () => {
	let myTree = new Tree([1, 6, 2, 5, 2, 4, 3]);

	test('find existing value returns expected node', () => {
		let foundNode = myTree.find(6);
		const expectedNode = new Node(6);
		expectedNode.left = new Node(5);
		expect(foundNode).toEqual(expectedNode);
	});

	test('find non-existing value returns null', () => {
		let foundNode = myTree.find(11);
		expect(foundNode).toEqual(null);
	});
});

describe('mutation method testing', () => {
	let myTree: Tree;

	beforeEach(() => {
		myTree = new Tree([1, 6, 2, 5, 2, 4, 3]);
	});

	test('insert adds new values to correct location', () => {
		myTree.insert(9);
		myTree.insert(0);

		//duplicates should just be dropped for now
		myTree.insert(2);

		myTree.insert(8);

		myTree.inOrder(appendTestString);
		expect(testString).toBe('012345689');
	});

	test('delete leaf value only removes that value', () => {
		myTree.deleteItem(5);
		myTree.levelOrder(appendTestString);
		expect(testString).toBe('42613');

		testString = '';
		myTree.deleteItem(6);
		myTree.levelOrder(appendTestString);
		expect(testString).toBe('4213');
	});

	test('delete root value moves next in-order value as expected', () => {
		myTree.deleteItem(4);
		myTree.levelOrder(appendTestString);
		expect(testString).toBe('52613');

		testString = '';
		myTree.deleteItem(2);
		myTree.levelOrder(appendTestString);
		expect(testString).toBe('5361');
	});

	test('delete value with one child moves child', () => {
		myTree.deleteItem(6);
		myTree.levelOrder(appendTestString);
		expect(testString).toBe('42513');
	});

	test('delete single node tree value works', () => {
		let mySmallTree = new Tree([4]);
		mySmallTree.deleteItem(4);
		mySmallTree.levelOrder(appendTestString);
		expect(testString).toBe('');
	});

	test('comprehensive delete test', () => {
		myTree.deleteItem(6);
		myTree.deleteItem(3);
		myTree.deleteItem(4);

		myTree.levelOrder(appendTestString);
		expect(testString).toBe('521');
	});
});

describe('height and depth testing', () => {
	let myTree: Tree;

	beforeEach(() => {
		myTree = new Tree([4, 2, 6, 2, 5, 2, 1, 3]);
	});

	test('height of leaf is 0', () => {
		let height = Tree.height(myTree.find(1) as Node);
		expect(height).toBe(0);

		height = Tree.height(myTree.find(5) as Node);
		expect(height).toBe(0);
	});

	test('height returns highest number of edges between children nodes', () => {
		let height = Tree.height(myTree.find(4) as Node);
		expect(height).toBe(2);

		height = Tree.height(myTree.find(6) as Node);
		expect(height).toBe(1);
	});

	test('depth of root is 0', () => {
		let depth = myTree.depth(myTree.find(4) as Node);
		expect(depth).toBe(0);
	});

	test('depth returns number of edges between node with given value and root', () => {
		let depth = myTree.depth(myTree.find(1) as Node);
		expect(depth).toBe(2);

		depth = myTree.depth(myTree.find(6) as Node);
		expect(depth).toBe(1);
	});
});

describe('balance methods', () => {
	test('isBalanced returns true on balanced tree', () => {
		let myTree = new Tree([5]);
		expect(myTree.isBalanced()).toBe(true);

		myTree.insert(2);
		myTree.insert(7);
		expect(myTree.isBalanced()).toBe(true);
	});

	test('isBalanced returns false on unbalanced tree', () => {
		let myTree = new Tree([5]);
		myTree.insert(2);
		myTree.insert(1);
		expect(myTree.isBalanced()).toBe(false);
	});

	test('rebalance restructures tree to be balanced', () => {
		let myTree = new Tree([5]);
		myTree.insert(2);
		myTree.insert(1);
		expect(myTree.isBalanced()).toBe(false);
		myTree.rebalance();
		expect(myTree.isBalanced()).toBe(true);
	});
});
