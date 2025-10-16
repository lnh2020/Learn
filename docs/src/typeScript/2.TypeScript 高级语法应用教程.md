## 类型别名（Type Aliases）
类型别名允许你为类型创建新名称，对于复杂类型特别有用：

```typescript
// 基本类型别名
type StringOrNumber = string | number;

// 对象类型别名
type User = {
  id: number;
  name: string;
  email: string;
};

// 函数类型别名
type MathOperation = (a: number, b: number) => number;

// 使用类型别名
const add: MathOperation = (a, b) => a + b;
const multiply: MathOperation = (a, b) => a * b;

// 泛型类型别名
type Container<T> = { value: T };
type Tree<T> = {
  value: T;
  left?: Tree<T>;
  right?: Tree<T>;
};
```

类型别名与接口的区别：

+ 接口可以被多次声明并自动合并，类型别名不行
+ 接口可以被类实现，类型别名不行
+ 类型别名可以表示基本类型、联合类型、元组等，接口不行

## 高级类型
### 交叉类型（Intersection Types）
交叉类型将多个类型合并为一个类型，新类型具有所有类型的特性：

```typescript
interface Person {
  name: string;
}

interface Contact {
  phone: string;
}

// Person & Contact 同时具有 name 和 phone 属性
type ContactPerson = Person & Contact;

const person: ContactPerson = {
  name: "John",
  phone: "123-456-7890"
};
```

### 联合类型（Union Types）
联合类型表示一个值可以是几种类型之一：

```typescript
type StringOrNumber = string | number;

function printId(id: StringOrNumber) {
  console.log(`ID: ${id}`);
}

// 联合类型与类型守卫
function formatValue(value: string | number | boolean) {
  if (typeof value === "string") {
    return value.toUpperCase();
  }
  if (typeof value === "number") {
    return value.toFixed(2);
  }
  return value ? "Yes" : "No";
}
```

### 类型守卫（Type Guards）
类型守卫用于在运行时确定变量的类型，常用的有：

```typescript
// typeof 类型守卫
function isNumber(value: unknown): value is number {
  return typeof value === 'number';
}

// instanceof 类型守卫
class Dog { bark() {} }
class Cat { meow() {} }

function isDog(animal: Dog | Cat): animal is Dog {
  return animal instanceof Dog;
}

// in 操作符类型守卫
interface Bird { fly: () => void }
interface Fish { swim: () => void }

function move(animal: Bird | Fish) {
  if ('fly' in animal) {
    return animal.fly();
  }
  return animal.swim();
}

// 自定义类型守卫
function isStringArray(value: unknown): value is string[] {
  return Array.isArray(value) && value.every(item => typeof item === 'string');
}
```

## 泛型高级应用
### 泛型约束
限制泛型可以接受的类型：

```typescript
// 基础约束
interface Lengthwise {
  length: number;
}

function loggingIdentity<T extends Lengthwise>(arg: T): T {
  console.log(arg.length);
  return arg;
}

// 多重约束
interface HasId {
  id: number;
}

interface HasName {
  name: string;
}

function processItem<T extends HasId & HasName>(item: T) {
  console.log(`Processing ${item.name} (ID: ${item.id})`);
}

// 使用 keyof 约束
function getProperty<T, K extends keyof T>(obj: T, key: K): T[K] {
  return obj[key];
}

const obj = { a: 1, b: 2, c: 3 };
getProperty(obj, "a"); // 正确
getProperty(obj, "d"); // 错误，"d" 不是 obj 的键
```

### 泛型默认值
为泛型参数指定默认类型：

```typescript
// 泛型函数默认值
function createArray<T = string>(length: number, value: T): T[] {
  return Array(length).fill(value);
}

// 泛型接口默认值
interface Cache<T = string> {
  data: T[];
  add: (item: T) => void;
}

// 泛型类默认值
class Repository<T = unknown> {
  private items: T[] = [];
  
  add(item: T) {
    this.items.push(item);
  }
  
  getById(id: number): T | undefined {
    return this.items[id];
  }
}
```

### 条件类型
根据条件选择不同的类型：

```typescript
// 基础条件类型
type IsString<T> = T extends string ? "yes" : "no";
type A = IsString<string>; // "yes"
type B = IsString<number>; // "no"

// 分布式条件类型
type ToArray<T> = T extends any ? T[] : never;
type C = ToArray<string | number>; // string[] | number[]

// 提取和排除类型
type Extract<T, U> = T extends U ? T : never;
type Exclude<T, U> = T extends U ? never : T;

type D = Extract<string | number | boolean, number | boolean>; // number | boolean
type E = Exclude<string | number | boolean, number | boolean>; // string

// 推断类型
type ReturnType<T> = T extends (...args: any[]) => infer R ? R : any;
type F = ReturnType<() => string>; // string
```

## 映射类型
映射类型允许你通过映射现有类型的每个属性来创建新类型：

```typescript
// 基础映射类型
interface User {
  id: number;
  name: string;
  email: string;
}

// 只读映射
type ReadonlyUser = {
  readonly [K in keyof User]: User[K];
};

// 可选映射
type PartialUser = {
  [K in keyof User]?: User[K];
};

// TypeScript 内置映射类型
// Readonly<T> - 所有属性变为只读
// Partial<T> - 所有属性变为可选
// Required<T> - 所有属性变为必选
// Pick<T, K> - 从 T 中选择 K 属性
// Record<K, T> - 创建一个类型，其属性为 K 类型，值为 T 类型

// 自定义映射类型
type Nullable<T> = {
  [K in keyof T]: T[K] | null;
};

type UserWithAge = User & { age: number };
type NullableUser = Nullable<UserWithAge>;
// { id: number | null; name: string | null; email: string | null; age: number | null }
```

## 装饰器（Decorators）
装饰器是一种特殊类型的声明，它可以附加到类、方法、属性或参数上，用于修改类的行为。

> 注意：装饰器目前是实验性特性，需要在 tsconfig.json 中启用 "experimentalDecorators": true
>

```typescript
// 类装饰器
function sealed(constructor: Function) {
  Object.seal(constructor);
  Object.seal(constructor.prototype);
}

@sealed
class Greeter {
  greeting: string;
  constructor(message: string) {
    this.greeting = message;
  }
  greet() {
    return `Hello, ${this.greeting}`;
  }
}

// 方法装饰器
function log(target: any, propertyKey: string, descriptor: PropertyDescriptor) {
  const originalMethod = descriptor.value;
  
  descriptor.value = function(...args: any[]) {
    console.log(`Calling ${propertyKey} with arguments: ${JSON.stringify(args)}`);
    const result = originalMethod.apply(this, args);
    console.log(`Result: ${JSON.stringify(result)}`);
    return result;
  };
  
  return descriptor;
}

class Calculator {
  @log
  add(a: number, b: number): number {
    return a + b;
  }
}

// 属性装饰器
function format(target: any, propertyKey: string) {
  let value: string;
  
  const getter = () => `[${value}]`;
  const setter = (newValue: string) => {
    value = newValue.toUpperCase();
  };
  
  Object.defineProperty(target, propertyKey, {
    get: getter,
    set: setter,
    enumerable: true,
    configurable: true
  });
}

class Person {
  @format
  name: string;
  
  constructor(name: string) {
    this.name = name;
  }
}
```

## 高级模块技巧
### 模块扩展
扩展已存在的模块：

```typescript
// 扩展内置类型
declare global {
  interface Array<T> {
    sum(): T extends number ? number : never;
  }
}

Array.prototype.sum = function() {
  return this.reduce((acc, curr) => acc + curr, 0);
};

[1, 2, 3].sum(); // 6

// 扩展第三方模块
declare module 'some-module' {
  export interface SomeInterface {
    newProperty: string;
  }
  
  export function newFunction(): void;
}
```

### 动态导入
使用 `import()` 语法进行动态导入：

```typescript
// 动态导入模块
async function loadModule() {
  if (condition) {
    const module = await import('./module-a');
    module.doSomething();
  } else {
    const module = await import('./module-b');
    module.doSomethingElse();
  }
}

// 导入类型
type User = (await import('./user')).User;
```

## 声明文件（Declaration Files）
声明文件（`.d.ts`）用于为已存在的 JavaScript 代码提供类型信息：

```typescript
// 声明全局变量
declare const VERSION: string;

// 声明全局函数
declare function greet(name: string): string;

// 声明命名空间
declare namespace MyLib {
  interface Options {
    timeout: number;
  }
  
  function init(options: Options): void;
  const version: string;
}

// 为模块声明类型
declare module 'my-plugin' {
  export function install(): void;
  export const name: string;
}
```

## 高级配置
### 严格模式
在 `tsconfig.json` 中启用严格模式可以获得更严格的类型检查：

```json
{
  "compilerOptions": {
    "strict": true, // 启用所有严格类型检查选项
    
    // 严格模式包含的选项
    "noImplicitAny": true,         // 不允许隐式的 any 类型
    "strictNullChecks": true,      // 严格的 null 检查
    "strictFunctionTypes": true,   // 严格的函数类型检查
    "strictBindCallApply": true,   // 严格检查 bind、call、apply
    "strictPropertyInitialization": true, // 严格检查类属性初始化
    "noImplicitThis": true,        // 不允许隐式的 this
    "alwaysStrict": true           // 在代码中注入 "use strict"
  }
}
```

### 路径映射
配置模块路径映射，简化导入：

```json
{
  "compilerOptions": {
    "baseUrl": ".",
    "paths": {
      "@components/*": ["src/components/*"],
      "@utils/*": ["src/utils/*"],
      "@types/*": ["src/types/*"]
    }
  }
}
```

使用映射后的路径：

```typescript
import { Button } from '@components/Button';
import { formatDate } from '@utils/date';
```

## 实用工具类型
TypeScript 提供了许多内置的实用工具类型：

```typescript
// Partial<T> - 将所有属性变为可选
interface Todo {
  title: string;
  description: string;
}

type PartialTodo = Partial<Todo>;

// Required<T> - 将所有属性变为必选
type RequiredTodo = Required<PartialTodo>;

// Readonly<T> - 将所有属性变为只读
type ReadonlyTodo = Readonly<Todo>;

// Record<K, T> - 创建一个具有 K 类型键和 T 类型值的类型
type PageInfo = {
  title: string;
};

type Page = 'home' | 'about' | 'contact';

const pages: Record<Page, PageInfo> = {
  home: { title: 'Home' },
  about: { title: 'About' },
  contact: { title: 'Contact' }
};

// Pick<T, K> - 从 T 中选择指定的属性 K
type TodoTitle = Pick<Todo, 'title'>;

// Omit<T, K> - 从 T 中排除指定的属性 K
type TodoWithoutDescription = Omit<Todo, 'description'>;

// Exclude<T, U> - 从 T 中排除可以赋值给 U 的类型
type T0 = Exclude<'a' | 'b' | 'c', 'a'>; // 'b' | 'c'

// Extract<T, U> - 从 T 中提取可以赋值给 U 的类型
type T1 = Extract<'a' | 'b' | 'c', 'a' | 'f'>; // 'a'

// ReturnType<T> - 获取函数返回值的类型
type T2 = ReturnType<() => string>; // string
```

## 总结
TypeScript 的高级特性极大地增强了代码的类型安全性和可维护性。通过掌握类型别名、高级类型、泛型高级应用、映射类型、装饰器等特性，你可以编写出更健壮、更具表现力的代码。

这些高级特性特别适合在大型应用程序中使用，它们可以帮助团队更好地协作，并在开发早期捕获潜在的错误。

要深入了解 TypeScript 高级特性，建议查阅 [TypeScript 官方文档](https://www.typescriptlang.org/docs/) 并在实际项目中进行实践。

