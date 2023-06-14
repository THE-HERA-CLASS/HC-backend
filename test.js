// BST에서 각 노드를 표현하는 클래스
class Node {
  constructor(data, left = null, right = null) {
    this.data = data;   // 노드의 데이터
    this.left = left;   // 노드의 왼쪽 자식
    this.right = right; // 노드의 오른쪽 자식
  }
}

// BST를 표현하는 클래스
class BinarySearchTree {
  constructor() {
    this.root = null;   // 루트 노드를 초기값 null로 설정
  }
  // createBSTHelper 메소드를 호출하여 이진 탐색 트리를 생성하고,
  // 생성된 트리의 루트 노드를 this.root에 저장한다
  // 이 메소드에 전달되는 인자 arr는 이진 탐색 트리를 생성할 배열이다.
  createBST(arr) {
    this.root = this.createBSTHelper(arr, 0, arr.length - 1);
  }
  // arr: 이진 탐색 트리를 생성할 배열
  // start: 배열에서 이진 탐색 트리를 생성할 범위의 시작 인덱스
  // end: 배열에서 이진 탐색 트리를 생성할 범위의 끝 인덱스
  createBSTHelper(arr, start, end) {
    // 재귀 호출의 종료 조건
    // start가 end보다 크다는 것은 서브트리를 생성할 요소가 배열에 더 이상 없다는 것을 의미하므로,
    // 이 경우에는 null을 반환하여 재귀 호출을 종료한다.
    // 이 null 값은 노드가 자식을 가지지 않을 때 해당 자식 노드의 값으로 설정된다.
    if (start > end) {
      return null;
    }
    //배열의 중간 인덱스를 계산한다 이 중간 인덱스는 이진 탐색 트리의 루트 노드가 될 요소의 인덱스이다.
    let mid = Math.floor((start + end) / 2);
    let node = new Node(arr[mid]);

    node.left = this.createBSTHelper(arr, start, mid - 1);
    node.right = this.createBSTHelper(arr, mid + 1, end);

    return node;
  }

  printTree(node = this.root, indent = "") {
    if (node !== null) {
      console.log(`${indent}Node ${node.data}:`);
      if (node.left !== null) {
        console.log(`${indent}  Left: ${node.left.data}`);
        this.printTree(node.left, indent + "    ");
      } else {
        console.log(`${indent}  Left: null`);
      }
      if (node.right !== null) {
        console.log(`${indent}  Right: ${node.right.data}`);
        this.printTree(node.right, indent + "    ");
      } else {
        console.log(`${indent}  Right: null`);
      }
    }
  }
}

const bst = new BinarySearchTree();
const arr = [1, 2, 3, 4, 5, 6, 7, 8, 9];
bst.createBST(arr);
bst.printTree();
