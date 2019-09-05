const AWS = require('aws-sdk'); 
//global aws config
AWS.config.update({region : 'us-east-1'});
const s3 = new AWS.S3();


/**
 * This functions upload the Shopify order to the s3 bucket
 * 
 * @param {string} file_path : The filepath to store the object
 * @param {string} file_name : The filename to store the object
 * @param {object} data : The object data to save.
 * @
 **/
exports.S3_saveFile = async (bucket , file_path,file_name ,data) => {
    
    await this.S3_verifyFolder(bucket, file_path);
    let params = {
      Bucket: bucket,
      Key: `${file_path}/${file_name}`,
      Body: data
    };
    try {
      await s3.putObject(params).promise();
    } catch (error) {
      console.log("error in uploading to S3: ", error);
      throw new Error(`error in uploading ${file_name} to ${file_path}`);
    }
}


/**
 * This function split the date path into an array. ie, 
 * date_order = "2020/01/02" => folders = [2020 , 01, 02]
 * then create a folder in the s3 bucket for every element 
 * of the array.
 * 
 * @param string : file_path 
 * */
exports.S3_verifyFolder = async (bucket, file_path) => {
    let folders = file_path.split('/');
    let date_folder = '';
    for(let folder of folders){
        date_folder += folder+'/';
        await this.S3_createFolder(bucket ,date_folder);
    }
}


/**
 * This function creates a folder on the s3 bucket
 * @param string : folder_path 
 * */
exports.S3_createFolder = async (bucket , folder_path) =>{
    let params = {
        Bucket: bucket,
        Key: `${folder_path}`
    };
    try { 
      await s3.headObject(params).promise();
    } catch (headErr) {
      if (headErr.code === 'NotFound') {
        let params = { Bucket: bucket, Key: `${folder_path}`, Body: ''};
        try {
            await s3.upload(params).promise();
        } catch (error) {
            console.log("error in uploading to S3: ", error);
            throw new Error(`error in uploading folder to s3 bucket`);
        }
      }
    }
}



