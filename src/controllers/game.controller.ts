import { HttpStatusCode } from 'axios';
import { Request, Response } from 'express';
import { Action } from '../framework/type';
import { createRandomNumber, isGuessedNumberCorrect } from "../service/game.service";

let isUserPlaying = false;
const startGame: Action = {
    path: '/game',
    method: 'post',
    action: (request: Request, response: Response) => {
        if (isUserPlaying) {
            response.json("Gra jest już rozpoczęta!!!");
        } else {
            response.json("Gra rozpoczęta");
            createRandomNumber();
            //response.json(createRandomNumber());
            isUserPlaying = true;
        }
    }
}

let tries=0;
const guessNumber: Action = {
    path: '/game/:number',
    method: 'post',
    action: (request: Request, response: Response) => {

        if (!isUserPlaying) {
            return response.status(HttpStatusCode.BadRequest).send({
                error: `Gra nie jest jeszcze rozpoczęta!`,
            });
        }else if (tries>=20) {
            response.json("Przegrałeś!!!");
        }else {

            const guessedNumber = request.params.number;

            response.json(isGuessedNumberCorrect(guessedNumber));
            tries++;

        }

    }

}

export default [startGame, guessNumber];