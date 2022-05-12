// ==============выводим сообщение при завершении работы программы
// const { stdout } = process;
// process.on('exit', () => stdout.write('Удачи в изучении Node.js!'));
// ==============


// ==============Запускаем файл с кодом, в консоли видим надпись 'Start'. Самостоятельно созданное событие работает.

// const EventEmitter = require('events');
// const emitter = new EventEmitter();
// emitter.on('start', () => console.log('Start'));
// Мы подписались на событие 'start' для объекта emitter.
// emitter.emit('start');
// emit(<event>) - генерирует событие event, заставляя срабатывать обработчики этого события у подписчиков
// ==============

// ==============Запускаем файл с кодом, в консоли видим надпись 'Start'. Самостоятельно созданное событие работает с параметром!.

// const EventEmitter = require('events');
// const emitter = new EventEmitter();
// emitter.on('start', message => console.log(message));
// emitter.emit('start', 'Start message');
// ==============

// ==============Запускаем файл с кодом, в консоли видим надпись 'Start'. Самостоятельно созданное событие работает с параметром + несколько!.

// const EventEmitter = require('events');
// const emitter = new EventEmitter();
// emitter.on('start', (first, second) => console.log(`${first} and ${second}`));
// emitter.emit('start', 1, 2); // 1 and 2
// ==============

// ! =============Одному и тому же событию можно назначить несколько обработчиков (по умолчанию не больше 10,.

// const EventEmitter = require('events');
// const emitter = new EventEmitter();

// const handler1 = () => console.log(1);
// const handler2 = () => console.log(2);

// emitter.on('start', handler1);
// emitter.on('start', handler2);

// emitter.emit('start'); // выводит 1, затем 2
// ==============

// !==============Поставить назначенный позже обработчик в начало очереди нам поможет метод prependListener

// const EventEmitter = require('events');
// const emitter = new EventEmitter();

// const handler1 = () => console.log(1);
// const handler2 = () => console.log(2);
// const handler3 = () => console.log(3);
// const handler4 = () => console.log(4);

// emitter.on('start', handler1);
// emitter.on('start', handler2);
// emitter.on('start', handler3);
// emitter.prependListener('start', handler4); // назначет позже, сработает раньше

// emitter.emit('start'); // выведет цифры в следующем порядке: 4 => 1 => 2 => 3
// ==============



// !==============Один и тот же обработчик может быть назначен несколько раз:

// const EventEmitter = require('events');
// const emitter = new EventEmitter();

// const handler = () => console.log(1);

// emitter.on('start', handler);
// emitter.on('start', handler);
// emitter.on('start', handler);
// emitter.on('start', handler);
// emitter.on('start', handler);

// emitter.emit('start'); // выводит 1 5р
// ==============


// !==============Обработчик срабатывает на каждую генерацию события:

// const EventEmitter = require('events');
// const emitter = new EventEmitter();

// emitter.on('start', message => console.log(message));

// emitter.emit('start', 'Hello'); // Hello
// emitter.emit('start', 'from'); // from
// emitter.emit('start', 'Node.js'); // Node.js
// ==============



// !============== Если необходимо, чтобы обработчик срабатывал только один раз, для подписки используем метод once()
// const EventEmitter = require('events');
// const emitter = new EventEmitter();

// emitter.once('start', message => console.log(message));

// emitter.emit('start', 'Hello'); // сработает только для этого вызова
// emitter.emit('start', 'from');
// emitter.emit('start', 'Node.js');
// ==============

// !============== Удалить из очереди одну функцию-обработчик определенного события позволяет метод экземпляра EventEmitter off() (или его алиас removeListener)

// const EventEmitter = require('events');
// const emitter = new EventEmitter();

// const handler = message => console.log(message);

// emitter.on('start', handler);

// emitter.emit('start', 'Hello'); // Hello

// emitter.off('start', handler); // дальнейшие события не будут обработаны

// emitter.emit('start', 'from'); 
// emitter.emit('start', 'Node.js');
// ==============

// ! ============== Иногда мы хотим, чтобы наш собственный класс имел API EventEmitter:

const EventEmitter = require('events');

class User extends EventEmitter {
    constructor(name, password) {
        super();
        this.name = name;
        this.password = password;
    }

    sayHi() {
        console.log(`Hi! My name is ${this.name}`)
    }
}

const user = new User('Vasya', 12345);

user.on('greetings', user.sayHi);

user.emit('greetings'); // Hi! My name is Vasya



