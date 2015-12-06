import {Order} from '../../entities';
import {actions} from '../actions';
import {createReducer, when} from '../helpers';

type State = {orders: Array<Order>};

export type OrderState = State;

export const orders = createReducer<State>(
  {orders: [] as Order[]},
  when(actions.orderCreated, (state: State, payload) => {
    console.log(payload.order);
    state.orders.push(payload.order);
  }),
  when(actions.setOrderStatus, (state: State, {order, status}) => {
    state.orders.find(o => o.id === order.id).status = status;
  })
);

// {orders: [{id: 1, status: 1, items: [{id: 1, name: 'Test Item', price:123}]}] as Order[]},
