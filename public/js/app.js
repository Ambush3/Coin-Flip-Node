// document.getElementById('click').onclick = click;

// var heads = 0;
// var tails = 0;
// function click() {
//     x = (Math.floor(Math.random() * 2) == 0);
//     if (x) {
//         flip("heads");

//     } else {
//         flip("tails");
//     }
// };
// // function flip(coin) {
// //     document.getElementById("coin").innerHTML = coin;
// // };

let coin = document.getElementById("coin");
let flipBtn = document.querySelector("#flip-button")
let resetBtn = document.querySelector("#reset-button")

let heads = 0;
let tails = 0;

flipBtn.addEventListener("click", () => { // addEventListener is a method that adds an event listener to the element
    let x = (Math.floor(Math.random() * 2) == 0);  // Math.floor(Math.random() * 2) == 0 is a random number between 0 and 1
    coin.style.animation = "none"; // this is a css property that removes the animation
    if (x) {
        setTimeout(function () {
            coin.style.animation = "spin-heads 3s forwards"; // this is a css property that adds the animation
        }, 100);
        heads++;
    }
    else {
        setTimeout(function () {
            coin.style.animation = "spin-tails 3s forwards"; // this is a css property that adds the animation
        }, 100); // this is a css property that adds the animation
        tails++;
    }
    setTimeout(updateStats, 3000);
    disableButton();
});

function updateStats() { // this function updates the stats
    document.querySelector("#heads-count").textContent = `Heads: ${heads}`;
    document.querySelector("#tails-count").textContent = `Tails: ${tails}`;
}

function disableButton() { // this function disables the button
    flipBtn.disabled = true;
    setTimeout(function () {
        flipBtn.disabled = false;
    }, 3000);
}

resetBtn.addEventListener("click", () => { // this function resets the stats")
    coin.style.animation = "none";
    heads = 0;
    tails = 0;
    updateStats();
});