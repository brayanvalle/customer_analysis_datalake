const moment = require('moment');
const uuidv4 = require('uuid/v4');
const aws_common = require('./aws-common.js');
const customer_service = require('./customer-service.js')


exports.handler = async (event) => {
    let customer_data = customer_service.getCustomerData();
    await HandleCustomerData(customer_data);
    
    return customer_data;
    const response = {
        statusCode: 200,
        body: JSON.stringify('Data saved Ok'),
    };
    return response;
};

const HandleCustomerData = async (customer_data) =>
{
    for(let customer_interaction of customer_data)
    {
        let file_name = uuidv4() + ".json";
        let file_path = moment(customer_interaction.date).format("[year=]YYYY/[month=]MM/[day=]DD");
        
        await saveFile(file_path , file_name , customer_interaction);
    }
}



const saveFile = async (file_path, file_name , data) =>{
    let bucket = 'YOUR-BUCKET-NAME';
    await aws_common.S3_saveFile(bucket , file_path,file_name , JSON.stringify(data));
}
