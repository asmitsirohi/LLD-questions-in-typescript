// Abstract Factory Method: Provides an interface for creating families of related objects without specifying there concreate classes.

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

abstract class GarlicBread {
  prepare() {}
}

class BasicGarlicBread implements GarlicBread {
  prepare(): void {
    console.log("Preparing Simple Garlic Bread");
  }
}

class BasicWheatGarlicBread implements GarlicBread {
  prepare(): void {
    console.log("Preparing Simple Wheat Garlic Bread");
  }
}

abstract class MealFactory {
  createFactory(type: string) {}
}

class SinghFactory extends MealFactory {
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

  createGarlicBread(type: string) {
    switch (type) {
      case "basic":
        return new BasicGarlicBread();
      default:
        console.log("Invalid Burger Type");
        return null;
    }
  }
}

class KingBurger extends MealFactory {
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

  createGarlicBread(type: string) {
    switch (type) {
      case "basic":
        return new BasicWheatGarlicBread();
      default:
        console.log("Invalid Burger Type");
        return null;
    }
  }
}

const type = "premium";
const type1 = "basic";

const burgerFactory1 = new SinghFactory();
const burger1 = burgerFactory1.createBurger(type);
const garlic1 = burgerFactory1.createGarlicBread(type1);

const burgerFactory2 = new KingBurger();
const burger2 = burgerFactory2.createBurger(type);
const garlic2 = burgerFactory2.createGarlicBread(type1);

burger1?.prepare();
garlic1?.prepare();

burger2?.prepare();
garlic2?.prepare();
