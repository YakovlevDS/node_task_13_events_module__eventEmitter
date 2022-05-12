// ! В Node.js есть 4 основных вида потоков:

// Readable — поток чтения, используется для чтения данных
// Writable — поток записи, используется для записи данных
// Duplex — поток, который может быть использован как для чтения, так и для записи данных
// Transform— разновидность Duplex, используемая для преобразования данных

// Создадим программу, которая будет читать достаточно большой файл и выводить его содержимое в консоль.
// У потока чтения есть событие data, которое генерируется, когда стрим прочитал порцию данных и готов отдать ее потребителю этих данных. 


// ! ============== Считываем в консоль в виде Buffer
// const fs = require('fs');
// const readableStream = fs.createReadStream('source.txt');
// readableStream.on('data', chunk => console.log(chunk));
// =================


// В консоли вместо текста объекты Buffer. Раньше эту проблему мы решали при помощи метода data.toString(),
//  но преобразовать Buffer в строку можно и другим способом, указав вторым параметром метода createReadStream() кодировку 'utf-8'.

// ! ============== Считываем в консоль длину Buffer 
// const fs = require('fs');
// const readableStream = fs.createReadStream('source.txt');
// readableStream.on('data', chunk => console.log(chunk.length));
//? Если файл с данными достаточно большой, видно, что приходят они частями (чанками) размером 64кБ.
// =================

// ! ============== Считываем в консоль длину Buffer 

// const fs = require('fs');
// const stream = fs.createReadStream('source.txt', 'utf-8');
// let data = '';
// stream.on('data', chunk => data += chunk);
// =================
// Так как мы имеем дело с потоком данных, нам нужно знать когда поток завершится. Для этого у стрима есть событие 'end'. Это событие срабатывает когда все данные уже переданы.
// При наступлении события 'end' выведем в консоль сообщение и длину полученных данных:

// ! ============== Считываем поток по кускам дожидаемся события end и выводим результат в консоль

// const fs = require('fs');

// const stream = fs.createReadStream('source.txt', 'utf-8');

// let data = '';

// stream.on('data', chunk => data += chunk);
// stream.on('end', () => console.log('End', data));
// =================


// ! ============== С учетом обработки ошибок событие error
const fs = require('fs');

const stream = fs.createReadStream('source2.txt', 'utf-8');

let data = '';

stream.on('data', chunk => data += chunk);
stream.on('end', () => console.log('End', data));
stream.on('error', error => console.log('Error', error.message));

// =================
