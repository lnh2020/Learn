在 TypeScript 中，类（Class）是实现面向对象编程的核心，结合设计模式可以构建出灵活、可维护的代码。以下是几种常用的设计模式及其在 TypeScript 中的实现示例。

## 1. 单例模式（Singleton）
**核心思想**：确保一个类只有一个实例，并提供全局访问点。

**使用场景**：日志服务、配置管理、数据库连接池等需要唯一实例的场景。

```typescript
class Logger {
  private static instance: Logger;
  
  // 私有构造函数防止外部实例化
  private constructor() {}
  
  // 全局访问点
  public static getInstance(): Logger {
    if (!Logger.instance) {
      Logger.instance = new Logger();
    }
    return Logger.instance;
  }
  
  public log(message: string): void {
    const date = new Date().toISOString();
    console.log(`[${date}] ${message}`);
  }
}

// 使用
const logger1 = Logger.getInstance();
const logger2 = Logger.getInstance();

console.log(logger1 === logger2); // true（同一实例）
logger1.log("应用启动");
```

## 2. 工厂模式（Factory）
**核心思想**：通过工厂类或工厂方法创建对象，隐藏对象创建的细节。

**使用场景**：对象创建复杂、需要根据条件创建不同类型对象的场景。

```typescript
// 产品接口
interface Shape {
  draw(): void;
}

// 具体产品
class Circle implements Shape {
  draw(): void {
    console.log("绘制圆形");
  }
}

class Square implements Shape {
  draw(): void {
    console.log("绘制正方形");
  }
}

// 工厂类
class ShapeFactory {
  // 根据类型创建不同对象
  createShape(type: string): Shape {
    switch (type.toLowerCase()) {
      case "circle":
        return new Circle();
      case "square":
        return new Square();
      default:
        throw new Error("未知的形状类型");
    }
  }
}

// 使用
const factory = new ShapeFactory();
const circle = factory.createShape("circle");
const square = factory.createShape("square");

circle.draw();  // 绘制圆形
square.draw();  // 绘制正方形
```

## 3. 装饰器模式（Decorator）
**核心思想**：动态地为对象添加新功能，而不改变其原始结构。

**使用场景**：日志记录、性能监控、权限验证等需要扩展类功能的场景。

```typescript
// 基础类
class DataService {
  fetchData(id: number): string {
    return `数据 ${id}`;
  }
}

// 装饰器类
class LoggingDataService extends DataService {
  constructor(private dataService: DataService) {
    super();
  }
  
  fetchData(id: number): string {
    console.log(`开始获取数据: ${id}`);
    const result = this.dataService.fetchData(id);
    console.log(`完成获取数据: ${id}`);
    return result;
  }
}

// 使用
const dataService = new DataService();
// 装饰基础服务，添加日志功能
const loggingService = new LoggingDataService(dataService);

loggingService.fetchData(123);
// 输出:
// 开始获取数据: 123
// 完成获取数据: 123
```

## 4. 观察者模式（Observer）
**核心思想**：定义对象间的一对多依赖关系，当一个对象状态改变时，所有依赖它的对象都会收到通知。

**使用场景**：事件处理、状态管理、UI 组件更新等场景。

```typescript
// 观察者接口
interface Observer {
  update(data: any): void;
}

// 主题接口
interface Subject {
  attach(observer: Observer): void;
  detach(observer: Observer): void;
  notify(): void;
}

// 具体主题
class NewsFeed implements Subject {
  private observers: Observer[] = [];
  private news: string = "";
  
  attach(observer: Observer): void {
    this.observers.push(observer);
  }
  
  detach(observer: Observer): void {
    this.observers = this.observers.filter(obs => obs !== observer);
  }
  
  notify(): void {
    this.observers.forEach(observer => observer.update(this.news));
  }
  
  // 更新新闻并通知观察者
  setNews(news: string): void {
    this.news = news;
    this.notify();
  }
}

// 具体观察者
class MobileClient implements Observer {
  update(data: any): void {
    console.log(`移动端收到新闻: ${data}`);
  }
}

class WebClient implements Observer {
  update(data: any): void {
    console.log(`网页端收到新闻: ${data}`);
  }
}

// 使用
const newsFeed = new NewsFeed();
const mobileClient = new MobileClient();
const webClient = new WebClient();

newsFeed.attach(mobileClient);
newsFeed.attach(webClient);

newsFeed.setNews("TypeScript 发布新版本");
// 输出:
// 移动端收到新闻: TypeScript 发布新版本
// 网页端收到新闻: TypeScript 发布新版本
```

## 5. 策略模式（Strategy）
**核心思想**：定义一系列算法，将每个算法封装起来，并使它们可以相互替换。

**使用场景**：多种相似的算法选择、动态切换不同的业务规则。

```typescript
// 策略接口
interface PaymentStrategy {
  pay(amount: number): void;
}

// 具体策略
class CreditCardPayment implements PaymentStrategy {
  constructor(private cardNumber: string) {}
  
  pay(amount: number): void {
    console.log(`用信用卡 ${this.cardNumber} 支付了 ${amount} 元`);
  }
}

class AlipayPayment implements PaymentStrategy {
  constructor(private account: string) {}
  
  pay(amount: number): void {
    console.log(`用支付宝 ${this.account} 支付了 ${amount} 元`);
  }
}

// 上下文
class ShoppingCart {
  private paymentStrategy: PaymentStrategy;
  
  setPaymentStrategy(strategy: PaymentStrategy): void {
    this.paymentStrategy = strategy;
  }
  
  checkout(amount: number): void {
    this.paymentStrategy.pay(amount);
  }
}

// 使用
const cart = new ShoppingCart();

// 使用信用卡支付
cart.setPaymentStrategy(new CreditCardPayment("4111-1111-1111-1111"));
cart.checkout(100);  // 用信用卡 4111-1111-1111-1111 支付了 100 元

// 切换为支付宝支付
cart.setPaymentStrategy(new AlipayPayment("user@example.com"));
cart.checkout(200);  // 用支付宝 user@example.com 支付了 200 元
```

## 6. 建造者模式（Builder）
**核心思想**：将复杂对象的构建过程与表示分离，使得同样的构建过程可以创建不同的表示。

**使用场景**：创建复杂对象（如配置对象、文档对象）时，需要分步构建。

```typescript
// 产品
class Computer {
  constructor(
    public cpu: string,
    public ram: string,
    public storage: string,
    public gpu?: string  // 可选组件
  ) {}
}

// 建造者接口
interface ComputerBuilder {
  setCPU(cpu: string): this;
  setRAM(ram: string): this;
  setStorage(storage: string): this;
  setGPU(gpu: string): this;
  build(): Computer;
}

// 具体建造者
class ConcreteComputerBuilder implements ComputerBuilder {
  private cpu!: string;
  private ram!: string;
  private storage!: string;
  private gpu?: string;
  
  setCPU(cpu: string): this {
    this.cpu = cpu;
    return this;
  }
  
  setRAM(ram: string): this {
    this.ram = ram;
    return this;
  }
  
  setStorage(storage: string): this {
    this.storage = storage;
    return this;
  }
  
  setGPU(gpu: string): this {
    this.gpu = gpu;
    return this;
  }
  
  build(): Computer {
    return new Computer(this.cpu, this.ram, this.storage, this.gpu);
  }
}

// 使用
const builder = new ConcreteComputerBuilder();
const gamingPC = builder
  .setCPU("Intel i9")
  .setRAM("32GB")
  .setStorage("1TB SSD")
  .setGPU("NVIDIA RTX 4090")
  .build();

console.log(gamingPC);
```

## 设计模式选择建议
+ **单例模式**：当需要全局唯一实例时使用
+ **工厂模式**：当对象创建逻辑复杂或需要根据条件创建不同对象时使用
+ **装饰器模式**：当需要动态扩展类功能而不修改原始类时使用
+ **观察者模式**：当需要实现事件通知或状态同步时使用
+ **策略模式**：当需要在运行时切换算法或行为时使用
+ **建造者模式**：当需要构建复杂对象并希望分步控制构建过程时使用

在 TypeScript 中使用设计模式时，可以充分利用其类型系统，为模式中的各个角色定义接口或类型，使代码更加健壮和可维护。选择合适的设计模式可以显著提高代码的复用性和扩展性。

