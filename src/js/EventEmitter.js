class EventEmitter {
  constructor() {
      this.events = {};
  }

  on(event, listener) {
      if (!this.events[event]) {
          this.events[event] = [];
      }
      this.events[event].push(listener);
  }

  emit(event, ...args) {
      if (this.events[event]) {
          this.events[event].forEach(listener => listener.apply(this, args));
      }
  }

  off(event, listener) {
      if (this.events[event]) {
          this.events[event] = this.events[event].filter(l => l !== listener);
      }
  }
}

window.eventEmitter  =  new EventEmitter();