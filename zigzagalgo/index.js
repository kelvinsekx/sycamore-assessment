// for some reason, I couldn't test this solution in codility because their test suits are in python/rust tuple
// I tried changing it, but it never worked

function solution(T) {
  // Implement your solution here
  if (T == null) return 0
  const longestZigZag = function (root) {
    return Math.max(helper(root.left, true, 1), helper(root.right, false, 1))
  }

  const helper = function (root, isLeft, depth) {
    if (root == null) return depth
    if (isLeft) {
      return Math.max(depth, helper(root.right, false, depth + 1))
    } else {
      return Math.max(depth, helper(root.left, true, depth + 1))
    }
  }

  return longestZigZag(T)
}

solution(null)
