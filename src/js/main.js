const teams = {
  bw: {
    captain: {
      firstName: 'Winfried',
      lastName: 'Kretschmann'
    },
    state: 'Baden-Württemberg',
    img: 'kretschmann.png'
  },
  by: {
    captain: {
      firstName: 'Markus',
      lastName: 'Söder'
    },
    state: 'Bayern',
    img: 'soeder.png'
  },
  be: {
    captain: {
      firstName: 'Michael',
      lastName: 'Müller'
    },
    state: 'Berlin',
    img: 'mueller.png'
  },
  bb: {
    captain: {
      firstName: 'Dietmar',
      lastName: 'Woidke'
    },
    state: 'Brandenburg',
    img: 'woidke.png'
  },
  hb: {
    captain: {
      firstName: 'Andreas',
      lastName: 'Bovenschulte'
    },
    state: 'Bremen',
    img: 'bovenschulte.png'
  },
  hh: {
    captain: {
      firstName: 'Peter',
      lastName: 'Tschentscher'
    },
    state: 'Hamburg',
    img: 'tschentscher.png'
  },
  he: {
    captain: {
      firstName: 'Volker',
      lastName: 'Bouffier'
    },
    state: 'Hessen',
    img: 'bouffier.png'
  },
  mv: {
    captain: {
      firstName: 'Manuela',
      lastName: 'Schwesig'
    },
    state: 'Mecklenburg-Vorpommern',
    img: 'schwesig.png'
  },
  ni: {
    captain: {
      firstName: 'Stephan',
      lastName: 'Weil'
    },
    state: 'Niedersachsen',
    img: 'weil.png'
  },
  nw: {
    captain: {
      firstName: 'Armin',
      lastName: 'Laschet'
    },
    state: 'Nordrhein-Westfalen',
    img: 'laschet.png'
  },
  rp: {
    captain: {
      firstName: 'Malu',
      lastName: 'Dreyer'
    },
    state: 'Rheinland-Pfalz',
    img: 'dreyer.png'
  },
  sl: {
    captain: {
      firstName: 'Tobias',
      lastName: 'Hans'
    },
    state: 'Saarland',
    img: 'hans.png'
  },
  sn: {
    captain: {
      firstName: 'Michael',
      lastName: 'Kretschmer'
    },
    state: 'Sachsen',
    img: 'kretschmer.png'
  },
  st: {
    captain: {
      firstName: 'Reiner',
      lastName: 'Haseloff'
    },
    state: 'Sachsen-Anhalt',
    img: 'haseloff.png'
  },
  sh: {
    captain: {
      firstName: 'Daniel',
      lastName: 'Günther'
    },
    state: 'Schleswig-Holstein',
    img: 'guenther.png'
  },
  th: {
    captain: {
      firstName: 'Bodo',
      lastName: 'Ramelow'
    },
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
        winner: null
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
          ${createTeam(match.team1, team1, match.winner === 'team1')}
          ${createTeam(match.team2, team2, match.winner === 'team2')}
        </tbody>
      </table>
    </div>
  </li>
  `
}

function createTeam (key, props, isWinner) {
  const title = `${props.captain.firstName} ${props.captain.lastName} (${props.state})`
  return `
  <tr class="tournament-bracket__team">
    <td class="tournament-bracket__image" title="${title}"><img src="img/${props.img}"></td>
    <td class="tournament-bracket__name" title="${title}">
      <span class="tournament-bracket__firstname">${props.captain.firstName.charAt(0)}.</span><span class="tournament-bracket__lastname">${props.captain.lastName}</span>&nbsp;<span class="tournament-bracket__token" title="${props.state}">(${key})</span>
    </td>
    <td class="tournament-bracket__result" title="Gewinner">${isWinner ? '🏆️&nbsp;' : ''}</td>
    <td class="tournament-bracket__tip">
      <a href=""><i class="fa fa-star-o" aria-hidden="true"></i></a>
    </td>
  </tr>
  `
}

function trimWhitespace (text) {

}

init()