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
        winner: 'team1'
      },
      {
        team1: 'hb',
        team2: 'mv',
        winner: 'team1'
      },
      {
        team1: 'rp',
        team2: 'he',
        winner: 'team1'
      },
      {
        team1: 'be',
        team2: 'bb',
        winner: 'team1'
      },
      {
        team1: 'nw',
        team2: 'ni',
        winner: 'team1'
      },
      {
        team1: 'sn',
        team2: 'by',
        winner: 'team1'
      },
      {
        team1: 'hh',
        team2: 'bw',
        winner: 'team1'
      },
      {
        team1: 'sl',
        team2: 'th',
        winner: 'team1'
      },
    ]
  },
  {
    title: 'Runde 2',
    matches: [
      {
        team1: 'sh',
        team2: 'st',
        winner: 'team1'
      },
      {
        team1: 'hb',
        team2: 'mv',
        winner: 'team1'
      },
      {
        team1: 'rp',
        team2: 'he',
        winner: 'team1'
      },
      {
        team1: 'be',
        team2: 'bb',
        winner: 'team1'
      },
    ]
  },
  {
    title: 'Halbfinale',
    matches: [
      {
        team1: 'sh',
        team2: 'st',
        winner: 'team1'
      },
      {
        team1: 'hb',
        team2: 'mv',
        winner: 'team1'
      },
    ]
  },
  {
    title: 'Finale',
    matches: [
      {
        team1: 'sh',
        team2: 'st',
        winner: 'team1'
      },
    ]
  },
]

function init () {
  const rootContainer = document.getElementById('tournament-visual')
  rootContainer.innerHTML = `
    <div class="tournament-bracket tournament-bracket--rounded">
      ${createRounds(rounds)}
    </div>
    `
}

function createRounds (rounds) {
  let result = ''
  for (let i = 0, l = rounds.length; i < l; i++) {
    result += createRound(rounds[i])
  }
  return result
}

function createRound (round) {
  return `
  <div class="tournament-bracket__round">
    <h3 class="tournament-bracket__round-title">${round.title}</h3>
    <ul class="tournament-bracket__list">
      ${createMatches(round.matches)}
    </ul>
  </div>
  `
}

function createMatches (matchesArr) {
  let result = ''
  for (let i = 0, l = matchesArr.length; i < l; i++) {
    result += createMatch(matchesArr[i])
  }
  return result
}

function createMatch (match) {
  const team1 = teams[match.team1]
  const team2 = teams[match.team2]

  return `
  <li class="tournament-bracket__item">
    <div class="tournament-bracket__match" tabindex="0">
      <table class="tournament-bracket__table">
        <tbody class="tournament-bracket__content">
          ${createTeam(match.team1, team1)}
          ${createTeam(match.team2, team2)}
        </tbody>
      </table>
    </div>
  </li>
  `
}

function createTeam (key, props) {
  return `
  <tr class="tournament-bracket__team">
    <td class="tournament-bracket__image"><img src="img/${props.img}"></td>
    <td><span class="tournament-bracket__name">${props.captain}</span>&nbsp;<span class="tournament-bracket__token" title="${props.state}">(${key})</span></td>
  </tr>
  `
}

function trimWhitespace (text) {

}

init()