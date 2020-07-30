const video = document.getElementById('gifRecord');

function getStreamAndRecord () { 

    navigator.mediaDevices.getUserMedia({
        audio: false,
        video: {
            height: { max: 480 },
            facingMode: "user"
        }
    })
    .then(function(stream) {
        console.log(stream)
        video.srcObject = stream;
        video.play()
    })
}
getStreamAndRecord();



function record() {
    let recorder = new RecordRTCPromisesHandler(getStreamAndRecord);
    recorder.startRecording();
    setTimeout(function () {
        recorder.stopRecording(function () {
            let blob = recorder.blob;
            var url = URL.createObjectURL(blob);
            video.src = url;
        })
    })

}

document.getElementById('captureBtn').addEventListener('click', record)