$M = {
  time: 0,
  beats: 1, // beat # counting from start
  beat: 1, // beat # counting from start of measure
  f: 4.00, // smallest beat; 8.00 is an eigth of a second
  bpm: 100, // # of beats per minute
  measure: 16,
  frequency: [],
  tracks: [],
  currentSoundSample: 0,
  initialize: function(sampleRate) {
    this.start = new Date()
    this.sampleRate = sampleRate || 44100
    for (var i = 0;i<3;i++) {
      this.tracks.push(new AudioDataDestination(this.sampleRate, this.requestSoundData, i))
    }
    setInterval($M.draw,1000/$M.f)
  },
  draw: function() {
    $M.time = new Date() - $M.start
    $M.whole_note()
    $M.beats++
    $M.beat++
    if ($M.beat > $M.measure) {
      $M.beat = 1
    }
  },
  whole_note: function() {
    $M.score = $('#score').val().split('\n')
    for (var i = 0;i<this.tracks.length;i++) {
      $M.stop(i)
      if ($M.score[i]){
        key = $M.score[i].split('')[this.beat]
        note = $M.instrument[key]
        $('#key'+i).html(key)
        if (note != 0) $M.play(note,i)
      }
    }
  },
  play: function(f,i) {
    $M.currentSoundSample = 0
    $M.frequency[i] = f
  },
  stop: function(i) {
    $M.frequency[i] = 0
  },
  requestSoundData: function(soundData,wavetype,i) {
    if (!$M.frequency[i]) { 
      return; // no sound selected
    }
    var k = 2* Math.PI * $M.frequency[i] / $M.sampleRate;
    for (var i=0, size=soundData.length; i<size; i++) {
      if (wavetype == "sine") soundData[i] = Math.sin(k * $M.currentSoundSample++);
      else {
        if (Math.sin(k * $M.currentSoundSample++) > 0) soundData[i] = 1
        else soundData[i] = -1 
      }
    }        
  },
  instrument: {
    ' ': 0,
    a: 350,
    b: 250,
    c: 150,
    d: 50,
    e: 20,
    g: 400,
    s: 300,
  }
}
