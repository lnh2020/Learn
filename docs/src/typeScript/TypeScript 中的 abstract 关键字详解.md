## 什么是 abstract？
`abstract` 是 TypeScript 中的一个关键字，用于定义抽象类和抽象方法。抽象类是一种不能被直接实例化的类，主要用于作为其他类的基类（父类），并定义子类必须实现的方法。

## 抽象类的特点
1. 不能直接实例化
2. 可以包含抽象方法和具体方法
3. 抽象方法没有具体实现，必须在子类中实现
4. 可以包含成员变量
5. 可以继承其他类（包括抽象类）
6. 可以实现接口

## 基本语法
### 定义抽象类
```typescript
abstract class 类名 {
  // 类成员
}
```

### 定义抽象方法
```typescript
abstract class 类名 {
  abstract 方法名(参数列表): 返回值类型;
}
```

## 使用示例
### 1. 基础抽象类示例
```typescript
// 定义抽象类 Animal
abstract class Animal {
  // 普通成员变量
  name: string;
  
  // 构造函数
  constructor(name: string) {
    this.name = name;
  }
  
  // 具体方法
  eat(): void {
    console.log(`${this.name} is eating.`);
  }
  
  // 抽象方法 - 没有具体实现
  abstract makeSound(): void;
}

// 继承抽象类并实现抽象方法
class Dog extends Animal {
  // 必须实现抽象方法 makeSound
  makeSound(): void {
    console.log(`${this.name} barks: Woof! Woof!`);
  }
}

class Cat extends Animal {
  // 必须实现抽象方法 makeSound
  makeSound(): void {
    console.log(`${this.name} meows: Meow! Meow!`);
  }
}

// 不能直接实例化抽象类
// const animal = new Animal("Animal"); // 错误

// 实例化子类
const dog = new Dog("Buddy");
dog.eat(); // 输出: Buddy is eating.
dog.makeSound(); // 输出: Buddy barks: Woof! Woof!

const cat = new Cat("Whiskers");
cat.eat(); // 输出: Whiskers is eating.
cat.makeSound(); // 输出: Whiskers meows: Meow! Meow!
```

### 2. 抽象类与接口结合
```typescript
// 定义接口
interface Flyable {
  fly(): void;
}

// 抽象类实现接口
abstract class Bird extends Animal implements Flyable {
  // 实现接口方法，但可以声明为抽象方法，让子类提供具体实现
  abstract fly(): void;
  
  // 新增抽象方法
  abstract buildNest(): void;
}

class Eagle extends Bird {
  makeSound(): void {
    console.log(`${this.name} screeches: Screech!`);
  }
  
  fly(): void {
    console.log(`${this.name} soars high in the sky.`);
  }
  
  buildNest(): void {
    console.log(`${this.name} builds a large nest on a cliff.`);
  }
}

const eagle = new Eagle("Aquila");
eagle.eat(); // 输出: Aquila is eating.
eagle.makeSound(); // 输出: Aquila screeches: Screech!
eagle.fly(); // 输出: Aquila soars high in the sky.
eagle.buildNest(); // 输出: Aquila builds a large nest on a cliff.
```

### 3. 抽象类中的访问修饰符
```typescript
abstract class Vehicle {
  protected abstract wheels: number;
  
  abstract start(): void;
  
  stop(): void {
    console.log("Vehicle stopped.");
  }
  
  getWheelCount(): number {
    return this.wheels;
  }
}

class Car extends Vehicle {
  protected wheels: number = 4;
  
  start(): void {
    console.log("Car started with a key.");
  }
}

class Bicycle extends Vehicle {
  protected wheels: number = 2;
  
  start(): void {
    console.log("Bicycle started by pedaling.");
  }
}

const car = new Car();
car.start(); // 输出: Car started with a key.
console.log(`Car has ${car.getWheelCount()} wheels.`); // 输出: Car has 4 wheels.

const bike = new Bicycle();
bike.start(); // 输出: Bicycle started by pedaling.
console.log(`Bicycle has ${bike.getWheelCount()} wheels.`); // 输出: Bicycle has 2 wheels.
```

## 抽象类 vs 接口
| 特性 | 抽象类 | 接口 |
| --- | --- | --- |
| 实例化 | 不能 | 不能 |
| 方法实现 | 可以有具体实现 | 不能有具体实现（TypeScript 1.8+ 允许默认实现） |
| 成员变量 | 可以有 | 可以有，但默认为 public static final |
| 继承 | 只能继承一个抽象类 | 可以实现多个接口 |
| 访问修饰符 | 可以使用各种访问修饰符 | 成员默认为 public |


## 何时使用 abstract？
1. 当你需要创建一个基类，但其本身不应该被实例化时
2. 当你希望在基类中定义一些通用方法，同时强制子类实现特定方法时
3. 当你需要在基类中维护状态（成员变量）时
4. 当你想要建立一个类层次结构，其中父类提供部分实现，子类提供具体实现时

## 注意事项
1. 抽象类不能被实例化
2. 任何继承抽象类的子类必须实现所有抽象方法，否则子类也必须声明为抽象类
3. 抽象方法不能有方法体
4. 抽象类可以包含非抽象方法和成员变量
5. 抽象类可以继承其他类，也可以实现接口

通过使用 `abstract` 关键字，你可以创建更具结构性和可维护性的类层次结构，确保子类遵循特定的接口，同时提供共享的功能实现。

