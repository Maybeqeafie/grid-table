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
let dictionary = ["авансом", "антидот", "багор", "барыня", "бедро", "бюргер", "вкось", "всхрап", "вуаль", "девятая", "джинсы",
    "добром", "дубликат", "ежевика", "замах", "заново", "класс", "медперсонал", "морда", "озеро", "отряд", "пороша", "райком", "распад", "родные", "словосочетание",
    "солнцестояние", "сомнамбула", "такси", "тренировка", "цитата", "челнок", "чужое"];

// for(let i = 0; i <=1000; i++){
//     table.push(["ж", "т", "ц", "ь", "д", "ш", "е", "д", "е", "в", "а", "т", "а", "я"]);
// }
//
// for(let j = 0; j <=1000; j++){
//     dictionary.push(["авансом", "антидот", "багор", "барыня", "бедро", "бюргер", "вкось", "всхрап", "вуаль", "девятая", "джинсы",
//         "добром", "дубликат", "ежевика", "замах", "заново", "класс", "медперсонал", "морда", "озеро", "отряд", "пороша", "райком", "распад", "родные", "словосочетание",
//         "солнцестояние", "сомнамбула", "такси", "тренировка", "цитата", "челнок", "чужое"]);
// }


let operationCounterFinal = 500000000;
let operationCounter = 0;

console.log(dictionary);

let t0;
let t1;
t0 = performance.now();

let resCounterFor = 0;
let taskWinnerResultWord = "";
let taskWinnerResultTable = [];
let taskWinnerFirstWord = "";

for (let i = 1; i <= dictionary.length; i++) {
    let tableFor = [
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
    ]
    let dictionaryFor = ["авансом", "антидот", "багор", "барыня", "бедро", "бюргер", "вкось", "всхрап", "вуаль", "девятая", "джинсы",
        "добром", "дубликат", "ежевика", "замах", "заново", "класс", "медперсонал", "морда", "озеро", "отряд", "пороша", "райком", "распад", "родные", "словосочетание",
        "солнцестояние", "сомнамбула", "такси", "тренировка", "цитата", "челнок", "чужое"];
    // dictionaryFor.push(dictionary);
    // console.log(dictionaryFor);

    let resCounter = 0;
    const valueToMove = dictionaryFor.splice(i, 1)[0];
    dictionaryFor.splice(0, 0, valueToMove);
    let word = dictionaryFor[i];
    console.log(word);

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
console.log(taskWinnerResultTable.join('\n'));
console.log(operationCounter);
console.log(t1 - t0, 'milliseconds');

let limit = 500000000;
let res = 0;
for (let k = 0; k < 14; k++) {
    res += (14 - k) * 1683;
}
res *= (64 * 2);
console.log(res);
// let counter = Math.floor(limit / res);
// console.log(counter);





