class Observable {
  constructor() {
    this.observers = [];
  }

  subscribe(notifyingClass) {
    this.observers.push(notifyingClass);
  }

  unsubcribe(notifyingClass) {
    this.observers = this.observers.filter(
      (observer) => observer instanceof notifyingClass !== true
    );
  }

  notifyObservable(notification) {
    this.observers.forEach((observer) => {
      observer.notify(notification);
    });
  }
}

class Jankenpon extends Observable {
  constructor() {
    super();
    this.states = ["piedra", "papel", "tijera"];
    this.res = "";
    this.dataUser = "";
  }

  action(element) {
    this.dataUser = element;
    const index = this.getRandomArbitrary(0, 2);
    this.res = this.states[index];
    this.notifyObservable(this);
  }

  getRandomArbitrary(min, max) {
    return Math.round(Math.random() * (max - min) + min);
  }
}

class JankenponSpanish {
  notify(notification) {
    console.log(`Yo saco: ${ notification.dataUser }`);
    console.log(`El pc saca: ${ notification.res }`);
    if (notification.dataUser === "piedra" && notification.res === "papel")
      console.log("El pc gana");
    if (notification.dataUser === "papel" && notification.res === "piedra")
      console.log("Yo gano");
    if (notification.dataUser === "papel" && notification.res === "tijera")
      console.log("El pc gana");
    if (notification.dataUser === "tijera" && notification.res === "papel")
      console.log("Yo gano");
    if (notification.dataUser === "piedra" && notification.res === "tijera")
      console.log("Yo gano");
    if (notification.dataUser === "tijera" && notification.res === "piedra")
      console.log("El pc gana");
    if (
      (notification.dataUser === "piedra" && notification.res === "piedra") ||
      (notification.dataUser === "papel" && notification.res === "papel") ||
      (notification.dataUser === "tijera" && notification.res === "tijera")
    )
      console.log("Empate");
  }
}

let jankenpon = new Jankenpon();

jankenpon.subscribe(new JankenponSpanish());

// jankenpon.action('piedra');
jankenpon.action('papel');
// jankenpon.action('tijera');
