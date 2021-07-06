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

class FacturaExample extends Observable {
  constructor() {
    super();
    this.product = [];
  }
  register(element) {
    this.product.push(element);
    this.notifyObservable(this);
  }
}

class FacturaExampleSpanish {
  notify(notification) {
    notification.product.forEach(
        pro => {
            console.log(`El producto es: ${pro}`);
        }
    );
  }
}

class FacturaExampleEnglish {
  notify(notification) {
    notification.product.forEach(
        pro => {
            console.log(`The product is: ${pro}`);
        }
    );
  }
}

let facturaExample = new FacturaExample();

facturaExample.subscribe(new FacturaExampleSpanish());
facturaExample.subscribe(new FacturaExampleEnglish());

var stdin = process.openStdin();

stdin.addListener("data", function(d) {
    facturaExample.register(d);
});
