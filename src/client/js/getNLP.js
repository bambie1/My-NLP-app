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

export {getNLP}