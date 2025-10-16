## 什么是 TypeScript？
TypeScript 是微软开发的一种开源编程语言，它是 JavaScript 的超集，添加了静态类型系统。这意味着所有 JavaScript 代码都是有效的 TypeScript 代码，同时 TypeScript 提供了额外的特性。

TypeScript 代码会被编译为纯 JavaScript 代码，因此可以运行在任何支持 JavaScript 的环境中。

## 为什么使用 TypeScript？
+ **静态类型检查**：在编译时就能发现错误，而不是在运行时
+ **更好的 IDE 支持**：提供自动完成、接口提示、重构等功能
+ **更好的代码可维护性**：类型定义使代码更清晰，更容易理解和维护
+ **支持现代 JavaScript 特性**：可以使用最新的 ES6+ 特性，并编译为兼容旧环境的代码

## 安装 TypeScript
首先需要安装 Node.js，然后使用 npm 安装 TypeScript 编译器：

```bash
npm install -g typescript
```

验证安装：

```bash
tsc --version
```

## 第一个 TypeScript 程序
创建一个 `hello.ts` 文件：

```typescript
function sayHello(name: string) {
  return `Hello, ${name}!`;
}

let user = "TypeScript";
console.log(sayHello(user));
```

编译 TypeScript 代码为 JavaScript：

```bash
tsc hello.ts
```

这会生成一个 `hello.js` 文件，内容如下：

```javascript
function sayHello(name) {
  return `Hello, ${name}!`;
}

let user = "TypeScript";
console.log(sayHello(user));
```

运行生成的 JavaScript 文件：

```bash
node hello.js
```

输出：`Hello, TypeScript!`

## 基本类型
TypeScript 提供了多种基本类型：

```typescript
// 布尔值
let isDone: boolean = false;

// 数字
let decimal: number = 6;
let hex: number = 0xf00d;
let binary: number = 0b1010;
let octal: number = 0o744;

// 字符串
let color: string = "blue";
color = 'red';

// 模板字符串
let fullName: string = `Bob Bobbington`;
let age: number = 37;
let sentence: string = `Hello, my name is ${fullName}. I'll be ${age + 1} years old next month.`;

// 数组
let list: number[] = [1, 2, 3];
// 或者使用泛型
let list: Array<number> = [1, 2, 3];

// 元组 Tuple
let x: [string, number];
x = ["hello", 10]; // 正确
x = [10, "hello"]; // 错误

// 枚举
enum Color {Red, Green, Blue}
let c: Color = Color.Green;

// Any - 表示任意类型
let notSure: any = 4;
notSure = "maybe a string instead";
notSure = false; // 也可以是 boolean

// Void - 表示没有任何类型，通常用于函数返回值
function warnUser(): void {
  console.log("This is my warning message");
}

// Null 和 Undefined
let u: undefined = undefined;
let n: null = null;

// Never - 表示那些永不存在的值的类型
function error(message: string): never {
  throw new Error(message);
}
```

## 接口（Interfaces）
接口用于定义对象的类型：

```typescript
interface Person {
  firstName: string;
  lastName: string;
}

function greet(person: Person) {
  return `Hello, ${person.firstName} ${person.lastName}`;
}

let user = { firstName: "John", lastName: "Doe" };
console.log(greet(user));
```

接口可以有可选属性和只读属性：

```typescript
interface SquareConfig {
  color?: string; // 可选属性
  width?: number;
  readonly id: number; // 只读属性
}

function createSquare(config: SquareConfig): {color: string; area: number} {
  let newSquare = {color: "white", area: 100};
  if (config.color) {
    newSquare.color = config.color;
  }
  if (config.width) {
    newSquare.area = config.width * config.width;
  }
  return newSquare;
}
```

## 类（Classes）
TypeScript 支持 ES6 的类，并且添加了类型注解和其他特性：

```typescript
class Greeter {
  greeting: string; // 属性声明
  
  constructor(message: string) { // 构造函数
    this.greeting = message;
  }
  
  greet() { // 方法
    return `Hello, ${this.greeting}`;
  }
}

let greeter = new Greeter("world");
console.log(greeter.greet());
```

TypeScript 还支持访问修饰符（public, private, protected）：

```typescript
class Animal {
  private name: string;
  
  constructor(theName: string) {
    this.name = theName;
  }
}

let animal = new Animal("Cat");
animal.name; // 错误，name 是 private
```

在 TypeScript 中，类的成员（属性和方法）可以使用访问修饰符来控制其可访问性。这三个核心修饰符 `public`、`private` 和 `protected` 用于定义类成员的访问级别，帮助我们实现封装和数据隐藏，构建更健壮的面向对象代码。

### 1. public（公共的）
`public` 是默认的访问修饰符，意味着类的成员可以在任何地方被访问，没有访问限制。

### 特点：
+ 类内部可以访问
+ 类的实例可以访问
+ 子类可以访问
+ 子类的实例可以访问

#### 示例：
```typescript
class Person {
  // 显式声明 public（与默认行为相同）
  public name: string;
  
  // 构造函数参数也可以使用修饰符
  constructor(public age: number) {
    this.name = "Unknown";
  }
  
  public greet(): string {
    return `Hello, my name is ${this.name}`;
  }
}

class Student extends Person {
  study(): void {
    // 可以访问父类的 public 成员
    console.log(`${this.name} is studying`);
  }
}

// 使用
const person = new Person(30);
console.log(person.name); // 可访问："Unknown"
console.log(person.age);  // 可访问：30
person.greet();           // 可访问

const student = new Student(20);
student.name = "Alice";   // 可访问
student.study();          // 输出："Alice is studying"
```

### 2. private（私有的）
`private` 修饰的成员只能在定义它们的类内部访问，在类外部或子类中都无法访问。

#### 特点：
+ 仅在当前类内部可访问
+ 类的实例无法访问
+ 子类无法访问
+ 子类的实例无法访问

#### 示例：
```typescript
class BankAccount {
  private balance: number;  // 私有属性
  
  constructor(initialBalance: number) {
    this.balance = initialBalance;
  }
  
  // 公共方法可以访问私有成员
  public deposit(amount: number): void {
    if (amount > 0) {
      this.balance += amount;
      this.logTransaction(amount, "deposit"); // 访问私有方法
    }
  }
  
  public getBalance(): number {
    return this.balance; // 提供访问私有属性的公共接口
  }
  
  private logTransaction(amount: number, type: string): void {
    console.log(`Transaction ${type}: ${amount}`);
  }
}

class SavingsAccount extends BankAccount {
  constructor(initialBalance: number) {
    super(initialBalance);
  }
  
  someMethod() {
    // 错误：无法访问父类的私有成员
    // console.log(this.balance);
    // this.logTransaction(0, "test");
  }
}

// 使用
const account = new BankAccount(1000);
account.deposit(500);
console.log(account.getBalance()); // 1500

// 错误：无法直接访问私有成员
// console.log(account.balance);
// account.logTransaction(0, "test");
```

#### TypeScript 特有的 `#` 私有字段
除了 `private` 关键字，TypeScript 还支持使用 `#` 定义私有字段，这是 ES 标准的私有字段语法：

```typescript
class Example {
  #privateField: string;  // ES 标准私有字段
  
  constructor(value: string) {
    this.#privateField = value;
  }


  get field() {
    return this.privateField
  }

  set field(value) {
    this.privateField = value
  }
  
  getPrivateValue() {
    return this.#privateField; // 类内部可访问
  }
}

const ex = new Example("secret");

ex.field = '666'

console.log(ex.getPrivateValue()); // "secret"
// 错误：无法访问
// console.log(ex.#privateField);
```

两者的主要区别是 `#` 私有字段在运行时也保持私有性，而 `private` 关键字只是 TypeScript 编译时的检查。

### 3. protected（受保护的）
`protected` 修饰的成员可以在当前类内部和其子类中访问，但不能在类外部访问。

#### 特点：
+ 当前类内部可访问
+ 子类内部可访问
+ 类的实例无法访问
+ 子类的实例无法访问

#### 示例：
```typescript
class Animal {
  protected name: string;  // 受保护的属性
  
  constructor(name: string) {
    this.name = name;
  }
  
  protected makeSound(): void {
    // 受保护的方法
    console.log("Some sound");
  }
}

class Dog extends Animal {
  constructor(name: string) {
    super(name);
  }
  
  // 子类可以访问父类的 protected 成员
  bark(): void {
    console.log(`${this.name} barks: Woof!`);
    this.makeSound(); // 调用父类的受保护方法
  }
}

// 使用
const dog = new Dog("Buddy");
dog.bark(); // 输出："Buddy barks: Woof!" 和 "Some sound"

// 错误：无法在类外部访问 protected 成员
// console.log(dog.name);
// dog.makeSound();
```

#### 构造函数的 protected 修饰符
如果类的构造函数被标记为 `protected`，则该类不能被实例化，但可以被继承：

```typescript
class AbstractBase {
  protected constructor() {
    // 构造函数受保护
  }
}

// 错误：无法实例化构造函数受保护的类
// const base = new AbstractBase();

// 正确：可以继承
class Concrete extends AbstractBase {
  constructor() {
    super(); // 子类可以调用父类的 protected 构造函数
  }
}

const concrete = new Concrete(); // 正确
```

### 访问修饰符总结表
| 修饰符 | 类内部 | 类实例 | 子类内部 | 子类实例 |
| --- | --- | --- | --- | --- |
| public | ✅ 可访问 | ✅ 可访问 | ✅ 可访问 | ✅ 可访问 |
| private | ✅ 可访问 | ❌ 不可访问 | ❌ 不可访问 | ❌ 不可访问 |
| protected | ✅ 可访问 | ❌ 不可访问 | ✅ 可访问 | ❌ 不可访问 |


### 实际应用场景
1. **public**：
    - 类的公共接口和方法
    - 需要暴露给外部使用的属性和方法
    - 例如：`User` 类的 `getName()` 方法
2. **private**：
    - 类的内部状态和辅助方法
    - 不希望被外部修改的敏感数据
    - 例如：`BankAccount` 类的 `balance` 属性
3. **protected**：
    - 希望被子类继承和使用，但不希望被外部访问的成员
    - 用于实现继承层次中的共享逻辑
    - 例如：`Animal` 类的 `name` 属性，供子类 `Dog`、`Cat` 使用

### 最佳实践
1. 遵循"最小权限原则"：尽可能使用更严格的访问修饰符
2. 公开必要的接口，隐藏实现细节
3. 使用 `private` 保护内部状态，通过公共方法提供受控访问
4. 使用 `protected` 实现类层次结构中的代码复用
5. 对需要在运行时保持私有性的成员，使用 `#` 私有字段

通过合理使用这些访问修饰符，你可以在 TypeScript 中实现更好的封装性，减少错误，提高代码的可维护性和安全性。

# 
## 函数（Functions）
TypeScript 中的函数可以指定参数类型和返回值类型：

```typescript
function add(x: number, y: number): number {
  return x + y;
}

// 可选参数
function buildName(firstName: string, lastName?: string): string {
  if (lastName) {
    return `${firstName} ${lastName}`;
  } else {
    return firstName;
  }
}

// 默认参数
function buildName(firstName: string, lastName: string = "Smith"): string {
  return `${firstName} ${lastName}`;
}

// 剩余参数
function buildName(firstName: string, ...restOfName: string[]): string {
  return `${firstName} ${restOfName.join(" ")}`;
}
```

## 泛型（Generics）
泛型允许创建可重用的组件，这些组件可以支持多种类型：

```typescript
// 泛型函数
function identity<T>(arg: T): T {
  return arg;
}

let output1 = identity<string>("myString");
let output2 = identity<number>(100);

// 泛型接口
interface GenericIdentityFn<T> {
  (arg: T): T;
}

// 泛型类
class GenericNumber<T> {
  zeroValue: T;
  add: (x: T, y: T) => T;
}

let myGenericNumber = new GenericNumber<number>();
myGenericNumber.zeroValue = 0;
myGenericNumber.add = function(x, y) { return x + y; };
```

## 模块（Modules）
TypeScript 支持模块系统，可以使用 `import` 和 `export`：

```typescript
// math.ts
export function add(x: number, y: number): number {
  return x + y;
}

export const pi: number = 3.14159;

// app.ts
import { add, pi } from './math';

console.log(add(2, 3)); // 5
console.log(pi); // 3.14159
```

## 配置文件（tsconfig.json）
`tsconfig.json` 文件用于配置 TypeScript 编译器的选项：

```json
{
  "compilerOptions": {
    "target": "es5",
    "module": "commonjs",
    "outDir": "dist",
    "rootDir": "src",
    "strict": true,
    "esModuleInterop": true
  },
  "include": ["src/**/*"],
  "exclude": ["node_modules", "**/*.test.ts"]
}
```

主要选项说明：

+ `target`：编译后的 JavaScript 版本
+ `module`：模块系统
+ `outDir`：输出目录
+ `rootDir`：源文件目录
+ `strict`：启用所有严格类型检查选项

## 总结
TypeScript 为 JavaScript 带来了静态类型检查，提高了代码质量和可维护性。本教程介绍了 TypeScript 的基本概念和特性，包括类型系统、接口、类、函数、泛型和模块等。

要深入学习 TypeScript，建议参考 [官方文档](https://www.typescriptlang.org/docs/) 并进行实践练习。

