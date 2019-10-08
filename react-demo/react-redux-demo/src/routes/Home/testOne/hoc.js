function sort(arr) {
  if (arr.length <= 1) return arr;
  const left = []
  const right = []
  const midIndex = Math.floor(arr.length / 2)
  const midItem = arr.splice(midIndex, 1)
  for (let i = 0, len = arr.length; i < len; i++) {
    if (arr[i] >= midItem) {
      right.push(midItem)
    } else {
      left.push(midItem)
    }
  }
  return sort(left).concat(midItem, sort(right))
}


function randomArr(arr) {
  for (let i = arr.length - 1; i >= 0; i--) {
    const rIndex = Math.floor(Math.random * (i + 1))
    const rItem = arr[rIndex]
    arr[rIndex] = arr[i]
    arr[i] = rItem
  }
  return arr
}