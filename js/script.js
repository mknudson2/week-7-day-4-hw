let data

async function getInfo(year, round){
    const res = await fetch(`http://ergast.com/api/f1/${year}/${round}/driverStandings.json`)
    if(res.ok){
        const data= await res.json()
        return data
        const standings = data.MRData.StandingsTable.StandingsLists[0].DriverStandings
    } else window.alert('Bad request')


    const name = data.MRData.StandingsTable.StandingsLists[0].DriverStandings[0].Driver.driverId;
}


function clearTable(){
    const tableBody = document.getElementById('standingsTable')
    tableBody.innerHTML=''
}


async function populateTable(event){
    const year = document.getElementById('year').value
    const round = document.getElementById('round').value

    const result = await getInfo(year, round)
    const standings = result.MRData.StandingsTable.StandingsLists[0].DriverStandings

    const drivers = standings.slice(0, 7)
    drivers.forEach((driver)=> {
        const {position, Driver, wins, points} = driver
        const tableBody = document.getElementById('standingsTable')
        const row =tableBody.insertRow()
        const positionCell = row.insertCell()
        const nameCell = row.insertCell()
        const nationalityCell = row.insertCell()
        const winsCell = row.insertCell()
        const pointsCell = row.insertCell()

        positionCell.textContent = position
        nameCell.textContent = `${Driver.givenName} ${Driver.familyName}`
        nationalityCell.textContent = Driver.nationality
        winsCell.textContent = wins
        pointsCell.textContent = points
    })
    console.log(drivers)
}   

document.querySelector('form').addEventListener('submit', async (e)=>{
    e.preventDefault()
    clearTable()
    populateTable()
})


