const axios = require('axios');

const tempFunc = async () => {
    for(let i=52340; i<=52342; i++)
    {
        try {
            let res = await axios.get(`https://parent.iitism.ac.in/assets/images/cbcs_gradesheet/19je0340/Gradesheet_${i}.pdf`);

            console.log(i);
            break;
        } catch (error) {
            // console.log(error.message);
        }
    }
}

tempFunc();