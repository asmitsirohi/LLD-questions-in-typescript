/**
 * Interview Prompt
Design a simplified Uber backend system in Node.js + TypeScript to manage rides.

    The system should support:
        Registering passengers and drivers.
        Requesting a ride by a passenger.
        Assigning the nearest available driver.
        Completing a ride and calculating fare.

    Assume:
        Distance between two locations is given.
        Fare is ₹10 per km.
        Ignore actual maps/geo APIs — just use numbers for locations.
        No need for database integration (store in memory).
 */

enum DriverStatus {
  AVAILABLE,
  ON_TRIP,
}

class Locationn {
  constructor(public x: number, public y: number) {}

  distanceTo(other: Locationn) {
    return Math.sqrt(
      Math.pow(this.x - other.x, 2) + Math.pow(this.y - other.y, 2)
    );
  }
}

class Driver {
  constructor(
    public id: number,
    public name: string,
    public location: Locationn,
    public status: DriverStatus = DriverStatus.AVAILABLE
  ) {}
}

class Passenger {
  constructor(
    public id: number,
    public name: string,
    public location: Locationn
  ) {}
}

class Ride {
  passenger: Passenger;
  driver: Driver;
  startLocation: Locationn;
  endLocation: Locationn;
  fare: number;

  constructor(
    passenger: Passenger,
    driver: Driver,
    startLocation: Locationn,
    endLocation: Locationn,
    fare: number
  ) {
    this.passenger = passenger;
    this.driver = driver;
    this.startLocation = startLocation;
    this.endLocation = endLocation;
    this.fare = fare;
  }
}

class Uber {
  passengers: Passenger[];
  drivers: Driver[];
  rides: Ride[];

  constructor() {
    this.passengers = [];
    this.drivers = [];
    this.rides = [];
  }

  registerDriver(driver: Driver) {
    this.drivers.push(driver);
  }

  registerPassenger(passenger: Passenger) {
    this.passengers.push(passenger);
  }

  requestRide(passengerId: number, destination: Locationn) {
    const passenger = this.passengers.find((pass) => pass.id === passengerId);

    if (!passenger) {
      console.log("Passenger not found!");
      return;
    }

    let nearestDriver: Driver | null = null;
    let minDistance = Infinity;

    for (let driver of this.drivers) {
      if (driver.status === DriverStatus.AVAILABLE) {
        const distance = passenger.location.distanceTo(driver.location);

        if (distance < minDistance) {
          minDistance = distance;
          nearestDriver = driver;
        }
      }
    }

    if (!nearestDriver) {
      console.log("No available drivers!");
      return;
    }

    nearestDriver.status = DriverStatus.ON_TRIP;
    const tripDistance = passenger.location.distanceTo(destination);
    const fare = tripDistance * 10;

    const ride = new Ride(
      passenger,
      nearestDriver,
      passenger.location,
      destination,
      fare
    );

    this.rides.push(ride);

    console.log(
      `Driver ${nearestDriver.name} assigned to ${passenger.name}, Fare: ₹${fare}`
    );
    return ride;
  }

  completeRide(driverId: number) {
    const driver = this.drivers.find((driver) => driver.id === driverId);

    if (!driver) {
      console.log("Driver not found");
      return;
    }

    driver.status = DriverStatus.AVAILABLE;
    console.log(`Driver ${driver.name} is now available`);
  }
}

const uber = new Uber();
uber.registerDriver(new Driver(1, "Raj", new Locationn(0, 0)));
uber.registerDriver(new Driver(2, "Simran", new Locationn(0, 0)));

uber.registerPassenger(new Passenger(1, "Amit", new Locationn(1, 2)));

const ride = uber.requestRide(1, new Locationn(10, 10));
if (ride) {
  console.log(`Ride started: Fare ₹${ride.fare}`);
  uber.completeRide(ride.driver.id);
}
