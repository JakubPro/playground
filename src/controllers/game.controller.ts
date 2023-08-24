import { Request, Response } from 'express';
import { Action } from '../framework/type';
import { createRandomNumber, isGuessedNumberCorrect } from "../service/game.service";
import { giveUserById, updateUser } from "../service/users.service";


const startGame: Action = {
    path: '/game',
    method: 'post',
    action: (request: Request, response: Response) => {
        let userId = request.header("userId");

        if (userId) {
            const user = !giveUserById(userId.toString());
            if (user) {
                response.json("User nie istnieje!");
            }
        }

        if (userId) {
            const user = giveUserById(userId);
            if (user.isUserPlaying) {
                response.json("Jesteś już w grze!");
            }
        }

        if (userId) {
            const user = giveUserById(userId);
            user.isUserPlaying = true;
            updateUser(user);

            createRandomNumber()
            response.json("gra rozpoczeta!")

        }
    }
}

let tries = 1;
const guessNumber: Action = {
    path: '/game/:number',
    method: 'post',
    action: (request: Request, response: Response) => {
        let userId = request.header("userId");

        if (userId) {
            const user = !giveUserById(userId.toString());
            if (user) {
                response.json("User nie istnieje!");
            }
        }

        if (userId) {
            const user = giveUserById(userId);
            if (!user.isUserPlaying) {
                response.json("Gra nie jest jescze rozpoczęta!");
            }
        }

        if (userId && tries >= 20) {
            const user = giveUserById(userId);
            user.isUserPlaying = false;
            updateUser(user);
            response.json("Przegrałeś!!!");
            tries = 1;
        } else {
            const guessedNumber = request.params.number;

            if (userId && (isGuessedNumberCorrect(guessedNumber) == true)) {
                const user = giveUserById(userId);
                user.isUserPlaying = false;
                updateUser(user);
                response.json("wygrałeś! " + "liczba prób: " + tries);
                tries = 1;
            } else {
                response.json(isGuessedNumberCorrect(guessedNumber));
                tries++;
            }
        }
    }
}


export default [startGame, guessNumber];