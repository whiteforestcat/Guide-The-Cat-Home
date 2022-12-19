// to create canvas

const canvas = document.querySelector("canvas");

const c = canvas.getContext("2d"); // to create a 2d game

canvas.width = window.innerWidth; // to make canvas take the full width of the screen
canvas.height = window.innerHeight; // to make canvas take the full height of the screen

console.log(c);