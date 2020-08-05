
const recorderTitle = document.getElementById('recorderTitle');
const uploadingBtns = document.getElementById('uploadingBtns');
const recorderPreview = document.getElementById('recorderPreview');
const uploadDisplay = document.getElementById('uploadDisplay');
const recorderDisplay = document.getElementById('recorderDisplay');
const uploadBtn = document.getElementById('uploadBtn');
const recordedGif = document.getElementById('recordedGif');
const myKey = "RoFq898LQn130ZY7iP2TBlrDuefnjvV0";

//Get navBtns display on opening window
window.onload = displayItems();

function displayItems() {
    let displayBtns = window.localStorage.getItem('displayBtns');
    let gifRecorder = window.localStorage.getItem('gifRecorder');
    document.getElementById('navBtns').className = displayBtns;
    document.getElementById('gifRecorder').className = gifRecorder;
    window.localStorage.removeItem('displayBtns');
    window.localStorage.removeItem('gifRecorder');
}

//Get theme on opening window
window.onload = loadTheme();

function loadTheme() {
    let theme = window.localStorage.getItem('theme');
    document.getElementById('theme').className = theme;
};

//Open Theme Menu

document.getElementById('buttonGrp').addEventListener('click',openMenu);

function openMenu() {
    let themeOp = document.getElementById("themeOp")
    themeOp.classList.toggle("display");
};

//Switch Theme

document.getElementById('light').addEventListener('click', setLight);
document.getElementById('dark').addEventListener('click', setDark);

function setLight() {
    document.getElementById('theme').className = 'light';
    //Save Theme
    let theme = document.getElementById('theme').className;
    window.localStorage.setItem('theme',theme);
    //Hide theme Dropdown
    document.getElementById('themeOp').classList.toggle('display');
}

function setDark() {
    document.getElementById('theme').className = 'dark';
    //Save Theme
    let theme = document.getElementById('theme').className;
    window.localStorage.setItem('theme',theme);
    //Hide theme Dropdown
    document.getElementById('themeOp').classList.toggle('display');
}

//Open Crear Gif
document.getElementById('createGif').addEventListener('click',function () {
    document.getElementById('navBtns').classList.toggle('noDisplay');
    document.getElementById('navBtns').classList.toggle('displayFlex');
    document.getElementById('gifRecorder').classList.toggle('noDisplay');
    document.getElementById('gifRecorder').classList.toggle('displayFlex');
});

//Cancel Crear Gif
document.getElementById('cancelBtn').addEventListener('click',function () {
    document.getElementById('navBtns').classList.toggle('noDisplay');
    document.getElementById('navBtns').classList.toggle('displayFlex');
    document.getElementById('gifRecorder').classList.toggle('noDisplay');
    document.getElementById('gifRecorder').classList.toggle('displayFlex');

});

//Start Crear gif

let myStream;

document.getElementById('startBtn').addEventListener('click',function () {
    document.getElementById('recorderIntro').classList.toggle('display');
    document.getElementById('recorderIntro').classList.toggle('noDisplay');
    document.getElementById('recorder').classList.toggle('display');
    document.getElementById('recorder').classList.toggle('noDisplay');
    document.getElementById('recorderDisplay').classList.toggle('noDisplay');
    document.getElementById('recorderDisplay').classList.toggle('display');
    document.getElementById('recorderPreCapture').classList.toggle('display');
    document.getElementById('recorderPreCapture').classList.toggle('noDisplay');
    getStream();
});

const video = document.getElementById('gifRecord');
const config = { type: 'gif' };

//Capture Stream

function getStream() { 
    navigator.mediaDevices.getUserMedia({
        audio: false,
        video: {
            height: {max: 720},
            facingMode: "user"
        }
    })
    .then(function(stream) {
        video.srcObject = stream;
        video.play();
        myStream = stream;
    });
};

//Record camera stream
let recorder;
function record() {
    recorder = RecordRTC(myStream, config);
    recorder.startRecording();
    return recorder;
};



//Begin Video recording
document.getElementById('captureCam').addEventListener('click',record);
document.getElementById('captureBtn').addEventListener('click',record);
document.getElementById('captureCam').addEventListener('click',function () {
    document.getElementById('recorderPreCapture').classList.toggle('display');
    document.getElementById('recorderPreCapture').classList.toggle('noDisplay');
    document.getElementById('recorderLive').classList.toggle('displayFlex');
    document.getElementById('recorderLive').classList.toggle('noDisplay');
    document.getElementById('recorderTitle').innerHTML = 'Capturando tu Guifo';
});
document.getElementById('captureBtn').addEventListener('click',function () {
    document.getElementById('recorderPreCapture').classList.toggle('display');
    document.getElementById('recorderPreCapture').classList.toggle('noDisplay');
    document.getElementById('recorderLive').classList.toggle('displayFlex');
    document.getElementById('recorderLive').classList.toggle('noDisplay');
    document.getElementById('recorderTitle').innerHTML = 'Capturando tu Guifo';
});

//Stop Recording
document.getElementById('recordingBtn').addEventListener('click',stopRecord);
document.getElementById('stopBtn').addEventListener('click',stopRecord);
document.getElementById('recordingBtn').addEventListener('click',function () {
    document.getElementById('recorderLive').classList.toggle('displayFlex');
    document.getElementById('recorderLive').classList.toggle('noDisplay');
    recorderPreview.classList.toggle('displayFlex');
    recorderPreview.classList.toggle('noDisplay');
    document.getElementById('recorderTitle').innerHTML = 'Vista Previa';
});
document.getElementById('stopBtn').addEventListener('click',function () {
    document.getElementById('recorderLive').classList.toggle('displayFlex');
    document.getElementById('recorderLive').classList.toggle('noDisplay');
    recorderPreview.classList.toggle('displayFlex');
    recorderPreview.classList.toggle('noDisplay');
    document.getElementById('recorderTitle').innerHTML = 'Vista Previa';
});

//Stop Recording Function
function stopRecord() {
    recorder.stopRecording(processRecording);
    myStream.getTracks().forEach(function(track) {
        track.stop();//Stop the Camera
        });
    video.classList.add('noDisplay')
    document.getElementById('recordedGif').classList.toggle('noDisplay');
    document.getElementById('recordedGif').classList.toggle('display')
};

//Process data and display preview

function processRecording() {
    let form = new FormData();
    let blob = recorder.getBlob();
    form.append('file', blob, 'miGif.gif');
    console.log(form.get('file'));
    console.log(blob);
    document.getElementById('recordedGif').src = URL.createObjectURL(blob);
}


//Repetir Captura

document.getElementById('repeatBtn').addEventListener('click',function () {
    recorderPreview.classList.toggle('displayFlex');
    recorderPreview.classList.toggle('noDisplay');
    document.getElementById('recorderPreCapture').classList.toggle('display');
    document.getElementById('recorderPreCapture').classList.toggle('noDisplay');
    document.getElementById('recorderTitle').innerHTML = 'Un Chequeo Antes de Empezar';
    recordedGif.classList.toggle('noDisplay');
    recordedGif.classList.toggle('display');
    video.classList.remove('noDisplay');
    getStream();
});

//Upload Guifo

document.getElementById('uploadBtn').addEventListener('click',uploadGif);
document.getElementById('uploadBtn').addEventListener('click',function () {
    recorderDisplay.classList.toggle('display');
    recorderDisplay.classList.toggle('noDisplay');
    uploadDisplay.classList.toggle('displayFlex');
    uploadDisplay.classList.toggle('noDisplay');
    recorderPreview.classList.toggle('displayFlex');
    recorderPreview.classList.toggle('noDisplay');
    uploadingBtns.classList.toggle('noDisplay');
    uploadingBtns.classList.toggle('displayFlex');
    recorderTitle.innerHTML = 'Un Chequeo Antes de Empezar';
});

//Upload Gif

let createdGifURL;
function uploadGif() {
    let form = new FormData();
    form.append('file', recorder.getBlob(), 'Fgif.gif');
    fetch('https://upload.giphy.com/v1/gifs?&api_key='+ myKey, {
        method: 'POST',
        body: form,
    })

    .then((response)=> {
        return response.json()
    })

    .then((myJson) => {
        let gifId = myJson.data.id;
        fetch('https://api.giphy.com/v1/gifs/' + gifId + '?&api_key=' + myKey)

        .then((res) => {
            return res.json()
        })
        
        .then((json) => {
            let id = json.data.id;
            let gifData = JSON.stringify(json);
            console.log(id);
            console.log(gifData);
            localStorage.setItem(id, gifData);
            createdGifURL = json.data.images.original.url;
        });
    })

    .catch((error) => {
        console.error(error);
    });

    console.log(createdGifURL);
    return createdGifURL;
}



//Cancel upload

document.getElementById('cancelUpload').addEventListener('click',cancelUpload);
document.getElementById('cancelUpload').addEventListener('click',function () {
    document.getElementById('recorder').classList.toggle('display');
    document.getElementById('recorder').classList.toggle('noDisplay');
    document.getElementById('recorderIntro').classList.toggle('noDisplay');
    document.getElementById('recorderIntro').classList.toggle('display');
    document.getElementById('uploadDisplay').classList.toggle('displayFlex');
    document.getElementById('uploadDisplay').classList.toggle('noDisplay');
    document.getElementsByClassName('uploadingBtns')[0].classList.toggle('noDisplay');
    document.getElementsByClassName('uploadingBtns')[0].classList.toggle('displayFlex');
});



//Cancel upload

function cancelUpload() {
    console.log('Cancel upload')
}

