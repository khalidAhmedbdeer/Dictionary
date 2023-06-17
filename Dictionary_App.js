let submit = document.querySelector("[type='submit']")
let input = document.querySelector("[type='text']")
let word = document.querySelector(".word")
let sound = document.querySelector(".sound")
let audio = document.querySelector("audio")
let type = document.querySelector(".type")
let information = document.querySelector(".information")
let example = document.querySelector(".example")
let error = document.querySelector(".error")
let word_container = document.querySelector(".word-container")

let api = "https://api.dictionaryapi.dev/api/v2/entries/en/" // https://api.dictionaryapi.dev/api/v2/entries/en/[word]

submit.addEventListener("click" , function(e){
    e.preventDefault()
    if(input.value !== ""){
        fetch(`${api}${input.value}`).then(res =>{
            return res.json()
            
        }).then(res => {
            error.style.display = "none";
            word_container.style.display = "block";
            word.innerHTML = input.value;
            console.log(res)
            type.innerHTML = (res[0].meanings[0].partOfSpeech || res[0].meanings[1].partOfSpeech) + "   ";
            let span = document.createElement("span")
            span.innerHTML = res[0].phonetic || res[0].phonetics[1].text;
            type.appendChild(span)
            audio.src = `${res[0].phonetics[0].audio}` || `${res[0].phonetics[1].audio}`;
            information.innerHTML = (res[0].meanings[0].definitions[0].definition || res[0].meanings[0].definitions[1].definition);
            example.innerHTML = (res[0].meanings[0].definitions[0].example || res[0].meanings[0].definitions[1].example);
            example.innerHTML == "undefined" ? example.innerHTML = `The Word [${word.innerHTML}] has not example`:""
            
        }).catch(() =>{
            error.style.display = "block";
            word_container.style.display = "none";
        })
    }
})

sound.onclick = function(){
    audio.play()
}
