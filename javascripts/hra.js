import { findWinner } from 'https://unpkg.com/piskvorky@0.1.4'
let currentPlayer = 'circle';
let playerImage = document.querySelector('.player-icon');
let gameArray = [];

const calculate_ai_click = async () => {
    const fields = document.querySelectorAll('.box')
    const response = await fetch('https://piskvorky.czechitas-podklady.cz/api/suggest-next-move', {
        method: 'POST',
        headers: {
            'Content-type': 'application/json',
        },
        body: JSON.stringify({
            board: gameArray,
            player: 'x',
        }),
    })
    const data = await response.json()
    const {x, y} = data.position
    const field = fields[x + y * 10]
    field.click()
}
const place_symbol = async (event, index) => {
    if (currentPlayer === 'circle')
    {
        event.target.classList.toggle('circle-field')
        currentPlayer = 'cross';
        playerImage.src = 'images/icons/cross_white.svg';
        gameArray[index] = 'o';
    }
    else {
        event.target.classList.toggle('cross-field')
        currentPlayer = 'circle';
        playerImage.src = 'images/icons/circle_white.svg';
        gameArray[index] = 'x';
    }
    event.target.disabled = true;

    const winner = findWinner(gameArray);
    if (winner === null) {
        if (currentPlayer === 'cross')
            await calculate_ai_click();
        return;
    }
    endGame(winner);
}

const endGame = (winner) => {
    document.querySelectorAll('.box').forEach((button) => {
        button.disabled = true;
    });
    let message = '';
    switch (winner) {
        case 'o':
        case 'x':
            message = `Vyhrává ${winner === 'o' ? 'kolečko \u{1F9DA}' : 'křížek \u{1F984}'}!`;
            break;
        case 'tie':
            message = 'Remíza \u{1F91D}';
            break;
    }
    setTimeout(function () {
        alert(message);
        location.reload();
    }, 250);
}
document.querySelectorAll('.box').forEach((button, index) => {
    gameArray.push('_');
    button.addEventListener('click', async (event) => {
        await place_symbol(event, index);
    });
});

document.querySelector('.restart-icon').addEventListener('click',() => {
    let result = confirm('Opravdu chcete hru restartovat?');
    if (result === false)
        return;
    gameArray = [];
    document.querySelectorAll('.box').forEach((button) => {
        button.classList.remove('circle-field');
        button.classList.remove('cross-field');
        button.disabled = false;
        gameArray.push('_');
    });
    currentPlayer = 'circle';
    playerImage.src = 'images/icons/circle_white.svg';
});