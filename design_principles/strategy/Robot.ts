// Strategy Design Pattern: Degines a family of algorithm, put them into separate classes so that they can be changed at run time.

abstract class Talkable {
  talk() {}
}

class NormalTalk implements Talkable {
  talk(): void {
    console.log("Talking Normally...");
  }
}

class NoTalk implements Talkable {
  talk(): void {
    console.log("No talking...");
  }
}

abstract class Walkable {
  walk() {}
}

class NormalWalk implements Walkable {
  walk(): void {
    console.log("Walking Normally...");
  }
}

class NoWalk implements Walkable {
  walk(): void {
    console.log("No Walking...");
  }
}

class Robot {
  talk: Talkable;
  walk: Walkable;

  constructor(talk: Talkable, walk: Walkable) {
    this.talk = talk;
    this.walk = walk;
  }

  talking() {
    this.talk.talk();
  }

  walking() {
    this.walk.walk();
  }

  projection() {
    console.log("Robot Projection...");
  }
}

const robot1 = new Robot(new NoTalk(), new NoWalk());
const robot2 = new Robot(new NormalTalk(), new NormalWalk());

robot1.talking();
robot1.walking();
robot1.projection();

robot2.talking();
robot2.walking();
robot2.projection();
