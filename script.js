
console.log("JavaScript")
 let currentSong =  new Audio();  // This is the global variable

// This function will bring the songs from the server because we are not using backend here
async function getSongs() {
    let a = await fetch("http://127.0.0.1:3002/songs/")
    // a.text() reads whatever text your server sends back from the url
    let response = await a.text()
    let div = document.createElement("div")
    div.innerHTML = response
    let as = div.getElementsByTagName("a")

    let songs = []
    for (let i = 0; i < as.length; i++) {
        const element = as[i]; //grabs the array(as) items
        if (element.href.endsWith(".mp3")) {
            // songs.push(element.href)
            songs.push(element.href.split("songs")[1])  // split remove all the part before the songs
        }
    }
    return (songs)
}

// Making function for playing music
const playMusic = (track) =>{
    // let audio = new Audio("/songs/" + track)
    currentSong.src = "/songs/" + track
    currentSong.play()
}

// again we need to make aync function because the above function return promise
async function main() {
    // get the list of all the songs
    let songs = await getSongs()

    // putting songname inside the ul li of html
    let songUL = document.querySelector(".songList").getElementsByTagName("ul")[0]
    for (const song of songs) {
        let decoded = decodeURIComponent(song).replace(/^\\/, " ")  // decode the URL encoded format and replace / after decoding it
        songUL.innerHTML = songUL.innerHTML + `<li> 
                    <img src="music.svg" alt="">
                    <div class="info">
                        <div>${decoded}</div>
                    </div>
                    <div class="playnow">
                        <span>Play Now</span>
                        <img class="playbtn" src="playbtn.svg" alt="">
                    </div> </li>`
    }

    // play the first song
    // var audio = new Audio(songs[0])
    // audio.play() 

    // Attach an event listner to each song
    Array.from(document.querySelector(".songList").getElementsByTagName("li")).forEach(e => {
        e.addEventListener("click", () =>{
            console.log(e.querySelector(".info").firstElementChild.innerHTML)
            playMusic(e.querySelector(".info").firstElementChild.innerHTML.trim())  // trim will remove additional spaces as it will appear later
           
        })
            
        })
}

main()


