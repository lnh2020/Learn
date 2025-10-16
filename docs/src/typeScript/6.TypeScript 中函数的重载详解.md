函数重载（Function Overloading）是 TypeScript 提供的一项强大特性，允许我们为同一个函数定义多个类型签名，以处理不同的参数类型或参数数量，同时保持类型安全。

## 什么是函数重载？
函数重载指的是为同一个函数提供多个不同的类型定义（签名），根据传入的参数类型和数量，TypeScript 会自动选择匹配的类型签名进行类型检查。

这与某些其他语言（如 Java）中的函数重载不同，TypeScript 的函数重载仅在类型系统层面工作，最终仍然只有一个函数实现。

## 函数重载的基本语法
函数重载的语法由两部分组成：

1. 多个重载签名（只定义参数类型和返回类型，没有函数体）
2. 一个实现签名（包含完整的函数实现）

```typescript
// 重载签名1
function funcName(param1: type1): returnType1;

// 重载签名2
function funcName(param1: type2, param2: type2): returnType2;

// 实现签名
function funcName(param1: type1 | type2, param2?: type2): returnType1 | returnType2 {
  // 函数实现
}
```

## 函数重载的实例
### 1. 不同参数数量
```typescript
// 重载签名：两个参数
function add(a: number, b: number): number;

// 重载签名：三个参数
function add(a: number, b: number, c: number): number;

// 实现签名
function add(a: number, b: number, c?: number): number {
  if (c !== undefined) {
    return a + b + c;
  }
  return a + b;
}

console.log(add(1, 2));      // 3（匹配第一个签名）
console.log(add(1, 2, 3));   // 6（匹配第二个签名）
```

### 2. 不同参数类型
```typescript
// 重载签名：处理字符串
function formatInput(input: string): string;

// 重载签名：处理数字
function formatInput(input: number): string;

// 实现签名
function formatInput(input: string | number): string {
  if (typeof input === 'string') {
    return input.trim().toUpperCase();
  } else {
    return input.toFixed(2);
  }
}

console.log(formatInput("  hello  "));  // "HELLO"
console.log(formatInput(123.456));     // "123.46"
```

### 3. 不同返回类型
```typescript
// 重载签名：返回字符串长度
function process(value: string): number;

// 重载签名：返回数组元素总和
function process(value: number[]): number;

// 重载签名：返回对象属性数量
function process(value: object): number;

// 实现签名
function process(value: string | number[] | object): number {
  if (typeof value === 'string') {
    return value.length;
  } else if (Array.isArray(value)) {
    return value.reduce((sum, item) => sum + item, 0);
  } else {
    return Object.keys(value).length;
  }
}

console.log(process("hello"));          // 5
console.log(process([1, 2, 3]));        // 6
console.log(process({ name: "John", age: 30 }));  // 2
```

### 4. 可选参数与默认参数
```typescript
// 重载签名1：无参数
function greet(): string;

// 重载签名2：一个参数
function greet(name: string): string;

// 重载签名3：两个参数
function greet(name: string, title: string): string;

// 实现签名
function greet(name?: string, title?: string): string {
  if (name && title) {
    return `Hello, ${title} ${name}!`;
  } else if (name) {
    return `Hello, ${name}!`;
  } else {
    return "Hello, stranger!";
  }
}

console.log(greet());                // "Hello, stranger!"
console.log(greet("John"));          // "Hello, John!"
console.log(greet("Doe", "Mr."));    // "Hello, Mr. Doe!"
```

## 函数重载的注意事项
1. **重载签名顺序很重要**  
TypeScript 会按照重载签名的定义顺序进行匹配，因此更具体的签名应该放在前面，更通用的签名放在后面：

```typescript
// 正确的顺序
function handleValue(x: string): string;
function handleValue(x: any): any;

// 错误的顺序（通用签名在前会导致具体签名无法被匹配）
function handleValue(x: any): any;
function handleValue(x: string): string;  // 这个签名永远不会被匹配
```

2. **实现签名必须兼容所有重载签名**  
实现签名的参数类型必须是所有重载签名参数类型的联合类型，返回类型也必须兼容所有重载签名的返回类型。
3. **函数表达式不支持重载**  
函数重载仅适用于函数声明，不适用于函数表达式：

```typescript
// 这是错误的
const myFunc = function(a: number): number;
const myFunc = function(a: string): string;
const myFunc = function(a: number | string): number | string {
  // 实现...
};
```

4. **箭头函数不支持重载**  
箭头函数无法定义重载签名，只能使用联合类型来模拟类似效果。

## 何时使用函数重载
1. 当一个函数需要处理多种不同类型的输入时
2. 当函数的返回类型依赖于输入类型时
3. 当需要为函数提供更清晰的类型文档时
4. 当希望编辑器提供更精确的自动补全提示时

## 总结
函数重载是 TypeScript 中增强函数类型安全性的重要特性，通过定义多个重载签名，可以：

+ 使函数能处理多种不同的参数组合
+ 提供更精确的类型检查
+ 改善代码的可读性和可维护性
+ 为使用者提供更好的类型提示

合理使用函数重载可以让你的 TypeScript 代码更加健壮和易用，但也要注意不要过度使用，简单的场景下使用联合类型可能更为简洁。

