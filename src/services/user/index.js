// Mock data
import users from 'data/users';
import orders from 'data/orders';
import axios from 'axios';

function lookupUser(user) {
  const userCopy = JSON.parse(JSON.stringify(user));
  const userOrders = userCopy.orders.map(id =>
    orders.find(order => order.id === id)
  );
  const userMoneySpent = userCopy.orders.reduce(
    (total, order) => total + order.amount,
    0
  );

  userCopy.orders = userOrders;
  userCopy.moneySpent = userMoneySpent;

  return userCopy;
}

export const getUsers = (limit = 10) => {
  return new Promise(resolve => {
    setTimeout(() => {

      axios.get('http://localhost:8888/API-TerresDuSon/user/userlist.php')
        .then(function(response){
          // console.log((response.data));
          const users1 = (response.data);
          const usersLookup = users1.slice(0, limit);

          resolve({
            users: usersLookup,
            usersTotal: users.length
        }); 
      })
      // //const usersLookup = users.slice(0, limit);
      // const usersLookup = users.slice(0, limit);

      
      // resolve({
      //   users: usersLookup,
      //   usersTotal: users.length
      // });
    }, 700);
  });
};

export const getUser = id => {
  return new Promise((resolve, reject) => {
    setTimeout(() => {
      const user = users.find(user => user.id === id);
      // console.log(user);
      if (user) {
        resolve({
          user: lookupUser(user)
        });
      } else {
        reject({
          error: 'User not found'
        });
      }
    }, 500);
  });
};
