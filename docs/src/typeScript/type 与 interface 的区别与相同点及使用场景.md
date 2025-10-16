## 相同点
1. **都可以定义对象类型**

```typescript
// interface
interface User {
  name: string;
  age: number;
}

// type
type User = {
  name: string;
  age: number;
};
```

2. **都可以扩展**

```typescript
// interface 扩展
interface Person {
  name: string;
}
interface Student extends Person {
  studentId: number;
}

// type 扩展
type Person = {
  name: string;
};
type Student = Person & {
  studentId: number;
};
```

3. **都可以用于类实现**

```typescript
interface Person {
  name: string;
  sayHello: () => void;
}

type Animal = {
  name: string;
  bark: () => void;
};

class Dog implements Animal {
  name: string;
  constructor(name: string) {
    this.name = name;
  }
  bark() {
    console.log("Woof!");
  }
}
```

## 区别
| 特性 | type | interface |
| --- | --- | --- |
| **声明合并** | 不支持 | 支持 |
| **扩展方式** | 使用交叉类型 `&` | 使用 `extends` 关键字 |
| **可以定义的类型** | 可以定义基本类型、联合类型、交叉类型等 | 只能定义对象类型和函数类型 |
| **计算属性** | 支持 | 不支持 |
| **映射类型** | 通常使用 type 创建映射类型 | 不支持 |


1. **声明合并**

```typescript
// interface 支持声明合并
interface Person {
  name: string;
}

interface Person {
  age: number;
}

// 合并后 Person 包含 name 和 age 属性

// type 不支持声明合并
type Person = {
  name: string;
};

type Person = {  // 错误：标识符“Person”重复
  age: number;
};
```

2. **类型范围**

```typescript
// type 可以定义基本类型别名
type Name = string;

// type 可以定义联合类型
type Status = "pending" | "success" | "error";

// type 可以定义元组类型
type Point = [number, number];

// interface 无法做到以上这些
```

3. **计算属性**

```typescript
type Keys = "firstName" | "lastName";

// type 支持计算属性
type Name = {
  [K in Keys]: string;
};

// interface 不支持计算属性
```

## 使用场景
### 优先使用 interface 的场景
1. **定义对象的形状**，特别是需要被多个地方复用的对象类型
2. **需要声明合并**的情况，如扩展第三方库的类型定义
3. **定义类的接口**，明确类应该实现的方法和属性
4. **API 接口定义**，使接口更具可扩展性

### 优先使用 type 的场景
1. **定义基本类型的别名**，如 `type Age = number`
2. **定义联合类型**，如 `type Result = Success | Error`
3. **定义交叉类型**，组合多个类型
4. **定义元组类型**
5. **定义映射类型**
6. **需要使用计算属性**的情况
7. **定义函数类型**，特别是复杂的函数类型

### 总结建议
+ 当定义公共 API 或需要被多个组件共享的对象类型时，优先使用 `interface`
+ 当需要处理联合类型、交叉类型、基本类型别名等场景时，使用 `type`
+ 保持团队内部的一致性，遵循项目已有的代码风格

