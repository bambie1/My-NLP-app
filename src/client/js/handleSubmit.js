import {urlCheck} from './urlCheck'
import {getNLP} from './getNLP'
import {postInfo} from './postInfo'

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

export {handleSubmit}