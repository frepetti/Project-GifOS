


const video = document.getElementById('gifRecord');
const config = { type: 'video' };
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

//Open Crear Gif
document.getElementById('createGif').addEventListener('click',function () {
    document.getElementById('navBtns').classList.toggle('noDisplay');
    document.getElementById('navBtns').classList.toggle('displayFlex');
    document.getElementById('gifRecorder').classList.toggle('noDisplay');
    document.getElementById('gifRecorder').classList.toggle('displayFlex');
});

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

//Cancel Crear Gif
document.getElementById('cancelBtn').addEventListener('click',function () {
    document.getElementById('navBtns').classList.toggle('noDisplay');
    document.getElementById('navBtns').classList.toggle('displayFlex');
    document.getElementById('gifRecorder').classList.toggle('noDisplay');
    document.getElementById('gifRecorder').classList.toggle('displayFlex');

});

//Start Crear gif
document.getElementById('startBtn').addEventListener('click',function () {
    document.getElementById('recorderIntro').classList.toggle('display');
    document.getElementById('recorderIntro').classList.toggle('noDisplay');
    document.getElementById('recorder').classList.toggle('display');
    document.getElementById('recorder').classList.toggle('noDisplay');
    document.getElementById('recorderDisplay').classList.toggle('noDisplay');
    document.getElementById('recorderDisplay').classList.toggle('display');
    getStream();
});

let record = console.log('recording');
let stopRecording = console.log('Recording stopped');


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
document.getElementById('recordingBtn').addEventListener('click',record);
document.getElementById('stopBtn').addEventListener('click',record);
document.getElementById('recordingBtn').addEventListener('click',function () {
    document.getElementById('recorderLive').classList.toggle('displayFlex');
    document.getElementById('recorderLive').classList.toggle('noDisplay');
    document.getElementById('recorderPreview').classList.toggle('displayFlex');
    document.getElementById('recorderPreview').classList.toggle('noDisplay');
    document.getElementById('recorderTitle').innerHTML = 'Vista Previa';
});
document.getElementById('stopBtn').addEventListener('click',function () {
    document.getElementById('recorderLive').classList.toggle('displayFlex');
    document.getElementById('recorderLive').classList.toggle('noDisplay');
    document.getElementById('recorderPreview').classList.toggle('displayFlex');
    document.getElementById('recorderPreview').classList.toggle('noDisplay');
    document.getElementById('recorderTitle').innerHTML = 'Vista Previa';
});

//Repetir Captura
document.getElementById('repeatBtn').addEventListener('click',function () {
    document.getElementById('recorderPreview').classList.toggle('displayFlex');
    document.getElementById('recorderPreview').classList.toggle('noDisplay');
    document.getElementById('recorderPreCapture').classList.toggle('display');
    document.getElementById('recorderPreCapture').classList.toggle('noDisplay');
    document.getElementById('recorderTitle').innerHTML = 'Un Chequeo Antes de Empezar';
});

//Subir Guifo
document.getElementById('uploadBtn').addEventListener('click',uploadGif);
document.getElementById('uploadBtn').addEventListener('click',function () {
    document.getElementById('recorderDisplay').classList.toggle('display');
    document.getElementById('recorderDisplay').classList.toggle('noDisplay');
    document.getElementById('uploadDisplay').classList.toggle('displayFlex');
    document.getElementById('uploadDisplay').classList.toggle('noDisplay');
    document.getElementById('recorderPreview').classList.toggle('displayFlex');
    document.getElementById('recorderPreview').classList.toggle('noDisplay');
    document.getElementsByClassName('uploadingBtns')[0].classList.toggle('noDisplay');
    document.getElementsByClassName('uploadingBtns')[0].classList.toggle('displayFlex');
    document.getElementById('recorderTitle').innerHTML = 'Un Chequeo Antes de Empezar';
});

//Cancel upload

document.getElementById('cancelUpload').addEventListener('click',cancelUpload);
document.getElementById('cancelUpload').addEventListener('click',function () {
    document.getElementById('recorder').classList.toggle('display');
    document.getElementById('recorder').classList.toggle('noDisplay');
    document.getElementById('recorderIntro').classList.toggle('noDisplay');
    document.getElementById('recorderIntro').classList.toggle('display');
});

//Upload Gif

function uploadGif() {
    console.log('subiendo gif');
}

//Cancel upload

function cancelUpload() {
    console.log('Cancel upload')
}

//Capturar la camara
function getStream() { 
    navigator.mediaDevices.getUserMedia({
        audio: false,
        video: {
            height: {max: 480},
            facingMode: "user"
        }
    })
    .then(function(stream) {
        console.log(stream)
        video.srcObject = stream;
        video.play()
    })
}

/*
function record() {
    let recorder = RecordRTC(stream, config)
}
*/