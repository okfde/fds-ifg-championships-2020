(function(){

  const rounds = [
    {
      title: 'Runde 1',
      matches: [
        {
          number: 1,
          team1: 'sh',
          team2: 'st',
          // winner: ''
        },
        {
          number: 2,
          team1: 'hb',
          team2: 'mv',
          // winner: ''
        },
        {
          number: 3,
          team1: 'rp',
          team2: 'he',
          // winner: ''
        },
        {
          number: 4,
          team1: 'be',
          team2: 'bb',
          // winner: ''
        },
        {
          number: 5,
          team1: 'nw',
          team2: 'ni',
          // winner: ''
        },
        {
          number: 6,
          team1: 'sn',
          team2: 'by',
          // winner: ''
        },
        {
          number: 7,
          team1: 'hh',
          team2: 'bw',
          // winner: ''
        },
        {
          number: 8,
          team1: 'sl',
          team2: 'th',
          // winner: ''
        },
      ]
    },
    {
      title: 'Runde 2',
      matches: [
        // {
        //   number: 9,
        //   team1: '',
        //   team2: '',
        //   winner: ''
        // },
        // {
        //   number: 10,
        //   team1: '',
        //   team2: '',
        //   winner: ''
        // },
        // {
        //   number: 11,
        //   team1: '',
        //   team2: '',
        //   winner: ''
        // },
        // {
        //   number: 12,
        //   team1: '',
        //   team2: '',
        //   winner: ''
        // },
      ]
    },
    {
      title: 'Halbfinale',
      matches: [
        // {
        //   number: 13,
        //   team1: '',
        //   team2: '',
        //   winner: ''
        // },
        // {
        //   number: 14,
        //   team1: '',
        //   team2: '',
        //   winner: ''
        // },
      ]
    },
    {
      title: 'Finale',
      matches: [
        // {
        //   number: 15,
        //   team1: '',
        //   team2: '',
        //   winner: ''
        // },
      ]
    },
  ]

  const betURL = '/tippspiel/'
  const betPrefix = 'fds_meisterschaften_2020_'

  function getBet(callback, data) {
    var request = new XMLHttpRequest();
    request.open(data ? 'POST' : 'GET', betURL, true);
    if (data) {
      request.setRequestHeader('Content-Type', 'application/x-www-form-urlencoded; charset=UTF-8');
      request.setRequestHeader('X-CSRFToken', document.querySelector('[name=csrfmiddlewaretoken]').value)
    }
    request.setRequestHeader("X-Requested-With", "XMLHttpRequest");
    request.onload = function() {
      if (this.status >= 200 && this.status < 400) {
        // Success!
        var data = JSON.parse(this.response);
        callback(data)
      } else {
        // We reached our target server, but it returned an error
        window.alert('Error')
      }
    };
    request.onerror = function() {
      window.alert('Error')
    };
    request.send(data);
  }

  var imagePath = "img/"
  var loggedIn = false
  var userBets = {}
  var loading = false
  var minBettableMatchNumber = 1

  rounds.forEach(r => {
    if (r.matches.length > 0) {
      minBettableMatchNumber = r.matches[0].number
    }
  })

  function init () {
    const pathHelperImage = document.getElementById('path-helper')
    imagePath = pathHelperImage.src.replace('1x1.png', '')
    loggedIn = document.getElementById('userDropdownMenu') !== null

    if (!loggedIn) {
      createTournament()
    } else {
      getBet(function (data) {
        userBets = data.user || {}
        createTournament()
      })
    }
  }

  function placeBet (e) {
    e.preventDefault()
    const el = this
    const team = el.dataset.team
    const matchNumber = el.dataset.match

    if (!loggedIn) {
      window.alert("Sie müssen eingeloggt sein, um am Tippspiel teilzunehmen.")
      return
    }
    if (loading) {
      window.alert("Ihre letzte Aktion wird noch verarbeitet.")
      return
    }

    userBets[betPrefix + matchNumber] = team
    loading = true
    renderBetByMatch(matchNumber, true)

    getBet(function (data) {
      userBets = data.user || {}
      loading = false
      renderBetByMatch(matchNumber, false)
    }, `match=${matchNumber}&bet=${team}`)

  }


  function createTournament () {
    rootContainer.innerHTML =`
      <div class="tournament-bracket tournament-bracket--rounded">
        ${createRounds(rounds)}
      </div>
      `
    const betStars = rootContainer.querySelectorAll('.tournament-bracket__tip a')
    Array.from(betStars).forEach((betStar) => {
      betStar.addEventListener('click', placeBet)
    })
  }

  function createRounds (rounds) {
    let result = ''
    for (let i = 0, l = rounds.length; i < l; i++) {
      result += createRound(rounds[i], i + 1)
    }
    return result
  }

  function createRound (round) {
    return `
    <div class="tournament-bracket__round">
      <h3 class="tournament-bracket__round-title">${round.title}</h3>
      ${round.matches && round.matches.length > 0 ? `
      <ul class="tournament-bracket__list">
        ${createMatches(round.matches)}
      </ul>
      ` : ''}
    </div>
    `
  }

  function createMatches (matchesArr) {
    let result = []
    for (let i = 0, l = matchesArr.length; i < l; i++) {
      result.push(createMatch(matchesArr[i]))
    }
    return result.join('')
  }

  function createMatch (match) {
    const team1 = teams[match.team1]
    const team2 = teams[match.team2]

    return `
    <li class="tournament-bracket__item">
      <div class="tournament-bracket__match" tabindex="0">
        <table class="tournament-bracket__table">
          <tbody class="tournament-bracket__content">
            ${createTeam(match.team1, team1, match.winner === 'team1', match.number)}
            ${createTeam(match.team2, team2, match.winner === 'team2', match.number)}
          </tbody>
        </table>
      </div>
    </li>
    `
  }

  function createTeam (key, props, isWinner, matchNumber) {
    const title = `${props.captain.firstName} ${props.captain.lastName} (${props.state})`
    return `
    <tr class="tournament-bracket__team">
      <td class="tournament-bracket__image" title="${title}"><img src="${imagePath}${props.img}"></td>
      <td class="tournament-bracket__label" title="${title}">
        <span class="tournament-bracket__name">${props.captain.firstName.charAt(0)}. ${props.captain.lastName}</span>&nbsp;<span class="tournament-bracket__token" title="${props.state}">(${key})</span>
      </td>
      <td class="tournament-bracket__result" title="Gewinner">${isWinner ? '🏆️&nbsp;' : ''}</td>
      <td class="tournament-bracket__tip">
        ${ matchNumber >= minBettableMatchNumber ?
          `<a href="#" data-team="${key}" data-match="${matchNumber}">${renderBet(key, matchNumber, true)}</a>` :
          renderBet(key, matchNumber, false)
        }
      </td>
    </tr>
    `
  }

  function renderBetByMatch (matchNumber, loading) {
    const betStars = rootContainer.querySelectorAll(`.tournament-bracket__tip a[data-match="${matchNumber}"]`)
    Array.from(betStars).forEach((betStar) => {
      if (loading) {
        betStar.innerHTML = `<i class="fa fa-spinner" aria-hidden="true"></i>`
      } else {
        betStar.innerHTML = renderBet(betStar.dataset.team, matchNumber, true)
      }
    })
  }

  function renderBet (team, matchNumber, bettable) {
    if (userBets) {
      const betted = userBets[betPrefix + matchNumber] === team
      if (betted) {
        return `<i class="fa fa-star" aria-hidden="true"></i>`
      }
    }
    if (bettable) {
      return `<i class="fa fa-star-o" aria-hidden="true"></i>`
    }
    return ``
  }

  const rootContainer = document.getElementById('tournament-visual')
  init();

}())