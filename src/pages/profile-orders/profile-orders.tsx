import { ProfileOrdersUI } from '@ui-pages';
import { TOrder } from '@utils-types';
import { FC, useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { getOrders, selectOrders } from '../../services/ordersSlice';
import { getUser } from '../../services/userSlice';
import { AppDispatch } from 'src/services/store';

export const ProfileOrders: FC = () => {
  const orders: TOrder[] = useSelector(selectOrders);
  const user = useSelector(getUser);
  const dispatch = useDispatch<AppDispatch>();
  useEffect(() => {
    if (user) {
      dispatch(getOrders());
    }
  }, []);

  return <ProfileOrdersUI orders={orders} />;
};
