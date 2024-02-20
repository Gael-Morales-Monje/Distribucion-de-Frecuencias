
const text = document.getElementById('text')
const panel = document.getElementById('panel')
const Root = document.getElementById('root')
const list = document.getElementById('List')

document.getElementById('btn').addEventListener('click', () => {
    panel.innerHTML = `<div class="grid">
    <div class="box"># de Clases</div>
    <div class="box">Clases</div>
    <div class="box">Frecuencia</div>
    <div class="box">Frecuencia Relativa</div>
    <div class="box">Frecuencia Relativa Acumulativa</div>
    </div>`
    let array2 = text.value.replaceAll(" ",",")
    let array = array2.split(',')
    array.sort(function (a, b) {
        return a - b;
    });
    
    let clases = Math.sqrt(array.length).toString()
    let low = array[0]
    let high = array[array.length-1]
    let top = high-low
    let AC = Math.round(top/Math.sqrt(array.length))
    let rows = ''
    let min =array[0]
    let max = Number(array[0]) + AC
    let count = 0
    let FRA = 0
    for (let index = 0; index < clases.slice(0,2); index++) {
        let number = 1
        for (const value of array) {
            if (value >= min && value < max) {
                count += 1
            }
        }
        FRA += count/array.length
        rows = `<div class="grid">
                <div class="box">${index+1}</div>
                <div class="box">${min} < ${max}</div>
                <div class="box">${count}</div>
                <div class="box">${count}/${array.length} = ${(count/array.length).toString().slice(0,5)}</div>
                <div class="box">${FRA.toString().slice(0,5)}</div>
        </div>`
        panel.innerHTML += rows
        min = max
        max = max + AC
        count = 0
    }

    let ListArray = ""
    for (const i of array) {
        ListArray += `${i} `
    }
    list.innerHTML = `Lista Ordenada:<div class="panel">${ListArray}</div>`
})
