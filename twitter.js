const tweetsData = [   
    {
        handle: `@TrollBot66756542 💎`,
        profilePic: `images/troll.png`,
        likes: 27,
        retweets: 10,
        tweetText: `Buy Bitcoin, ETH Make 💰💰💰 low low prices. 
            Guaranteed return on investment. HMU DMs open!!`,
        replies: [],
        isLiked: false,
        isRetweeted: false,
        uuid: '4b161eee-c0f5-4545-9c4b-8562944223ee',
    },    
    {
        handle: `@Elon ✅`,
        profilePic: `images/elon.png`,
        likes: 6500,
        retweets: 234,
        tweetText: `I need volunteers for a one-way mission to Mars 🪐. No experience necessary🚀`,
        replies: [
                  {
                handle: `@TomCruise ✅`,
                profilePic: `images/tom.jpg`,
                tweetText: `Yes! Sign me up! 😎🛩`,
            },
                  {
                handle: `@CrazyWoman ✅`,
                profilePic: `images/woman.jpg`,
                tweetText: `I went last year😴`,
            },
        ],
        isLiked: false,
        isRetweeted: false,
        uuid: '3c23454ee-c0f5-9g9g-9c4b-77835tgs2',
    },
        {
        handle: `@NoobCoder12`,
        profilePic: `images/unknown.png`,
        likes: 10,
        retweets: 3,
        tweetText: `Are you a coder if you only know HTML?`,
        replies: [
            {
                handle: `@StackOverflower ☣️`,
                profilePic: `images/man.png`,
                tweetText: `No. Obviosuly not. Go get a job in McDonald's.`,
            },
            {
                handle: `@YummyCoder64`,
                profilePic: `images/hands.jpg`,
                tweetText: `You are wonderful just as you are! ❤️`,
            },
        ],
        isLiked: false,
        isRetweeted: false,
        uuid: '8hy671sff-c0f5-4545-9c4b-1237gyys45',
    },  
]

document.addEventListener("click",function(e) {
    if(e.target.dataset.heart) {
        handleHeart(e.target.dataset.heart)
    } else if(e.target.dataset.retweet) {
        handleRetweet(e.target.dataset.retweet)
    } else if(e.target.dataset.reply) {
        handleReply(e.target.dataset.reply)
    } else if(e.target.id === "tweet-write") {
        newTweet()
    }
})

function uuidGenerator() {
    const source = [0,1,2,3,4,5,6,7,8,9,"q","w","e","r","t","y","u","i","o","p","a","s","d","f","g","h","j","k","l","z","x","c","v","b","n","m"]
    const exampleuuid = `4b161eee-c0f5-4545-9c4b-8562944223ee`
    let newuuid = ``

    for (let i = 0; i < exampleuuid.length; i++) {
        const num = Math.floor(Math.random()*(source.length+1))

        if(i%5) {
            newuuid += `${source[num]}`
        } else {
            if( i===0 || i===(exampleuuid.length-1)) {
                newuuid += `${source[num]}`
            } else {
                newuuid += `-`
            }
        }

    }
    return (newuuid)
}

uuidGenerator()

function newTweet() {
    const tweetInput = document.getElementById('tweet-write')

    console.log(tweetInput.value)

    if(tweetInput.value) {
        tweetsData.push({
            handle: `@BibekHistorian 💎`,
            profilePic: `images/me.jpg`,
            likes: 10,
            retweets: 20,
            tweetText: tweetInput.value,
            replies: [],
            isLiked: false,
            isRetweeted: false,
            uuid: `${uuidGenerator()}`
        })
    }
    render()
}


function handleHeart(tweetuuid) {
    const reqObj = tweetsData.filter(function(tweet) {
        return tweet.uuid === tweetuuid
    })[0]

    if (reqObj.isLiked) {
        reqObj.likes--
    } else {
        reqObj.likes++
    }

    reqObj.isLiked = ! reqObj.isLiked
    render()
}

function handleRetweet(tweetuuid) {
    const reqObj = tweetsData.filter(function(tweet) {
        return tweet.uuid === tweetuuid
    })[0]

    if (reqObj.isRetweeted) {
        reqObj.retweets--
    } else {
        reqObj.retweets++
    }

    reqObj.isRetweeted = !reqObj.isRetweeted
    render()
}

function handleReply(tweetuuid) {
    document.getElementById(`replies-${tweetuuid}`).classList.toggle('hidden')
}

function getTweetFeed() {
    let str = ``
    let replyHtml =``

    tweetsData.forEach(function(tweet) {

        let red = ``
        let green = ``

        if(tweet.isLiked) {
            red = `hearted`
        }

        if(tweet.isRetweeted) {
            green = `retweeted`
        }

        if(tweet.replies.length > 0) {
            tweet.replies.forEach(function(reply) {
                replyHtml +=
                    `
                    <div class="replied">
                        <img src="${reply.profilePic}" class="image">
                        <div>
                            <h4>${reply.handle}</h4>
                            <p>${reply.tweetText}</p>
                        </div>
                    </div>
                    `
            })
        }

        str +=  
        `
        <section class="flex">
            <figure>
                <img src="${tweet.profilePic}" class="image">
            </figure>
            <div>
                <h4>${tweet.handle}</h4>
                <p>${tweet.tweetText}</p>
                <div class="tweet-details">
                    <span>
                        <i class="fa-regular fa-comment" data-reply="${tweet.uuid}"></i>
                        ${tweet.replies.length}
                    </span>
                    <span>
                        <i class="fa-solid fa-heart ${red}" data-heart="${tweet.uuid}"></i>
                        ${tweet.likes}
                    </span>
                    <span>
                        <i class="fa-solid fa-retweet ${green}" data-retweet="${tweet.uuid}"></i>
                        ${tweet.retweets}
                    </span>
                </div>
            </div>
        </section>
        <div class="hidden" id="replies-${tweet.uuid}">
            ${replyHtml}
        </div>
        `
    })
    return str
}

function render() {
    document.getElementById("tweet-feed").innerHTML = getTweetFeed()
}

render()