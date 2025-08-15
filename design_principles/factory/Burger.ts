// Simple Factory: A factory class that decides which concreate class to instantiate.

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

class BurgerFactory {
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

const type = "dd";

const burgerFactory = new BurgerFactory();

const burger = burgerFactory.createBurger(type);

burger?.prepare();
