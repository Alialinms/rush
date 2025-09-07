let parent_listItems = document.querySelector(".game .container ul");
let listItems = document.querySelectorAll(".game .container ul li");
let list_level = document.querySelectorAll(".ready .container ul li");
let timerDisplay = document.querySelector(".game .container span");
let flippedCards = [];
let clic = 0;
let n_level;
let sultan = 0;
let timeLeft;
let countdown;


function toggleBeforeEffect() {
    scrollDown();
    startTimer();
    document.querySelector(".ready").remove();
    listItems.forEach(li => 
        {
            li.classList.add("hide-before");

            setTimeout(() => 
            {
                li.classList.remove("hide-before");
            }, 2000);
        });
    document.querySelector(".question").remove();
    setTimeout(() =>
    {
        sultan = 1;
        clic = 1
    },2000);
}

function shuffle(array)
{
    let current = array.length;
    while (current > 0)
    {
        let random = Math.floor(Math.random() * current);
        current--;

        const tmp = array[current];
        array[current] = array[random];
        array[random] = tmp;
    }
}

function makeCardGrid(column, row)
{
    document.querySelector(".game .container span").style.display="block";
    let card_grid = document.querySelector(".game .container ul");
    let array = [];
    const max = column * row;
    const min = 0;
    const image_width = (Number(getComputedStyle(card_grid).width.replace("px", "")) / column) - 10 * column;

    while (array.length < max)
    {
        array.push(array.length);
    }
    shuffle(array);
    const count = column * row / 2;
    for (let i = 0; i < max; i++)
    {
        card_grid.innerHTML += `<li><img src="./image/photo-${Math.floor(array[i] % count) + 1}.png" alt=""></li>`;
    }
    let images = document.querySelectorAll('.game .container img');
    images.forEach(img => {
        img.style.width = (image_width) + "px";
    });
    listItems = document.querySelectorAll(".game .container ul li");
    play_game(max / 2);
}

function play_game(len)
{
    let pre = 0;
    let i = 0;
    let id;
    let check = [];
    let count_win = 0;
    listItems.forEach(function(e) {
        e.addEventListener("click", function() {
            for (const ele of check) {
                if (ele == e)
                {
                    clic = 0;
                }
            }
            if (sultan == 1)
            {
                if (i < 2 && clic == 1 && id != e)
                    {
                        id = e;
                        i++;
                        e.classList.add("hide-before");
                        const imgSrc = e.querySelector("img").getAttribute("src");
                        flippedCards.push(imgSrc);
                        if (flippedCards.length === 2)
                        {
                            id = 0;
                            if (flippedCards[0] === flippedCards[1])
                            {
                                e.classList.add("action-win");
                                if (pre != 0)
                                {
                                    pre.classList.add("action-win");
                                }
                                count_win++;
                                console.log(count_win);
                                if (count_win == len)
                                {
                                    clearInterval(countdown);
                                    showWinPopup();
                                }
                                check.push(e);
                                check.push(pre);
                                setTimeout(() => {
                                    e.classList.remove("action-win");
                                    pre.classList.remove("action-win");
                                    flippedCards = [];
                                }, 1000);
                            } 
                            else
                            {
                                e.classList.add("action-loser");
                                if (pre != 0)
                                {
                                    pre.classList.add("action-loser");
                                }
                                setTimeout(() => {
                                    e.classList.remove("action-loser");
                                    pre.classList.remove("action-loser");
                                    pre.classList.remove("hide-before");
                                    e.classList.remove("hide-before");
                                    flippedCards = [];
                                }, 1000);
                            }
                            setTimeout(() => {
                                i = 0;
                            },1000);
                        }
                        else
                        {
                            pre = e;
                        }
                    }
                    clic = 1;
            }
        });
    });
}

list_level.forEach(li =>
    {
        
        let level = li.textContent;
        li.addEventListener("click", function()
        {
            parent_listItems.innerHTML="";
            if (n_level)
            {
                n_level.classList.remove("choose");
            }
            document.querySelector(".question").style.display="none";
            if (level == "Easy")
            {
                n_level = li;
                parent_listItems.style.width="400px";
                timerDisplay.innerHTML="10";
                timeLeft = 10;
                makeCardGrid(2, 2);
                li.classList.add("choose");
                document.querySelector(".question").style.display="block";
                
            }
            if (level == "Medium")
            {
                n_level = li;
                parent_listItems.style.width="800px";
                timerDisplay.innerHTML="15";
                timeLeft = 15;
                makeCardGrid(4, 2);
                li.classList.add("choose");
                document.querySelector(".question").style.display="block";
            }
            if (level == "Difficult")
            {
                n_level = li;
                parent_listItems.style.width="700px";
                timerDisplay.innerHTML="30";
                timeLeft = 30;
                makeCardGrid(4, 4);
                li.classList.add("choose");
                document.querySelector(".question").style.display="block";
            }
        })
    }
    )


function showWinPopup()
{
    document.getElementById("win-popup").style.display = "block";
}
    
function restartGame()
{
    location.reload();
}
    
function scrollDown()
{
    window.scrollBy({
        top: 500,
        behavior: "smooth"
});
}

function startTimer() {
    countdown = setInterval(() => {
        timeLeft--;
        timerDisplay.textContent = timeLeft;
        
        if (timeLeft <= 0) {
            clearInterval(countdown);
            timerDisplay.style.display="none";
            document.getElementById("loss-popup").style.display = "block";
        }
    }, 1000);
}
