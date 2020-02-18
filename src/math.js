const calculateTip = (total, tipPercent = .25) => total + (total * tipPercent);

const farenheightToCelsius = (temp) => {
    return (temp - 32)/ 1.8;
}

const celsiustoFarenheit = (temp) => {
    return (temp * 1.8) + 32;
}

const add = (a, b) => {
    console.log('Before callback')

    return new Promise((resolve, reject) => {
        setTimeout(() => {
            if (a < 0 || b < 0) {
                return reject('Numbers must be non-negative');
            }

            resolve(a + b)
        }, 2000)
    })
}

module.exports = {
    calculateTip,
    farenheightToCelsius,
    celsiustoFarenheit,
    add
}