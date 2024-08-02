import Tree from '../src/Tree';

// simple string and function to validate methods
let testString: string;
const appendTestString = (val: number) => {
	testString += val.toString();
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
});
