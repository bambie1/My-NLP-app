// import '../styles/main.scss'

// console.log("This is my news index file")
$(document).ready(function () {
    $(".submit").click(handleSubmit)
});

function validateUrl(value) {
    return /^(https?:\/\/)(([\da-z\.-]+)\.)?([a-z\.]{2,6})([\/\w \.-]*)*\/?$/.test(value)
}

async function handleSubmit() {
    event.preventDefault()
    let formText = $('#url').val()
    if (validateUrl(formText)) {
        console.log(`::: Form Submitted ::: ${formText}`)
        let formId = $(this).attr('id')

        try {
            await getNLP(formText, formId)
        } catch (error) {
            console.log("error", error)
        } 
        await postInfo(formId)
    }
    else {
        alert("Please enter a valid URL")
    }
}

const getNLP = async (formText, formId) => {
    console.log("inside NLP promise")
    // if (formId == "classify") {
    // console.log("inside sentiment")
    try {
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
    } catch (error) {
        console.log("error", error)
    }
    // return await request.json();
    //add try-catch
}

const postInfo = async (formId) => {
    const request = await fetch('/form')
    try {
        const news = await request.json()
        // console.log(news)
        $(document).ready(function () {
            if (formId == "classify") {
                $("#results").html(
                    `<p><b>Language</b>: ${news[news.length - 1].Lang} <br>
                <b>Label</b>: ${news[0].Label}<br>
                <b>Confidence</b>: ${news[news.length - 1].Conf}<br>
                <b>Text</b>: <span style="display:block;text-overflow: ellipsis;width: 400px;overflow: hidden; white-space: nowrap;">${news[news.length - 1].Text}</span><br>
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
    } catch (error) {
        console.log("error", error)
    }

}

// export { handleSubmit }