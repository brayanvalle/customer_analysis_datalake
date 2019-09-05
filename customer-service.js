const moment = require('moment');

const NUMBER_OF_CUSTOMERS = 10;
const NUMBER_OF_INTERACTIONS = 50;
exports.getCustomerData = () =>{
    return _getCustomerData();
}

const _getCustomerData = () =>{
    
  let customer_interaction = [];
  let customers = generateSampleCustomers();
  let interactions = getInteractions();
  
  for(var i = 0; i < NUMBER_OF_INTERACTIONS; i++)
  {
    let dt = Math.floor(Math.random() * 20) + 1;
    dt = dt < 10 ? ("0"+dt) : dt;
    
    let hr = handleDate(22);
    dt = '2019-09-'+dt+' '+hr+':00:00';
    let date = moment(dt).utcOffset("-05:00").format("YYYY-MM-DD");
    let _customer = customers[Math.floor(Math.random() * customers.length)];
    let single_customer = {
      id : _customer.id,
      name: _customer.name,
      age: _customer.age,
      gender: _customer.gender,
      interaction: interactions[Math.floor(Math.random() * 5)],
      date: date,
      time: moment(dt).format('HH:MM:SS')
    };
   
    customer_interaction.push(single_customer);
  }
  return customer_interaction;
}

const getInteractions = () =>
{
  let interactions = [
      'buy',
      'login',
      'subscribe_newlester',
      'register',
      'add_favorite',
      'add_to_favorite'
  ];
  return interactions;
};

const generateSampleCustomers = () =>
{
  let customers = [];
  for(var i = 0; i < NUMBER_OF_CUSTOMERS; i++)
  {
    let customer = {
      id: makeid(10, true),
      name: 'PERSON_'+makeid(5),
      gender: Math.floor(Math.random() * 2) == 1 ? 'M' : 'F' 
    };
    let age = Math.floor(Math.random() * Math.floor(60));
    customer.age = age < 18 ? (18 + Math.floor(Math.random() * Math.floor(20)) ) : age;
    customers.push(customer);
  }
  
  return customers;
};


const handleDate = (max) =>
{
  let date = (Math.floor(Math.random() * Math.floor(max)) + 1)
  return (date < 10 ? ("0"+date) : date);
}

const makeid = (length , only_numbers = false) =>{
   var result           = '';
   var characters       = 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789';
   if(only_numbers)
   {
       characters = '0123456789'
   }
   
   var charactersLength = characters.length;
   for ( var i = 0; i < length; i++ ) {
      result += characters.charAt(Math.floor(Math.random() * charactersLength));
   }
   return result;
}