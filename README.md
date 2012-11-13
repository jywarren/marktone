##MARKTONE

Tone markup. Simple interface for generating tone sequences from a text string that you can modify in real-time.

Try it at http://jywarren.github.com/marktone

You can add your own "instrument" by overwriting $M.instrument like:

    instrument: {
      ' ': 0,
      a: 350,
      b: 250,
      g: 400,
      s: 300,
    }

Each value is a frequency, but it'd be nice to have more variability, like "ssp" should make an onomatopoeic sound.

Currently there are 16 tones to a line, but we could change that too. Just need some easy and strong conventions.

