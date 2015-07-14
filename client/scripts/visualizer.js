var v = {

    init: function(source, callback){
      v.ctx = new (window.AudioContext || window.webkitAudioContext)();

      v.analyser = v.ctx.createAnalyser(); //Do we have an order issue?

      v.analyser.fftSize = v.fCount;

      console.log('start loading song', source);
      var audio = new Audio();
      audio.src = source;
      audio.controls = true;
      audio.loop = true;
      audio.autoplay = true;
      console.log('end loading song', source);

      v.ctx.createMediaElementSource(audio).connect(v.analyser);
      v.analyser.connect(v.ctx.destination);
      v.play(callback);
    },

    data: {},

    fCount: 2048, // fCount / 2 -> Number of indexes in graph
    maxLevel: 256,

    getFData: function(){
      fData = new Uint8Array(v.analyser.frequencyBinCount);
      v.analyser.getByteFrequencyData(fData);
      return fData;
    },

    play: function(visualize){
      var data = v.getFData();
      //console.log(data);
      visualize(data);
      window.requestAnimationFrame(v.play.bind(this,visualize));
    }
  };
//});
