const add = (cart, req) => {
  cart.contents.push(req.body);
  cart.amount += +req.body.price;
  return JSON.stringify(cart, null, 4);
};
const change = (cart, req) => {
  const find = cart.contents.find(el => el.id_product === +req.params.id);
  find.quantity += req.body.quantity;
  cart.amount += +find.price;
  return JSON.stringify(cart, null, 4);
};

const deleteItem = (cart, req) => {
  for (let i = 0; i < cart.contents.length; i += 1) {
    if (cart.contents[i].id_product === +req.params.id) {
      if (cart.contents[i].quantity === 1) {
        cart.amount -= cart.contents[i].price;
        cart.contents.splice(i, 1);
      } else if (cart.contents[i].quantity > 1) {
        cart.contents[i].quantity -= 1;
        cart.amount -= cart.contents[i].price;
      }
    }
  }
  // find.quantity += req.body.quantity;
  return JSON.stringify(cart, null, 4);
};

module.exports = {
  add,
  change,
  deleteItem,

};
