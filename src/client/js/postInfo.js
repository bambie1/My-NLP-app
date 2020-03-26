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

export {postInfo}