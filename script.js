let songs = []
let decodedsong = []

let currentsong = new Audio()
let playbutton = document.getElementById("play");
let songinseekbar = document.querySelector(".songname")   // Always use (.) while typing class in queryselector()

async function getsongs() {

    let a = await fetch("http://127.0.0.1:3000/Songs/")
    let response = await a.text()
    let div = document.createElement("div")
    div.innerHTML = div.innerHTML + response
    let as = div.getElementsByTagName("a")

    for (const element of as) {
        if (element.href.endsWith(".mp3")) {
            songs.push(element.href)
            decodedsong.push(decodeURI(`${element.href.split("/Songs/")[1]}`))
        }
    }

}

// appends songs to library


function append_songs() {

    let songlist = document.querySelector(".songlist")
    for (const song of decodedsong) {


        songlist.innerHTML = songlist.innerHTML + `<li class="info">${song.replaceAll(".mp3", "")}</li>`

    }
}


// PLAY SONG

function play_song(start = false) {

    if (start == true) {
        songinseekbar.innerHTML = songinseekbar.innerHTML + decodedsong[0];
        currentsong.src = "/Songs/" + encodeURI(`${decodedsong[0]}`)
        currentsong.pause()



    }
    else {
        Array.from(document.querySelector(".songlist").getElementsByTagName("li")).forEach(e => {
            e.addEventListener("click", e => {

                currentsong.src = ""

                //    let index = decodedsong.indexOf(`${e.target.textContent}` + ".mp3")          
                //    console.log(index);
                songinseekbar.innerHTML = "";
                songinseekbar.innerHTML = songinseekbar.innerHTML + `${e.target.textContent}`;

                let playbutton = document.getElementById("play")

                playbutton.src = "pause.svg"
                currentsong.src = "/Songs/" + encodeURI(`${e.target.textContent}`) + ".mp3"
                currentsong.play()


            })
        })
    }
}

// PLAY AND PAUSE SONGS

function playpause() {

    play.addEventListener("click", (e) => {
        if (currentsong.paused) {
            currentsong.play()
            play.src = "pause.svg"
        } else {
            currentsong.pause()
            play.src = "play.svg"
        }


    })
}


// SET CURRENT TIME AND DURATION

function formatTime(seconds) {
    // Ensure seconds are an integer (no decimals)
    seconds = Math.floor(seconds);

    // If seconds is 0, return "00:00"
    if (seconds === 0) {
        return "00:00";
    }

    // Calculate minutes
    const minutes = Math.floor(seconds / 60);
    // Calculate remaining seconds
    const remainingSeconds = seconds % 60;

    // Format minutes and seconds with leading zero if needed
    const formattedMinutes = minutes < 10 ? '0' + minutes : minutes;
    const formattedSeconds = remainingSeconds < 10 ? '0' + remainingSeconds : remainingSeconds;

    // Return formatted time in "MM:SS" format
    return `${formattedMinutes}:${formattedSeconds}`;
}



function duration() {
    currentsong.addEventListener("timeupdate", () => {

        document.querySelector(".duration").innerHTML = `${formatTime(currentsong.currentTime)}/${formatTime(currentsong.duration)}`

    })

}


// SEEKBAR WORKING

function seekbar(){
    document.querySelector(".seekbar")
    
}


async function main() {


    await getsongs()
    play_song(start = true)
    append_songs()
    duration()
    playpause()
    play_song()


}
main()