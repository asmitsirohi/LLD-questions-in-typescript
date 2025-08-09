/**
 * Design a Parking Lot system that supports multiple levels, different types of parking spots (compact, large, handicapped), and calculates parking fees based on duration.
 * Approach in LLD
  We’ll:
  1) Model entities as classes (ParkingLot, Level, ParkingSpot, Vehicle, Ticket).
  2) Use OOP principles in JavaScript/TypeScript style.
  3) Store data in-memory using Maps/arrays instead of a DB.
  4) Keep the design extensible (e.g., adding more spot types later).
 */

enum SpotType {
  COMPACT = "COMPACT",
  LARGE = "LARGE",
  HANDICAPPED = "HANDICAPPED",
}

abstract class Vehicle {
  licencePlate: string;

  constructor(licencePlate: string) {
    this.licencePlate = licencePlate;
  }
}

class Car extends Vehicle {}
class Truck extends Vehicle {}
class Bike extends Vehicle {}

class ParkingSpot {
  id: number;
  type: string;
  vehicle: Vehicle | null;

  constructor(id: number, type: string) {
    this.id = id;
    this.type = type;
    this.vehicle = null;
  }

  isAvailable() {
    return this.vehicle === null;
  }

  park(vehicle: Vehicle) {
    if (!this.isAvailable()) throw new Error("Spot already occupied");

    this.vehicle = vehicle;
  }

  unpark() {
    const currVehicle = this.vehicle;
    this.vehicle = null;
    return currVehicle;
  }
}

class Level {
  levelNumber: number;
  spots: ParkingSpot[];

  constructor(levelNumber: number, spots: ParkingSpot[]) {
    this.levelNumber = levelNumber;
    this.spots = spots; // array of parking spots
  }

  findAvailableSpot(type: SpotType) {
    return this.spots.find((spot) => spot.type === type && spot.isAvailable());
  }
}

interface Ticket {
  vehicle: Vehicle;
  spot: ParkingSpot;
  startTime: Date;
}

class ParkingLot {
  levels: Level[];
  activeTickets: Map<string, Ticket>;

  constructor() {
    this.levels = [];
    this.activeTickets = new Map(); // ticketId => {vehicle, spot, startTimes}
  }

  addLevel(level: Level) {
    this.levels.push(level);
  }

  parkVehicle(vehicle: Vehicle, type: SpotType) {
    for (let level of this.levels) {
      const spot = level.findAvailableSpot(type);
      if (spot) {
        const ticketId = String(new Date());
        this.activeTickets.set(ticketId, {
          vehicle,
          spot,
          startTime: new Date(),
        });

        return ticketId;
      }
    }

    throw new Error("No available spot");
  }

  unparkVehicle(ticketId: string) {
    const ticket = this.activeTickets.get(ticketId);
    if (!ticket) throw new Error("Invalid Ticket");

    ticket.spot.unpark();
    const durationInHrs = Math.ceil(
      (new Date().getTime() - ticket.startTime.getTime()) / (1000 * 60 * 60)
    );
    const fee = durationInHrs * 10;

    this.activeTickets.delete(ticketId);

    return { vehicle: ticket.vehicle, fee };
  }
}

const lot = new ParkingLot();

lot.addLevel(
  new Level(1, [
    new ParkingSpot(1, SpotType.COMPACT),
    new ParkingSpot(2, SpotType.LARGE),
    new ParkingSpot(3, SpotType.HANDICAPPED),
  ])
);

const myCar = new Car("UP11AB0603");
const ticket = lot.parkVehicle(myCar, SpotType.COMPACT);

console.log("ticket", ticket);
