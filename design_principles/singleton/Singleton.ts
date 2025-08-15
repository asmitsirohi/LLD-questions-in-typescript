// Singleton: Only one object of a class is allowed to be created.

class Singleton {
  private static instance: Singleton;

  private constructor() {
    console.log("Object created...");
  }

  static getInstance() {
    if (!this.instance) {
      this.instance = new Singleton();
    }

    return this.instance;
  }
}

const obj1 = Singleton.getInstance();
const obj2 = Singleton.getInstance();

console.log(obj1 === obj2);
