class DrumKit{
    constructor(){
        this.pads = document.querySelectorAll(".pad");
        this.playBtn = document.querySelector(".play");
        this.kickAudio = document.querySelector(".kick-sound");
        this.snareAudio = document.querySelector(".snare-sound");
        this.hihatAudio = document.querySelector(".hihat-sound");
        this.index = 0;
        this.bpm = 150;
        this.isPlaying = null;
        this.muteBtns = document.querySelectorAll(".mute");
        this.tempoSlider = document.querySelector(".tempo-slider");
    }

    activePad() {
        this.classList.toggle("active");
    }

    repeat(){
        let step = this.index % 8;
        const activeBars = document.querySelectorAll(`.b${step}`);
        // Loop over the pads
        activeBars.forEach(bar => {
            bar.style.animation = `playTrack 0.3s alternate ease-in-out 2`;
            // Check if pods are active
            if(bar.classList.contains("active")){
                // Check each sound
                if(bar.classList.contains("kick-pad")){
                    this.kickAudio.currentTime = 0;
                    this.kickAudio.play();
                }

                if(bar.classList.contains("snare-pad")){
                    this.snareAudio.currentTime = 0;
                    this.snareAudio.play();
                }

                if(bar.classList.contains("hihat-pad")){
                    this.hihatAudio.currentTime = 0;
                    this.hihatAudio.play();
                }
            }
        });
        this.index++;
    }
    start(){
        const interval = (60/this.bpm) * 1000;
        // Check if it's playing
        if(!this.isPlaying) {
        this.isPlaying = setInterval(() => {
            this.repeat();
        }, interval);
      } else{
        // Clear the interbal
        clearInterval(this.isPlaying);
        this.isPlaying = null;

      }
    }
    updateBtn(){
        if(!this.isPlaying){
            this.playBtn.innerText = "Stop";
            this.playBtn.classList.add("active");
        } else{
            this.playBtn.innerText = "Play";
            this.playBtn.classList.remove("active");
        }
    }

    mute(e){
        const muteIndex = e.target.getAttribute("data-track");
        e.target.classList.toggle("active");
        if(e.target.classList.contains("active")){
            switch(muteIndex){
                case "0":
                this.kickAudio.volume = 0;
                break;
    
                case "1":
                this.snareAudio.volume = 0;
                break;
    
                case "2":
                this.hihatAudio.volume = 0;
                break;
            }
        } else{
            switch(muteIndex){
                case "0":
                    this.kickAudio.volume = 1;
                    break;
    
                    case "1":
                    this.snareAudio.volume = 1;
                    break;
    
                    case "2":
                    this.hihatAudio.volume = 1;
                    break;
            }
        }
    }
    changeTempo(e){
        const tempoText = document.querySelector(".tempo-nr");
        this.bpm = e.target.value;
        tempoText.innerText = e.target.value;
    }
    updateTempo(e){
        clearInterval(this.isPlaying);
        this.isPlaying = null;
        const playBtn = document.querySelector(".play");
        if(playBtn.classList.contains("active")){
            this.start();
        }
    }
}





const drumKit = new DrumKit();

drumKit.pads.forEach(pad => {
    pad.addEventListener("click", drumKit.activePad);
    pad.addEventListener("animationend", function(){
        this.style.animation = "";
    });
});

drumKit.playBtn.addEventListener("click", function() {
    drumKit.updateBtn();
    drumKit.start();
});
drumKit.muteBtns.forEach(btn => {
    btn.addEventListener("click", function(e){
        drumKit.mute(e);
    });
});

drumKit.tempoSlider.addEventListener("input", function(e){
    drumKit.changeTempo(e);
});

drumKit.tempoSlider.addEventListener("change", function(e){
    drumKit.updateTempo(e);
});




