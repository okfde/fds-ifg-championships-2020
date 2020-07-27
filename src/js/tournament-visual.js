(function(){

  const rounds = [
    {
      title: 'Runde 1',
      matches: [
        {
          number: 1,
          team1: 'sh',
          team2: 'st',
          request1: '188777',
          request2: '188791',
          winner: 'sh'
        },
        {
          number: 2,
          team1: 'hb',
          team2: 'mv',
          request1: '188785',
          request2: '188790',
          winner: 'hb'
        },
        {
          number: 3,
          team1: 'rp',
          team2: 'he',
          request1: '188789',
          request2: '188782',          
          winner: 'he'
        },
        {
          number: 4,
          team1: 'be',
          team2: 'bb',
          request1: '188779',
          request2: '188787',
          winner: 'bb'
        },
        {
          number: 5,
          team1: 'nw',
          team2: 'ni',
          request1: '188788',
          request2: '188783',
          winner: 'ni'
        },
        {
          number: 6,
          team1: 'sn',
          team2: 'by',
          request1: '188784',
          request2: '188780',
          winner: 'sn'
        },
        {
          number: 7,
          team1: 'hh',
          team2: 'bw',
          request1: '188786',
          request2: '188792',
          winner: 'hh'
        },
        {
          number: 8,
          team1: 'sl',
          team2: 'th',
          request1: '188781',
          request2: '188793',
          winner: 'sl'
        },
      ]
    },
    {
      title: 'Runde 2',
      matches: [
        {
          number: 9,
          team1: 'sh',
          team2: 'hb',
          winner: 'sh'
        },
        {
          number: 10,
          team1: 'he',
          team2: 'bb',
          winner: ''
        },
        {
          number: 11,
          team1: 'ni',
          team2: 'sn',
          winner: ''
        },
        {
          number: 12,
          team1: 'hh',
          team2: 'sl',
          winner: ''
        },
      ]
    },
    {
      title: 'Halbfinale',
      matches: [
        {
          number: 13,
          team1: 'sh',
          team2: '',
          winner: ''
        },
        {
          number: 14,
          team1: '',
          team2: '',
          winner: ''
        },
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

  var imagePath = "img/"
  var loggedIn = false
  var namePlaceholder = ''
  var userBets = {}
  var loading = false
  var minBettableMatchNumber = 9
  var bettingDeadline = new Date(1595412000 * 1000) // Wed, 22 Jul 12:00 UTC + 2

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

  function init () {
    const pathHelperImage = document.getElementById('path-helper')
    imagePath = pathHelperImage.src.replace('1x1.png', '')
    loggedIn = document.getElementById('userDropdownMenu') !== null
    if (loggedIn) {
      namePlaceholder = document.querySelector('#userDropdownMenu span').textContent
    }

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
    const now = new Date()
    if (bettingDeadline && bettingDeadline < now) {
      window.alert("Die aktuelle Tipp-Spiel-Runde ist abgelaufen!")
      return
    }

    if (!userBets[betPrefix + "name"]) {
      let name = window.prompt("Unter welchem Namen möchten Sie in der Tipp-Tabelle erscheinen? Durch die Eingabe stimmen Sie unseren Teilnahmebedingungen zu.", namePlaceholder);
      if (name === null) {
        return
      }
      userBets[betPrefix + "name"] = name.substr(0, 50)
    }
    if (loading) {
      window.alert("Ihre letzte Aktion wird noch verarbeitet.")
      return
    }

    userBets[betPrefix + matchNumber] = team
    loading = true
    renderBetByMatch(matchNumber, true)

    getBet(function (data) {
      if (data.error) {
        window.alert(data.error)
      } else {
        userBets = data.user || {}
      }
      loading = false
      renderBetByMatch(matchNumber, false)
    }, `match=${matchNumber}&bet=${team}&name=${encodeURIComponent(userBets[betPrefix + "name"])}`)

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
            ${createTeam(match.team1, team1, match.winner === match.team1, match, match.request1)}
            ${createTeam(match.team2, team2, match.winner === match.team2, match, match.request2)}
          </tbody>
        </table>
      </div>
    </li>
    `
  }

  function createTeam (key, props, isWinner, match, matchRequest) {
    if (props === undefined) {
      return `
      <tr class="tournament-bracket__team">
      <td class="tournament-bracket__image" style="height:28px"></td>
      <td class="tournament-bracket__label text-center w-100"><strong>?</strong></td>
      </tr>`
    }
    const matchNumber = match.number
    const title = `${props.captain.firstName} ${props.captain.lastName} (${props.state})`
    const now = new Date()
    const canBet = matchNumber >= minBettableMatchNumber && (!bettingDeadline || now < bettingDeadline)
    return `
    <tr class="tournament-bracket__team">
      <td class="tournament-bracket__image" title="${title}"><img src="${imagePath}${props.img}"></td>
      <td class="tournament-bracket__label" title="${title}">
        <span class="tournament-bracket__name">
          ${matchRequest ? `<a href="/a/${matchRequest}">` : ''}
          ${props.captain.firstName.charAt(0)}. ${props.captain.lastName}
          ${matchRequest ? '</a>' : ''}
        </span>&nbsp;<span class="tournament-bracket__token" title="${props.state}">(${key})</span>
      </td>
      <td class="tournament-bracket__result" title="Gewinner">${isWinner ? '🏆️&nbsp;' : ''}</td>
      <td class="tournament-bracket__tip">
        ${ canBet ?
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
