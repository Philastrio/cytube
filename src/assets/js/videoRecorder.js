const recorderContainer = document.getElementById('jsRecordContainer');
const recordBtn = document.getElementById('jsRecordBtn');
const videoPreview = document.getElementById('jsVideoPreview');

let streamObject;
let videoRecoder;

const handleVideoData = (event) => {
  console.log(event.data);
}

const stopRecoding = () => {
  videoRecoder.stop();
  recordBtn.addEventListener('click', getVideo);
};

const startRecoding = () => {
  const videoRecorder = new MediaRecoder(streamObject);
  videoRecorder.start(1000);
  videoRecorder.addEventListener('dataavailable', handleVideoData);
  recordBtn.addEventListener('click', stopRecoding);
};



const getVideo = async () => {
  try {
    const stream = await navigator.mediaDevices.getUserMedia({
      audio: true,
      video: { width: 1280, height: 720 }
    });
    videoPreview.srcObject = stream;
    videoPreview.muted = true;
    videoPreview.play();
    recordBtn.innerHTML = 'Stop recoding';
    streamObject = stream;
    startRecoding();
  } catch (error) {
    recordBtn.innerHTML = '😥 Cant Record';
  } finally {
    recordBtn.removeEventListener('click', startRecoding);
  }
};

function init() {
  recordBtn.addEventListener('click', getVideo);
}

if (recorderContainer) {
  init();
};