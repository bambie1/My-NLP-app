// import '../styles/main.scss'

// console.log("This is my news index file")
document.getElementById("submit").addEventListener("click", handleSubmit)

async function handleSubmit() {
    // event.preventDefault()

    let formText = document.getElementById('url').value
    // checkForName(formText)
    console.log("::: Form Submitted :::")

    // let newsText = await 
    const request = await fetch('/classify', formText)
    .then(res => res.json())
    .then(function(res) {
        document.getElementById('results').innerHTML = res.message
    })
}

// export { handleSubmit }