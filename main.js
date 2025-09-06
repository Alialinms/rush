const listItems = document.querySelectorAll(".game .container ul li");
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
