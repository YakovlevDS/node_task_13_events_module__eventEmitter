// Если мы читаем данные по частям, логично записывать их тоже по частям.
// Для этого создадим поток записи output

// const fs = require('fs');
// const output = fs.createWriteStream('destination.txt');

// Если не создать файл, который указан в качестве пункта назначения наших данных, destination.txt, перед началом записи он будет создан автоматически.
// Поток чтения назовём input и каждую часть данных, которую он отдает, будем записывать в файл при помощи метода output.write()

// Сравните полученный код потока записи с кодом потока чтения - они создаются и используются сходным образом.

// ! ============== запись с файла в др файл

const fs = require('fs');

const input = fs.createReadStream('source.txt', 'utf-8');
const output = fs.createWriteStream('destination.txt');

input.on('data', chunk => output.write(chunk));
input.on('error', error => console.log('Error', error.message));