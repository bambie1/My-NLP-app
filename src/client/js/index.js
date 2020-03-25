import '../styles/main.scss'

// console.log("This is my news index file")
$(document).ready(function () {
    $(".submit").click(handleSubmit)
});

function validateUrl(value) {
    return /^(?:(?:(?:https?|ftp):)?\/\/)(?:\S+(?::\S*)?@)?(?:(?!(?:10|127)(?:\.\d{1,3}){3})(?!(?:169\.254|192\.168)(?:\.\d{1,3}){2})(?!172\.(?:1[6-9]|2\d|3[0-1])(?:\.\d{1,3}){2})(?:[1-9]\d?|1\d\d|2[01]\d|22[0-3])(?:\.(?:1?\d{1,2}|2[0-4]\d|25[0-5])){2}(?:\.(?:[1-9]\d?|1\d\d|2[0-4]\d|25[0-4]))|(?:(?:[a-z\u00a1-\uffff0-9]-*)*[a-z\u00a1-\uffff0-9]+)(?:\.(?:[a-z\u00a1-\uffff0-9]-*)*[a-z\u00a1-\uffff0-9]+)*(?:\.(?:[a-z\u00a1-\uffff]{2,})))(?::\d{2,5})?(?:[/?#]\S*)?$/i.test(value);
}

async function handleSubmit() {
    event.preventDefault()
    let formText = $('#url').val()
    // if (validateUrl(formText)) {

    console.log(`::: Form Submitted ::: ${formText}`)
    let formId = $(this).attr('id')

    // let newsInfo = 
    await getNLP(formText, formId)
    await postInfo(formId)
    // }
    // else {
    // alert("Please enter a valid URL")
    // }
}

const getNLP = async (formText, formId) => {
    console.log("inside NLP promise")
    // if (formId == "classify") {
        // console.log("inside sentiment")
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
    // return await request.json();
    //add try-catch
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
// export { handleSubmit }