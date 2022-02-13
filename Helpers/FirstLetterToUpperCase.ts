const firstLetterToUpperCase=(value:string)=>{
    if(value!==''){
        value = value.replace(/\s+/g, ' ').trim()
        value = value[0].toUpperCase() + value.slice(1)
        return value
    }
    else{
        return ''
    }

}
export default firstLetterToUpperCase