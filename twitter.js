import { v4 as uuidv4 } from 'https://jspm.dev/uuid';

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

function newTweet() {
    const tweetInput = document.getElementById('tweet-write')

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
            uuid: `${uuidv4()}`
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