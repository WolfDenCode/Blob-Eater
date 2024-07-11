const player = document.getElementById("player");
const playground = document.querySelector(".playground");
let foodAmountMax = 50;
let foodAmount = 0;

const playgroundRect = playground.getBoundingClientRect();

function createFood() {
    let food = document.createElement("div");

    let size = 7 + Math.random() * 4;
    food.style.width = size + "px";
    food.style.height = size + "px";
    
    food.style.aspectRatio = 1;
    
    food.style.backgroundColor = `rgb(${Math.random() * 256}, ${Math.random() * 256}, ${Math.random() * 256})`;

    food.style.borderRadius = 100 + "%";

    food.style.position = "absolute";
    let x = Math.random() * (playgroundRect.width - size);
    let y = Math.random() * (playgroundRect.height - size);
    food.style.left = x + "px";
    food.style.top = y + "px";
    
    playground.appendChild(food);

    food.classList.add("food");
}

while (foodAmount != foodAmountMax) {
    createFood();
    foodAmount++;
}

let keys = {};

document.addEventListener("keydown", function(event) {
    keys[event.key] = true;
});

document.addEventListener("keyup", function(event) {
    keys[event.key] = false;
});

function movePlayer() {
    let step = 2;
    let playerRect = player.getBoundingClientRect();
    let newTop = player.offsetTop;
    let newLeft = player.offsetLeft;

    if (keys["ArrowUp"] && playerRect.top > playgroundRect.top) {
        newTop -= step;
    }
    if (keys["ArrowDown"] && playerRect.bottom < playgroundRect.bottom) {
        newTop += step;
    }
    if (keys["ArrowLeft"] && playerRect.left > playgroundRect.left) {
        newLeft -= step;
    }
    if (keys["ArrowRight"] && playerRect.right < playgroundRect.right) {
        newLeft += step;
    }

    player.style.top = newTop + "px";
    player.style.left = newLeft + "px";

    document.querySelectorAll('.food').forEach(food => {
        let foodRect = food.getBoundingClientRect();
        if (playerRect.left < foodRect.right &&
            playerRect.right > foodRect.left &&
            playerRect.top < foodRect.bottom &&
            playerRect.bottom > foodRect.top) {
            food.remove();
            growPlayer();
            createFood();
        }
    });

    requestAnimationFrame(movePlayer);
}

function growPlayer() {
    player.style.width = (player.clientWidth + 4) + "px";
    console.log(player.clientWidth);
}

requestAnimationFrame(movePlayer);