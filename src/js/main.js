function createElement (tagname, opts) {
  var el = document.createElement(tagname)

  // add classes
  if (Array.isArray(opts.classes)) {
    var classIdx = opts.classes.length
    while (classIdx--) {
      el.classList.add(opts.classes[classIdx])
    }
  }

  // inner text
  if (typeof opts.text === 'string') {
    el.textContent = opts.text
  }

  // inner html
  if (typeof opts.html === 'string') {
    el.innerHTML = opts.html
  }

  // attributes
  if (opts.attrs) {
    var keys = Object.keys(opts.attrs)
    for (var i = 0, l = keys.length; i < l; i++) {
      var k = keys[i]
      el.setAttribute(k, opts.attrs[k])
    }
  }

  // return a string
  if (opts.returnString && opts.returnString === true) {
    if (typeof el.outerHTML !== 'undefined') {
      return el.outerHTML
    } else {
      // polyfill
      var div = document.createElement('div')
      div.appendChild(el.cloneNode(true))
      return div.innerHTML
    }
  }

  return el
}



const teams = {
  bw: {
    captain: 'Winfried Kretschmann',
    state: 'Baden-Württemberg',
    img: 'kretschmann.png'
  },
  by: {
    captain: 'Markus Söder',
    state: 'Bayern',
    img: 'soeder.png'
  },
  be: {
    captain: 'Michael Müller',
    state: 'Berlin',
    img: 'mueller.png'
  },
  bb: {
    captain: 'Dietmar Woidke',
    state: 'Brandenburg',
    img: 'woidke.png'
  },
  hb: {
    captain: 'Andreas Bovenschulte',
    state: 'Bremen',
    img: 'bovenschulte.png'
  },
  hh: {
    captain: 'Peter Tschentscher',
    state: 'Hamburg',
    img: 'tschentscher.png'
  },
  he: {
    captain: 'Volker Bouffier',
    state: 'Hessen',
    img: 'bouffier.png'
  },
  mv: {
    captain: 'Manuela Schwesig',
    state: 'Mecklenburg-Vorpommern',
    img: 'schwesig.png'
  },
  ni: {
    captain: 'Stephan Weil',
    state: 'Niedersachsen',
    img: 'weil.png'
  },
  nw: {
    captain: 'Armin Laschet',
    state: 'Nordrhein-Westfalen',
    img: 'laschet.png'
  },
  rp: {
    captain: 'Malu Dreyer',
    state: 'Rheinland-Pfalz',
    img: 'dreyer.png'
  },
  sl: {
    captain: 'Tobias Hans',
    state: 'Saarland',
    img: 'hans.png'
  },
  sn: {
    captain: 'Michael Kretschmer',
    state: 'Sachsen',
    img: 'kretschmer.png'
  },
  st: {
    captain: 'Reiner Haseloff',
    state: 'Sachsen-Anhalt',
    img: 'haseloff.png'
  },
  sh: {
    captain: 'Daniel Günther',
    state: 'Schleswig-Holstein',
    img: 'guenther.png'
  },
  th: {
    captain: 'Bodo Ramelow',
    state: 'Thüringen',
    img: 'ramelow.png'
  },
}

const rounds = [
  {
    title: 'Runde 1',
    matches: [
      {
        team1: 'sh',
        team2: 'st',
        winner: 'st'
      },
      {
        team1: 'hb',
        team2: 'mv',
        winner: 'mv'
      },
      {
        team1: 'rp',
        team2: 'he',
        winner: 'he'
      },
      {
        team1: 'be',
        team2: 'bb',
        winner: 'bb'
      },
      {
        team1: 'nw',
        team2: 'ni',
        winner: 'ni'
      },
      {
        team1: 'sn',
        team2: 'by',
        winner: 'by'
      },
      {
        team1: 'hh',
        team2: 'bw',
        winner: 'bw'
      },
      {
        team1: 'sl',
        team2: 'th',
        winner: 'th'
      },
    ]
  },
  // {
  //   title: 'Runde 2',
  //   matches: [

  //   ]
  // },
  // {
  //   title: 'Runde Halbfinale',
  //   matches: [

  //   ]
  // },
  // {
  //   title: 'Finale',
  //   matches: [

  //   ]
  // },
]

function init () {
  const rootContainer = document.getElementById('tournament-visual')

}