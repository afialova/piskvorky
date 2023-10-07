//console.log("Hello world!");
let currentPlayer = 'circle';
let playerImage = document.querySelector('.player-icon');

const place_symbol = (event) => {
    if (currentPlayer === 'circle') {
        event.target.classList.toggle('circle-field')
        currentPlayer = 'cross';
        playerImage.src = 'images/icons/cross_white.svg';
    } else {
        event.target.classList.toggle('cross-field')
        currentPlayer = 'circle';
        playerImage.src = 'images/icons/circle_white.svg';
    }
    event.target.disabled = true;
}

document.querySelectorAll('.box').forEach((button) => {
    button.addEventListener('click', place_symbol);
});

document.querySelector('.restart-icon').addEventListener('click', (event) => {
    let result = confirm('Opravdu chcete hru restartovat?');
    if (result === false)
        return;
    document.querySelectorAll('.box').forEach((button) => {
        button.classList.remove('circle-field');
        button.classList.remove('cross-field');
        button.disabled = false;
    });
    currentPlayer = 'circle';
    playerImage.src = 'images/icons/circle_white.svg';
});