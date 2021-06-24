const resultElement = document.getElementById('result');
const lengthElement = document.getElementById('length');
const uppercaseElement = document.getElementById('uppercase');
const lowercaseElement = document.getElementById('lowercase');
const numbersElement = document.getElementById('numbers');
const symbolsElement = document.getElementById('symbols');
const generateElement = document.getElementById('generate');
const clipboardElement = document.getElementById('clipboard');




generateElement.addEventListener('click',()=>{
    const length= +lengthElement.value;
    const hasUpper= uppercaseElement.checked;
    const hasLower= lowercaseElement.checked;
    const hasNumbers= numbersElement.checked;
    const hasSymbols= symbolsElement.checked;
    resultElement.innerText=generatePassword(hasUpper,hasLower,hasNumbers,hasSymbols,length);
})

const generatePassword=(upper,lower,number,symbol,len)=>{
    const randomFunc={
        upper: getRandomUpper,
        lower: getRandomLower,
        number: getRandomNumber,
        symbol: getRandomSymbol
    }
    let generatedPassword='';
    const typesCount=upper+lower+number+symbol;
    const typesArray=[
        {upper},{lower},{number},{symbol}
    ].filter(
        item=>Object.values(item)[0]
    );
    
    if(typesCount===0){
        return 'So...nothing?'
    }

    for(let i=0; i<len;i+=typesCount){

        typesArray.forEach(type=>{
            const funcName=Object.keys(type)[0];
            generatedPassword+=randomFunc[funcName]();
        })
    }
    const finalPassword=generatedPassword.slice(0,len);
    


    clipboardElement.addEventListener('click', () =>{
        navigator.clipboard.writeText(finalPassword);
        alert(`Generated password copied to your clipboard !`);
    })
    
    return finalPassword;
}




const getRandomLower=()=>{

    return String.fromCharCode(
        Math.floor(
            Math.random()*26
        )
        +97
    )
}
const getRandomUpper=()=>{

    return String.fromCharCode(
        Math.floor(
            Math.random()*26
        )
        +65
    )
}
const getRandomNumber=()=>{

    return String.fromCharCode(
        Math.floor(
            Math.random()*10
        )
        +48
    )
}
const getRandomSymbol=()=>{

    const symbols='!@#$%^&*()/<>=\,.{}:;|+-~'

    return symbols[
        Math.floor(
            Math.random()*symbols.length
        )
    ]
}
