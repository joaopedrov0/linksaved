const ul = document.querySelector("ul")
const input = document.querySelector("input")
const form = document.querySelector('form')


async function load(action) {
    let linkList = document.querySelector('ul.container').innerHTML = "<li>Never forget another url</li>"

    const res = await fetch(`${action}`).then((data) => data.json())
    
    res.urls.map(({name, url}) => addElement({name, url}))
}

load('http://localhost:3000/')


function addElement({ name, url }) {
    const li = document.createElement('li')
    const a = document.createElement("a")
    const trash = document.createElement("span")

    a.href = url
    a.innerHTML = name
    a.target = "_blank"

    trash.innerHTML = "x"
    trash.onclick = () => removeElement(trash)

    li.append(a)
    li.append(trash)
    ul.append(li)

    
}

function removeElement(el) {
    if (confirm('Tem certeza que deseja deletar?')){
        let brother = el.parentNode.children[0]
        let name = brother.innerText
        let url = brother.href
        console.log(`NAME = ${name}  ;   URL = ${url}`)
        
        el.parentNode.remove()
        load(`http://localhost:3000/?nome=${String(name)}&url=${String(url)}&del=1`)
    }
        

    
}

form.addEventListener("submit", (event) => {
    event.preventDefault();

    let { value } = input

    if (!value) 
        return alert('Preencha o campo')

    const [name, url] = value.split(",")

    if (!url) 
        return alert('formate o texto da maneira correta')

    if (!/^http/.test(url)) 
        return alert("Digite a url da maneira correta")

    addElement({ name, url })

    input.value = ""

    load(`http://localhost:3000/?name=${name}&url=${url}`)
})