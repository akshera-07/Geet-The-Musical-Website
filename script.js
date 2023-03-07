console.log("Welcome to Spotify")

// Initialize the Variables
let songIndex = 0;
let audioElement = new Audio('song/1.mp3');
let masterPlay = document.getElementById('masterPlay');
let myProgressBar = document.getElementById('myProgressBar');
let gif = document.getElementById('gif');
let masterSongName = document.getElementById('masterSongName');
let songItems = Array.from(document.getElementsByClassName('songItem'));
let songs = [
    {songName: "Bloody Marry", filePath: "song/1.mp3", coverPath: "covers/cover1.jpg"},
    {songName: "Unholy", filePath: "song/2.mp3", coverPath: "covers/cover2.jpg"},
    {songName: "Believer", filePath: "song/3.mp3", coverPath: "covers/cover3.jpg"},
    {songName: "Rockabye", filePath: "song/4.mp3", coverPath: "covers/cover4.jpg"},
    {songName: "Shape of you", filePath: "song/5.mp3", coverPath: "covers/cover5.jpg"},
    {songName: "We don't talk anymore", filePath: "song/6.mp3", coverPath: "covers/cover6.jpg"},
    {songName: "Brown Rang", filePath: "song/7.mp3", coverPath: "covers/cover7.jpg"},
    {songName: "Dope Shope", filePath: "song/8.mp3", coverPath: "covers/cover8.jpg"},
    {songName: "Gatividhi", filePath: "song/9.mp3", coverPath: "covers/cover9.jpg"},
    {songName: "Tum se hi", filePath: "song/10.mp3", coverPath: "covers/cover10.jpg"},
]

songItems.forEach((element, i)=>{
    element.getElementsByTagName("img")[0].src= songs[i].coverPath;
    element.getElementsByClassName("songName")[0].innerText = songs[i].songName;

})

//audioElement.play();

// Handle play/pause click
masterPlay.addEventListener('click',()=>{
    if(audioElement.paused || audioElement.currentTime<=0){
      audioElement.play();  
      masterPlay.classList.remove('fa-play-circle');
      masterPlay.classList.add('fa-pause-circle');
      gif.style.opacity = 1;
    }
    else{
      audioElement.pause();  
      masterPlay.classList.remove('fa-pause-circle');
      masterPlay.classList.add('fa-play-circle');
      gif.style.opacity = 0;
    }
})
// Listen to Events
audioElement.addEventListener('timeupdate',()=>{
    // Update Seekbar
    progress = parseInt((audioElement.currentTime/audioElement.duration)*100);
    myProgressBar.value = progress;
})

myProgressBar.addEventListener('change', ()=>{
   audioElement.currentTime = myProgressBar.value * audioElement.duration/100;
})

const makeAllPlays = ()=>{
    Array.from(document.getElementsByClassName('songItemPlay')).forEach((element)=>{
        element.classList.remove('fa-pause-circle');
        element.classList.add('fa-play-circle');
    })
}

Array.from(document.getElementsByClassName('songItemPlay')).forEach((element)=>{
    element.addEventListener('click', (e)=>{
        makeAllPlays();
        songIndex = parseInt(e.target.id);
        e.target.classList.remove('fa-play-circle');
        e.target.classList.add('fa-pause-circle');
        audioElement.src = `song/${songIndex}.mp3`;
        masterSongName.innerText = songs[songIndex-1].songName;
        audioElement.currentTime = 0;
        audioElement.play();
        gif.style.opacity = 1;
        masterPlay.classList.remove('fa-play-circle');
        masterPlay.classList.add('fa-pause-circle');
    })
})

document.getElementById('next').addEventListener('click', ()=>{
    if(songIndex>=10){
        songIndex = 1;
    }
    else{
    songIndex +=1;
    }
    audioElement.src = `song/${songIndex}.mp3`;
    masterSongName.innerText = songs[songIndex-1].songName;
    audioElement.currentTime = 0;
    audioElement.play();
    masterPlay.classList.remove('fa-play-circle');
    masterPlay.classList.add('fa-pause-circle');
})

document.getElementById('previous').addEventListener('click', ()=>{
    if(songIndex<=1){
        songIndex = 1;
    }
    else{
    songIndex -=1;
    }
    audioElement.src = `song/${songIndex}.mp3`;
    masterSongName.innerText = songs[songIndex-1].songName;
    audioElement.currentTime = 0;
    audioElement.play();
    masterPlay.classList.remove('fa-play-circle');
    masterPlay.classList.add('fa-pause-circle');
})