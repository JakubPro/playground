export const createRandomNumber = () => {
    let i = 1;
    let randomNumberArray = [];
    while (i <= 5) {
        const randomNumber = Math.floor(Math.random() * 9) + 1;
        i++;
        randomNumberArray.push(randomNumber);

    }
    return randomNumberArray;
};

const randomNumberArray = createRandomNumber();
let triesNumber = 1;

export const isGuessedNumberCorrect = (guessedNumber: string) => {
    const playersNumberArray = Array.from(guessedNumber, Number);
    const answersArray = [];
    const correctAnswers = ["ok", "ok", "ok", "ok", "ok"];
    let i = 0;


    while (i < 5) {
        if (playersNumberArray[i] === randomNumberArray[i]) {
            answersArray.push("ok");
        } else if (playersNumberArray[i] > randomNumberArray[i]) {
            answersArray.push("za dużo");
        } else if (playersNumberArray[i] < randomNumberArray[i]) {
            answersArray.push("za mało");
        }
        i++;
    } for (i = 0; i <= correctAnswers.length; i++) {

        if (answersArray[i] !== correctAnswers[i]) {
            triesNumber++;
            return answersArray;
        }

    }
    return "Wygrałeś!!! " + "liczba prób: " + triesNumber;




};


