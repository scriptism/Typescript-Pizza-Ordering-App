type Pizza = {
  id: number;
  name: string;
  price: number;
};

type Order = {
  id: number;
  pizza: Pizza;
  status: "ordered" | "completed";
};

const menu = [
  { id: 1, name: "Margarita", price: 5.99 },
  { id: 2, name: "Pepperoni", price: 7.99 },
  { id: 3, name: "Hawaiian", price: 8.99 },
  { id: 4, name: "Veggie", price: 6.99 },
];
let cashInRegister = 100.0;
let newOrderId = 1;
const orderQueue: Order[] = [];

function addNewpizza(pizzaObj: Pizza) {
  menu.push(pizzaObj);
}

function placeOrder(pizzaName: string) {
  const selectedPizza = menu.find((pizzaObj) => pizzaObj.name === pizzaName);
  if (!selectedPizza) {
    console.error(`${selectedPizza} does not exist in the menu`);
    return;
  }
  cashInRegister += selectedPizza.price;
  const newOrder: Order = {
    id: newOrderId++,
    pizza: selectedPizza,
    status: "ordered",
  };
  orderQueue.push(newOrder);
  return newOrder;
}

function completeOrder(orderId: number) {
  const order = orderQueue.find((order) => order.id === orderId);
  if (!order) {
    throw new Error(`${orderId} was not found in the orderQueue`);
  }
  order.status = "completed";
  return order;
}

console.log("Initial Menu:", menu);
console.log("Initial Cash in Register:", cashInRegister);
console.log("Placing Order for Pepperoni:", placeOrder("Pepperoni"));

addNewpizza({ id: 5, name: "BBQ Chicken", price: 9.99 });
addNewpizza({ id: 6, name: "Meat Lovers", price: 10.99 });
addNewpizza({ id: 7, name: "Supreme", price: 11.99 });
addNewpizza({ id: 8, name: "Buffalo", price: 9.49 });

placeOrder("BBQ Chicken");
placeOrder("BBQ");
completeOrder(1);
console.log("Updated Menu:", menu);
console.log("Cash in Register after Order:", cashInRegister);
console.log("Order Queue:", orderQueue);
