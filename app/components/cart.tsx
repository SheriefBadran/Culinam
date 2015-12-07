import * as React from 'react';
import {stateful, dispatch} from '../redux/helpers';
import {actions} from '../redux/actions';
import {Item, Order, OrderStatus} from '../entities';
import {Dish} from '../components/dish';

const styles = Object.freeze({
  text: {
    color: 'black',
  },
  wrapper: {
    width: '30%',
    alignItems: 'stretch',
    flexDirection: 'column',
    padding: 8,
    background: 'white',
    display: 'flex',
  },
  listWrapper: {
    display: 'flex',
    flexDirection: 'column',
    padding: 8,
    flex: 1,
  },
  rowWrapper: {
    display: 'flex',
    flexDirection: 'row',
    justifyContent: 'space-between',
  },
  smallCartPanel:{
    display: 'flex',
    background: 'grey',
    height: 30,
  },
  cartPanel: {
    display: 'flex',
    background: 'black',
    height: 50,
  },
});

type State = {
  cart: Item[],
  orders: Order[],
};

@stateful(state => {
  return state.cart;
})
export class Cart extends React.Component<{}, State> {
  private id:any = 1;
  render() {
    return (
      <div style={styles.wrapper}>
        <div style={styles.listWrapper}>
          {
            this.state.cart
              .reduce((cartItems:Item[], currentItem:Item) => {
                let exists = cartItems.find(item => item.name === currentItem.name);
                if (exists) {
                  exists.count++;
                  exists.price = currentItem.price * exists.count;
                } else {
                  cartItems.push({
                    'name': currentItem.name,
                    'price': currentItem.price,
                    'count': 1,
                  });
                }
                return cartItems;
              }, [])
              .map((item:Item, id:Number) => (<Dish key={id} item={item} />))
          }
        </div>
        <div style={styles.smallCartPanel}>
          <a href='#' onClick={(e) => {
            e.preventDefault();
          }}>Add</a>
        </div>
        <div style={styles.cartPanel}>
          <a href='#' onClick={(e) => {
            e.preventDefault();
            console.log("state: ", this.state.orders);
            dispatch(actions.orderCreated, {
              order: {
                id: this.id++,
                status: OrderStatus.Todo,
                items: this.state.cart,
              },
            });
          }}>Bonga</a>
        </div>
      </div>
    );
  }
}
