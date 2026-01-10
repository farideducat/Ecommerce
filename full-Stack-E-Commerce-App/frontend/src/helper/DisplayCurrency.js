const DisplayOmrCurrency = (number)=>{
    const formatter = new Intl.NumberFormat('en-OM',{
        style : "currency",
        currency : "OMR",
        minimumFractionDigits : 3 
    })

    return formatter.format(number)
}


export default DisplayOmrCurrency