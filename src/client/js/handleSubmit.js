const fetch = require("node-fetch");
import { urlCheck } from './urlCheck'

async function handleSubmit() {
    event.preventDefault()
    let formText = $('#url').val()
    if (urlCheck(formText)) {

        console.log(`::: Form Submitted ::: ${formText}`)
        let formId = $(this).attr('id')

        // let newsInfo = 
        await getNLP(formText, formId)
        await postInfo(formId)
    }
    else {
        alert("Please enter a valid URL")
    }
}

async function getNLP (formText, formId) {
    console.log("inside NLP promise")
    const request = await fetch(`/${formId}`, {
        method: 'POST',
        credentials: 'same-origin',
        headers: {
            'Content-Type': 'application/json',
        },
        body: JSON.stringify({
            "url": formText,
            "mode": "document"
        })
    })
    // }
    console.log("after promise")
    const reqJson = await request.json();
    return reqJson;
}

const postInfo = async (formId) => {
    const request = await fetch('/form')
    const news = await request.json()
    // console.log(news)
    $(document).ready(function () {
        if (formId == "classify") {
            $("#results").html(
                `<p><b>Language</b>: ${news[news.length - 1].Lang} <br>
                <b>Label</b>: ${news[0].Label}<br>
                <b>Confidence</b>: ${news[news.length - 1].Conf}<br>
                <b>Text</b>: ${news[news.length - 1].Text}<br>
                </p>`
            )
        } else {
            $("#results").html(
                `<p><b>Title</b>: ${news[news.length - 1].Title} <br>
                <b>Author</b>: ${news[0].Author}<br>
                <b>Publish Date</b>: ${news[news.length - 1].PublishDate}<br>
                <b>Feeds</b>: ${news[news.length - 1].Feeds}<br>
                </p>`
            )
        }
    });
}

export { getNLP }
// module.exports = {
//     getNLP: getNLP
// };