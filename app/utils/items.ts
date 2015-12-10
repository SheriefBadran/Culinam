import * as React from 'react';
import * as R from 'ramda';
import {Item} from '../entities';

export const renderCartItems = R.curry((component:any, createElement:Function, items:Item[]) => {
  return R.compose(
    R.addIndex(R.map)((item:Item, key:Number) => createElement(component, {key, item,})),
    R.reduce((cartItems:Item[], currentItem:Item) => {
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
  )(items);
});
