export function sum(num1, num2) {
  return num1 + num2
}

//防抖函数
export function debounce(func, delay) {
  let timer = null;
  return function(...args) {
    if (timer) clearTimeout(timer);
    timer = setTimeout(() => {
      func.apply(this, args)
    }, delay);
  }
}