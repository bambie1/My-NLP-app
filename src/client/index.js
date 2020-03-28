import "regenerator-runtime/runtime.js";
import {handleSubmit} from './js/handleSubmit'
import './styles/main.scss'

// console.log("This is my news index file")
$(document).ready(function () {
    $(".submit").click(handleSubmit)
});