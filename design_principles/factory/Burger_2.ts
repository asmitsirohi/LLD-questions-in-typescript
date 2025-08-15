// Factory Method: Defines an interface for creating objects but allows subclasses to decide  which class to instantiate.

abstract class Burger {
  prepare() {}
}

class BasicBurger implements Burger {
  prepare(): void {
    console.log("Preparing Simple Burger");
  }
}

class StandardBurger implements Burger {
  prepare(): void {
    console.log("Preparing Standard Burger");
  }
}
class PremiumBurger implements Burger {
  prepare(): void {
    console.log("Preparing Premium Burger");
  }
}

class BasicWheatBurger implements Burger {
  prepare(): void {
    console.log("Preparing Simple Wheat Burger");
  }
}

class StandardWheatBurger implements Burger {
  prepare(): void {
    console.log("Preparing Standard Wheat Burger");
  }
}
class PremiumWheatBurger implements Burger {
  prepare(): void {
    console.log("Preparing Premium Wheat Burger");
  }
}

abstract class BurgerFactory {
  createFactory(type: string) {}
}

class SinghFactory extends BurgerFactory {
  createBurger(type: string) {
    switch (type) {
      case "basic":
        return new BasicBurger();
      case "standard":
        return new StandardBurger();
      case "premium":
        return new PremiumBurger();
      default:
        console.log("Invalid Burger Type");
        return null;
    }
  }
}

class KingBurger extends BurgerFactory {
  createBurger(type: string) {
    switch (type) {
      case "basic":
        return new BasicWheatBurger();
      case "standard":
        return new StandardWheatBurger();
      case "premium":
        return new PremiumWheatBurger();
      default:
        console.log("Invalid Burger Type");
        return null;
    }
  }
}

const type = "premium";

const burgerFactory1 = new SinghFactory();
const burger1 = burgerFactory1.createBurger(type);

const burgerFactory2 = new KingBurger();
const burger2 = burgerFactory2.createBurger(type);

burger1?.prepare();
burger2?.prepare();
