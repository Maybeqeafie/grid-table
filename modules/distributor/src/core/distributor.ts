import {Logger} from '../common/logger/logger';
import {generateShortId} from '../utils/generate-short-id';
import {HttpService} from '../common/http/http.service';
import * as fs from "fs";

let gridDataTable: string[][] = [];
let gridDataDictionary: string[] = [];

export class Distributor {
    private readonly logger;
    private readonly httpService: HttpService;

    private readonly id: string;
    private time0: number;

    constructor() {
        this.id = generateShortId();

        this.logger = new Logger(`${Distributor.name}_${this.id}`);
        this.httpService = new HttpService();

        this.logger.log('Initialized');

        this.time0 = 0;
    }

    run() {
        this.produceTasks();
        this.findResult();

    }

    async produceTasks() {
        try {
            const dataTable = fs.readFileSync(__dirname + '/../../data/table.json', 'utf8');
            const dataDictionary = fs.readFileSync(__dirname + '/../../data/dictionary.json', 'utf8');
            const tt = JSON.parse(dataTable) as { table: string[][] };
            const dt = JSON.parse(dataDictionary) as { dictionary: string[] };
            gridDataTable = tt.table;
            gridDataDictionary = dt.dictionary;
            // console.log(gridDataTable[0].length);
            // console.log(gridDataDictionary);
        } catch (err) {
            if (err instanceof Error) {
                this.logger.error('Error while reading file, message:', err.message);
            }
        }
        let dictionary = ["авансом", "антидот", "багор", "барыня", "бедро", "бюргер", "вкось", "всхрап","вуаль", "девятая", "джинсы",
            "добром", "дубликат", "ежевика", "замах", "заново", "класс", "медперсонал", "морда", "озеро", "отряд", "пороша", "райком", "распад", "родные", "словосочетание",
            "солнцестояние", "сомнамбула", "такси", "тренировка", "цитата", "челнок", "чужое"];
        let table = [
            ["м", "о", "к", "й", "а", "р", "т", "и", "о", "к", "ь", "ы", "с", "л"],
            ["о", "р", "е", "з", "о", "о", "с", "в", "о", "с", "л", "с", "т", "а"],
            ["с", "д", "е", "г", "д", "к", "о", "н", "о", "ч", "а", "н", "п", "н"],
            ["н", "е", "а", "и", "а", "н", "л", "м", "р", "л", "у", "и", "о", "о"],
            ["а", "б", "т", "т", "а", "е", "н", "р", "к", "а", "в", "ж", "р", "с"],
            ["в", "н", "м", "з", "ч", "а", "ц", "щ", "я", "ц", "с", "д", "о", "р"],
            ["а", "д", "р", "о", "м", "р", "е", "г", "р", "ю", "б", "п", "ш", "е"],
            ["ц", "у", "г", "б", "р", "ж", "с", "ч", "в", "с", "х", "р", "а", "п"],
            ["щ", "б", "у", "р", "е", "б", "т", "э", "ж", "з", "б", "ф", "ц", "д"],
            ["с", "л", "о", "в", "о", "с", "о", "ч", "е", "т", "а", "н", "и", "е"],
            ["а", "и", "и", "к", "т", "д", "я", "д", "а", "э", "р", "м", "т", "м"],
            ["а", "к", "в", "о", "р", "и", "н", "е", "р", "т", "ы", "л", "а", "я"],
            ["а", "а", "д", "с", "я", "ю", "и", "ы", "р", "ь", "н", "ь", "т", "х"],
            ["ж", "т", "ц", "ь", "д", "ш", "е", "д", "е", "в", "а", "т", "а", "я"]
        ];
        // console.log(table);
        // console.log(gridDataTable);
        let limit = 1000000000;
        let res = 0;
        console.log(gridDataTable[0].length);
        for (let k = 0; k < gridDataTable[0].length; k++) {
            res += (gridDataTable[0].length - k) * gridDataDictionary.length;
        }
        res *= (gridDataTable.length * 2);
        let counter = Math.floor(limit / res);
        this.time0 = performance.now();
        if (counter > gridDataDictionary.length) {
            await this.produce(`
let operationCounter = 0;

let dictionary = [${gridDataDictionary.map(item => `'${item}'`).join(', ')}];


let t0;
let t1;


let resCounterFor = 0;
let taskWinnerResultWord = "";
let taskWinnerResultTable = [];
let taskWinnerFirstWord = "";
t0 = performance.now();
for (let i = 1; i <= dictionary.length; i++) {
    let tableFor = [
    ${gridDataTable.map(subArray => '[' + subArray.map(item => `'${item}'`).join(',') + ']').join(',')}
  ]
    let dictionaryFor = [${gridDataDictionary.map(item => `'${item}'`).join(', ')}];

    let resCounter = 0;
    const valueToMove = dictionaryFor.splice(i, 1)[0];
    dictionaryFor.splice(0, 0, valueToMove);
    let word = dictionaryFor[i];

    function findWordsInDictionary(tableFor, dictionaryFor) {
        const lengthRows = tableFor.length;
        const lengthCols = tableFor[0].length;
        const foundWords = [];

        for (let dict = 0; dict < dictionaryFor.length; dict++) {


            //Поиск по горизонтали
            for (let p = 0; p < lengthRows; p++) {
                let counter = 0;
                for (let i = 0; i < lengthCols; i++) {
                    for (let j = i + 1; j <= lengthCols; j++) {
                        operationCounter += 1;
                        counter += j;
                        const substring = tableFor[p].slice(i, j).join('');
                        if (dictionaryFor[dict] === substring) {
                            foundWords.push(substring);
                            for (let k = i; k < j; k++) {
                                tableFor[p][k] = 1;
                                resCounter += 1;
                            }
                        }
                    }
                }
            }

            //Поиск по вертикали
            for (let j = 0; j < lengthCols; j++) {
                for (let i = 0; i < lengthRows; i++) {
                    let colWord = '';
                    // Сохраняем начальное значение индекса строки для данного столбца
                    for (let k = i; k < lengthRows; k++) {
                        operationCounter += 1;
                        colWord += tableFor[k][j];
                        if (dictionaryFor[dict] === colWord) {
                            foundWords.push(colWord);
                            // Перебираем только те строки, которые использовались для слова
                            for (let p = i; p <= k; p++) {
                                tableFor[p][j] = 1; // Заменяем только эти элементы на 1
                                resCounter += 1;
                            }
                        }
                    }
                }
            }
        }

        return foundWords;
    }

    const wordsFound = findWordsInDictionary(tableFor, dictionaryFor);
    if(resCounter > resCounterFor){
        taskWinnerResultTable = tableFor;
        taskWinnerResultWord = wordsFound;
        taskWinnerFirstWord = word;
        resCounterFor = resCounter;

    }
}
t1 = performance.now();

console.log("найденные слова - ", taskWinnerResultWord);
console.log("поиск начинался со слова - " + taskWinnerFirstWord);
console.log("количество зачеркнутых букв - " + resCounterFor);
console.log(taskWinnerResultTable.join('\\n'));
console.log(operationCounter);
console.log(t1 - t0, 'milliseconds');

let tableVid = taskWinnerResultTable.join('\\n');

[taskWinnerFirstWord, resCounterFor, tableVid];
`);
        }
        if (counter < 1) {
            for (let i = 1; i <= gridDataDictionary.length; i++) {
                await this.produce(`

let table = [
    ${gridDataTable.map(subArray => '[' + subArray.map(item => `'${item}'`).join(',') + ']').join(',')}
  ]
let dictionary = [${gridDataDictionary.map(item => `'${item}'`).join(', ')}];

let operationCounter = 0;

const valueToMove = dictionary.splice(${i}, 1)[0];
dictionary.splice(0, 0, valueToMove);

let resCounter = 0;
let word = dictionary[${i}];

function findWordsInDictionary(table, dictionary) {
    const lengthRows = table.length;
    const lengthCols = table[0].length;
    const foundWords = [];


    for (let dict = 0; dict < dictionary.length; dict++) {



        for (let p = 0; p < lengthRows; p++) {
            let counter = 0;
            for (let i = 0; i < lengthCols; i++) {
                for (let j = i + 1; j <= lengthCols; j++) {
                    operationCounter += 1;
                    counter += j;
                    const substring = table[p].slice(i, j).join('');
                    if (dictionary[dict] === substring) {
                        foundWords.push(substring);
                        for (let k = i; k < j; k++) {
                            table[p][k] = 1;
                            resCounter += 1;
                        }
                    }
                }
            }
        }

        for (let j = 0; j < lengthCols; j++) {
            for (let i = 0; i < lengthRows; i++) {
                let colWord = '';
                for (let k = i; k < lengthRows; k++) {
                    operationCounter += 1;
                    colWord += table[k][j];
                    if (dictionary[dict] === colWord) {
                        foundWords.push(colWord);
                        for (let p = i; p <= k; p++) {
                            table[p][j] = 1;
                            resCounter += 1;
                        }
                    }
                }
            }
        }
    }

    return foundWords;
}
const t0 = performance.now();
const wordsFound = findWordsInDictionary(table, dictionary);
const t1 = performance.now();

console.log("поиск начинался со слова - " + word);
console.log("найденные слова - ", wordsFound);
console.log("количество зачеркнутых букв - " + resCounter);
// console.log(table.join('\\n'));
console.log(operationCounter);
console.log(t1 - t0, 'milliseconds');

let tableVid = table.join('\\n');
[word, resCounter, tableVid];
`);

            }
        }
        if ((counter > 1) && (counter < gridDataDictionary.length)) {
            let counterDictionary = 0;
            await this.produce(`
let operationCounter = 0;

let dictionary = [${gridDataDictionary.map(item => `'${item}'`).join(', ')}];

let t0;
let t1;


let resCounterFor = 0;
let taskWinnerResultWord = "";
let taskWinnerResultTable = [];
let taskWinnerFirstWord = "";
t0 = performance.now();
for (let i = ${counterDictionary}; i < ${counter}; i++) {
    let tableFor = [
    ${gridDataTable.map(subArray => '[' + subArray.map(item => `'${item}'`).join(',') + ']').join(',')}
  ]
    let dictionaryFor = [${gridDataDictionary.map(item => `'${item}'`).join(', ')}];

    let resCounter = 0;
    const valueToMove = dictionaryFor.splice(i, 1)[0];
    dictionaryFor.splice(0, 0, valueToMove);
    let word = dictionaryFor[i];

    function findWordsInDictionary(tableFor, dictionaryFor) {
        const lengthRows = tableFor.length;
        const lengthCols = tableFor[0].length;
        const foundWords = [];

        for (let dict = 0; dict < dictionaryFor.length; dict++) {


            //Поиск по горизонтали
            for (let p = 0; p < lengthRows; p++) {
                let counter = 0;
                for (let i = 0; i < lengthCols; i++) {
                    for (let j = i + 1; j <= lengthCols; j++) {
                        operationCounter += 1;
                        counter += j;
                        const substring = tableFor[p].slice(i, j).join('');
                        if (dictionaryFor[dict] === substring) {
                            foundWords.push(substring);
                            for (let k = i; k < j; k++) {
                                tableFor[p][k] = 1;
                                resCounter += 1;
                            }
                        }
                    }
                }
            }

            //Поиск по вертикали
            for (let j = 0; j < lengthCols; j++) {
                for (let i = 0; i < lengthRows; i++) {
                    let colWord = '';
                    // Сохраняем начальное значение индекса строки для данного столбца
                    for (let k = i; k < lengthRows; k++) {
                        operationCounter += 1;
                        colWord += tableFor[k][j];
                        if (dictionaryFor[dict] === colWord) {
                            foundWords.push(colWord);
                            // Перебираем только те строки, которые использовались для слова
                            for (let p = i; p <= k; p++) {
                                tableFor[p][j] = 1; // Заменяем только эти элементы на 1
                                resCounter += 1;
                            }
                        }
                    }
                }
            }
        }

        return foundWords;
    }

    const wordsFound = findWordsInDictionary(tableFor, dictionaryFor);
    if(resCounter > resCounterFor){
        taskWinnerResultTable = tableFor;
        taskWinnerResultWord = wordsFound;
        taskWinnerFirstWord = word;
        resCounterFor = resCounter;

    }
}
t1 = performance.now();

console.log("найденные слова - ", taskWinnerResultWord);
console.log("поиск начинался со слова - " + taskWinnerFirstWord);
console.log("количество зачеркнутых букв - " + resCounterFor);
console.log(taskWinnerResultTable.join('\\n'));
console.log(operationCounter);
console.log(t1 - t0, 'milliseconds');

let tableVid = taskWinnerResultTable.join('\\n');

[taskWinnerFirstWord, resCounterFor, tableVid];
`);
            counterDictionary += counter;
        }

//         for(let i = 0; i < 200; i++){
//             await this.produce(`
//
// let table = [
//     ["м", "о", "к", "й", "а", "р", "т", "и", "о", "к", "ь", "ы", "с", "л"],
//     ["о", "р", "е", "з", "о", "о", "с", "в", "о", "с", "л", "с", "т", "а"],
//     ["с", "д", "е", "г", "д", "к", "о", "н", "о", "ч", "а", "н", "п", "н"],
//     ["н", "е", "а", "и", "а", "н", "л", "м", "р", "л", "у", "и", "о", "о"],
//     ["а", "б", "т", "т", "а", "е", "н", "р", "к", "а", "в", "ж", "р", "с"],
//     ["в", "н", "м", "з", "ч", "а", "ц", "щ", "я", "ц", "с", "д", "о", "р"],
//     ["а", "д", "р", "о", "м", "р", "е", "г", "р", "ю", "б", "п", "ш", "е"],
//     ["ц", "у", "г", "б", "р", "ж", "с", "ч", "в", "с", "х", "р", "а", "п"],
//     ["щ", "б", "у", "р", "е", "б", "т", "э", "ж", "з", "б", "ф", "ц", "д"],
//     ["с", "л", "о", "в", "о", "с", "о", "ч", "е", "т", "а", "н", "и", "е"],
//     ["а", "и", "и", "к", "т", "д", "я", "д", "а", "э", "р", "м", "т", "м"],
//     ["а", "к", "в", "о", "р", "и", "н", "е", "р", "т", "ы", "л", "а", "я"],
//     ["а", "а", "д", "с", "я", "ю", "и", "ы", "р", "ь", "н", "ь", "т", "х"],
//     ["ж", "т", "ц", "ь", "д", "ш", "е", "д", "е", "в", "а", "т", "а", "я"]
// ]
// let dictionary = ["авансом","антидот","багор","барыня","бедро","бюргер","вкось","всхрап","вуаль","девятая","джинсы",
//     "добром","дубликат","ежевика","замах","заново","класс","медперсонал","морда","озеро","отряд","пороша","райком","распад","родные","словосочетание",
//     "солнцестояние","сомнамбула","такси","тренировка","цитата","челнок","чужое"];
//
// let operationCounter = 0;
//
// const valueToMove = dictionary.splice(${0}, 1)[0];
// dictionary.splice(0, 0, valueToMove);
//
// let resCounter = 0;
// let word = dictionary[${0}];
//
// function findWordsInDictionary(table, dictionary) {
//     const lengthRows = table.length;
//     const lengthCols = table[0].length;
//     const foundWords = [];
//
//
//     for (let dict = 0; dict < dictionary.length; dict++) {
//
//
//
//         for (let p = 0; p < lengthRows; p++) {
//             let counter = 0;
//             for (let i = 0; i < lengthCols; i++) {
//                 for (let j = i + 1; j <= lengthCols; j++) {
//                     operationCounter += 1;
//                     counter += j;
//                     const substring = table[p].slice(i, j).join('');
//                     if (dictionary[dict] === substring) {
//                         foundWords.push(substring);
//                         for (let k = i; k < j; k++) {
//                             table[p][k] = 1;
//                             resCounter += 1;
//                         }
//                     }
//                 }
//             }
//         }
//
//         for (let j = 0; j < lengthCols; j++) {
//             for (let i = 0; i < lengthRows; i++) {
//                 let colWord = '';
//                 for (let k = i; k < lengthRows; k++) {
//                     operationCounter += 1;
//                     colWord += table[k][j];
//                     if (dictionary[dict] === colWord) {
//                         foundWords.push(colWord);
//                         for (let p = i; p <= k; p++) {
//                             table[p][j] = 1;
//                             resCounter += 1;
//                         }
//                     }
//                 }
//             }
//         }
//     }
//
//     return foundWords;
// }
// const t0 = performance.now();
// const wordsFound = findWordsInDictionary(table, dictionary);
// const t1 = performance.now();
//
// console.log("поиск начинался со слова - " + word);
// console.log("найденные слова - ", wordsFound);
// console.log("количество зачеркнутых букв - " + resCounter);
// // console.log(table.join('\\n'));
// console.log(operationCounter);
// console.log(t1 - t0, 'milliseconds');
//
// let tableVid = table.join('\\n');
// [word, resCounter, tableVid];
// `);
//
//
//         }
    }

    async produce(code: string) {
        await this.httpService.produce({
            distributorId: this.id,
            code: code
        });
    }

    async findResult() {
        // let dictionary = gridDataDictionary;
        let resCounter = 0;
        let taskWinnerId = 0;
        let taskWinnerResultWord = "";
        let taskWinnerResultTable = [];
        const tasks = await this.httpService.findResult({distributorId: this.id});

        if (tasks && tasks.length !== 0) {
            for (const task of tasks) {
                if (task.result[1] > resCounter) {
                    resCounter = task.result[1];
                    taskWinnerId = task.id;
                    taskWinnerResultWord = task.result[0];
                    taskWinnerResultTable = task.result[2];
                }
            }
            this.logger.log('Find correct answer, task id =', taskWinnerId, 'task result counter =', resCounter, 'task result word =', taskWinnerResultWord, 'task result table =', taskWinnerResultTable);

            let time1 = performance.now();
            this.logger.log(time1 - this.time0, 'milliseconds');
            process.exit(0);
        }

        setTimeout(this.findResult.bind(this), 5 * 1000);
    }
}