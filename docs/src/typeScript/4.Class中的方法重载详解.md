## 什么是方法重载？
方法重载（Method Overloading）是指在同一个类中，可以定义多个同名方法，但这些方法的参数类型、参数数量或参数顺序不同。当调用该方法时，TypeScript 会根据传入的参数自动选择合适的方法执行。

方法重载是静态类型语言的重要特性，它可以让我们的代码更加灵活和直观，同时保持类型安全。

## TypeScript 类中方法重载的基本语法
在 TypeScript 中，方法重载需要先定义"重载签名"，然后再定义"实现签名"：

```typescript
class MyClass {
  // 重载签名1
  methodName(param1: type1): returnType1;
  
  // 重载签名2
  methodName(param1: type2, param2: type2): returnType2;
  
  // 实现签名
  methodName(param1: type1 | type2, param2?: type2): returnType1 | returnType2 {
    // 方法实现
  }
}
```

+ 重载签名：只定义方法名、参数类型和返回类型，没有方法体
+ 实现签名：包含完整的方法定义，包括参数、返回类型和方法体
+ 实现签名的参数类型必须兼容所有重载签名

## 类中方法重载的实例
### 1. 基本示例：不同参数数量
```typescript
class Calculator {
  // 重载签名1：接收两个数字参数
  add(a: number, b: number): number;
  
  // 重载签名2：接收三个数字参数
  add(a: number, b: number, c: number): number;
  
  // 实现签名
  add(a: number, b: number, c?: number): number {
    if (c !== undefined) {
      return a + b + c;
    }
    return a + b;
  }
}

const calc = new Calculator();
console.log(calc.add(1, 2));      // 3，匹配第一个重载
console.log(calc.add(1, 2, 3));   // 6，匹配第二个重载
```

### 2. 不同参数类型
```typescript
class StringProcessor {
  // 重载签名1：处理字符串
  process(input: string): string;
  
  // 重载签名2：处理字符串数组
  process(input: string[]): string;
  
  // 实现签名
  process(input: string | string[]): string {
    if (typeof input === 'string') {
      return input.toUpperCase();
    } else {
      return input.join(' ');
    }
  }
}

const processor = new StringProcessor();
console.log(processor.process("hello"));          // "HELLO"
console.log(processor.process(["hello", "world"])); // "hello world"
```

### 3. 不同返回类型
```typescript
class DataConverter {
  // 重载签名1：返回数字
  convert(value: string): number;
  
  // 重载签名2：返回字符串
  convert(value: number): string;
  
  // 实现签名
  convert(value: string | number): string | number {
    if (typeof value === 'string') {
      return parseInt(value, 10);
    } else {
      return value.toString();
    }
  }
}

const converter = new DataConverter();
const num: number = converter.convert("123");   // 正确
const str: string = converter.convert(123);     // 正确
```

## 构造函数重载
类的构造函数也支持重载，这在创建具有多种初始化方式的类时非常有用：

```typescript
class User {
  name: string;
  age: number;
  
  // 重载签名1：使用姓名和年龄初始化
  constructor(name: string, age: number);
  
  // 重载签名2：使用包含姓名和年龄的对象初始化
  constructor(user: { name: string; age: number });
  
  // 实现签名
  constructor(nameOrUser: string | { name: string; age: number }, age?: number) {
    if (typeof nameOrUser === 'string' && age !== undefined) {
      this.name = nameOrUser;
      this.age = age;
    } else if (typeof nameOrUser === 'object') {
      this.name = nameOrUser.name;
      this.age = nameOrUser.age;
    } else {
      throw new Error('Invalid arguments');
    }
  }
}

// 两种创建实例的方式都有效
const user1 = new User("Alice", 30);
const user2 = new User({ name: "Bob", age: 25 });
```

## 方法重载的注意事项
1. **实现签名必须兼容所有重载签名**  
实现签名的参数类型必须是所有重载签名参数类型的联合类型
2. **重载签名的顺序很重要**  
TypeScript 会按照重载签名的定义顺序进行匹配，所以更具体的签名应该放在前面

```typescript
class Example {
  // 更具体的签名应该放在前面
  doSomething(x: number): number;
  // 更通用的签名放在后面
  doSomething(x: any): any;
  
  doSomething(x: any): any {
    return x;
  }
}
```

3. **返回类型必须明确**  
不同的重载签名可以有不同的返回类型，但实现签名需要兼容所有可能的返回类型
4. **可选参数和剩余参数**  
可以在重载中使用可选参数(?)和剩余参数(...)，但实现签名需要正确处理它们

## 总结
方法重载是 TypeScript 中一个强大的特性，尤其在类中使用时，可以：

+ 提供更灵活的 API 设计
+ 保持类型安全
+ 使代码意图更清晰
+ 支持多种使用场景

掌握方法重载可以帮助你编写更健壮、更易用的 TypeScript 类库和应用程序。记住，良好的重载设计应该让用户能够自然地使用你的 API，而不必记住太多细节。

