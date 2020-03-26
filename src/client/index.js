import "regenerator-runtime/runtime.js";
import {handleSubmit} from './js/handleSubmit'
import {getNLP} from './js/getNLP'
import {postInfo} from './js/postInfo'
import {urlCheck} from './js/urlCheck'
import './styles/main.scss'

// console.log("This is my news index file")
$(document).ready(function () {
    $(".submit").click(handleSubmit)
});

// export { handleSubmit }