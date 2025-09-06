let listItems = document.querySelectorAll(".game .container ul li");
let flippedCards = [];
let pre = 0;
let i = 0;
let clic = 0;

function toggleBeforeEffect() {
    listItems.forEach(li => 
        {
            li.classList.add("hide-before");

            setTimeout(() => 
            {
                li.classList.remove("hide-before");
            }, 2000);
        });
    document.querySelector(".question .container p").remove();
    setTimeout(() =>
    {
        clic = 1
    },1000);
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
    listItems = document.querySelectorAll(".game .container ul li")
}

makeCardGrid(4, 4)

listItems.forEach(function(e) {
    e.addEventListener("click", function() {
        if (i < 2 && clic == 1)
        {
            i++;
            console.log(i);
            e.classList.add("hide-before");
            const imgSrc = e.querySelector("img").getAttribute("src");
            flippedCards.push(imgSrc);
            if (flippedCards.length === 2)
            {
                if (flippedCards[0] === flippedCards[1])
                {
                    e.classList.add("action-win");
                    if (pre != 0)
                    {
                        pre.classList.add("action-win");
                    }
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
    });
});

