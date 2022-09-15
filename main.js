Webcam.set({
    width: 350,
    height:300,
    image_format: 'png',
    png_quality: 90
});

camera = document.getElementById("camera");
Webcam.attach("#camera");

function take_snapshot()
{
    Webcam.snap(function(data_uri) {
        document.getElementById("result").innerHTML = '<img id="captured_image" src="'+data_uri+'"/>';
    });
}

console.log('ml5 version:', ml5.version);

classifier = ml5.imageClassifier('https://teachablemachine.withgoogle.com/models/izCRA-cf0/model.json',modelLoaded);

  function modelLoaded() {
    console.log('Model Loaded!');
  }

  function check()
  {
    img = document.getElementById('captured_image');
    classifier.classify(img, gotResult);
  }

  function gotResult(error, results){
if(error){
  console.error(error);
}
else{
  document.getElementById("result_emotion_name1").innerHTML = results[0].label;
  prediction = results[0].label;
  speak();

    if(results[0].label == "beautiful")
    {
	    document.getElementById("update_emoji1").innerHTML = "&#128076;";
    }

    else if(results[0].label == "peace")
    {
	    document.getElementById("update_emoji1").innerHTML = "&#9996;";
    }

    else if(results[0].label == "thumbs up")
    {
	    document.getElementById("update_emoji1").innerHTML = "&#128077;";
    }
  }
}

function speak(){
  var synth = window.speechSynthesis;
  var speak_data = "The prediction is " + prediction;
  var utterThis = new SpeechSynthesisUtterance(speak_data);
  synth.speak(utterThis);
}