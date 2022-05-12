// Код из предыдущей части(ниже повтор) можно сделать ещё проще и лучше:
// const fs = require('fs');

// const input = fs.createReadStream('source.txt', 'utf-8');
// const output = fs.createWriteStream('destination.txt');

// input.on('data', chunk => output.write(chunk));
// input.on('error', error => console.log('Error', error.message));

//! ====================улучшаем методом .pipe()

// const fs = require('fs');
// const input = fs.createReadStream('source.txt', 'utf-8');
// const output = fs.createWriteStream('destination.txt');
// input.pipe(output);
// ==========

// Несмотря на то, что кода стало меньше, работает он точно так же, как прежде.
// Метод pipe(), имеющийся у каждого потока, можно использовать для объединения одних потоков с другими. Такие цепочки могут объединять несколько потоков.

// Эту особенность метода pipe() используют, например, для сжатия файлов.

// Импортируем zlib, и используем ее стандартный метод, который отвечает за сжатие файлов. Поток gzip является трансформирующим потоком: получает одни данные, преобразует их и возвращаёт другие данные.
// После создания потока чтения создадим поток, который отвечает за сжатие файла:
// const gzip = zlib.createGzip();
// затем чего соединим поток сжатия и поток вывода
// input.pipe(gzip).pipe(output);

//! ==================+ сжимаем zlib module метод createGzip()

// const fs = require('fs');
// const zlib = require('zlib');

// const input = fs.createReadStream('source.txt', 'utf-8');
// const output = fs.createWriteStream('destination.txt.gz');
// const gzip = zlib.createGzip();

// input.pipe(gzip).pipe(output);
// ===================

// Есть довольно удобный способ объединения нескольких потоков, позволяющий использовать один обработчик ошибок — функция pipeline:

//! ================== + использовать один обработчик ошибок !!! pipeline() из stream

const fs = require('fs');
const zlib = require('zlib');
const { pipeline } = require('stream');

const input = fs.createReadStream('source.txt', 'utf-8');
const output = fs.createWriteStream('destination.txt.gz');
const gzip = zlib.createGzip();

pipeline(
    input,
    gzip,
    output,
    err => {
        if (err) {
            // обрабатываем ошибки
        }
    }
);
// ===================