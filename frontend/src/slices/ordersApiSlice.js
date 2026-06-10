import { ORDERS_URL, PAYPAL_URL } from "../constants";
import { apiSlice } from "./apiSlice";

export const ordersApiSlice = apiSlice.injectEndpoints({
   endpoints: (builder) => ({
      createOrder: builder.mutation({
         query: (order) => ({
            url: ORDERS_URL,
            method: 'POST',
            body: { ...order }
         }),
         invalidatesTags: [
            { type: 'Orders', id: 'MY_LIST' },
            { type: 'Orders', id: 'LIST' },
         ],
      }),
      getOrderDetails: builder.query({
         query: (orderId) => ({
            url: ORDERS_URL + `/${orderId}`
         }),
         keepUnusedDataFor: 5,
         providesTags: (result, error, orderId) => [{ type: 'Order', id: orderId }],
      }),
      payOrder: builder.mutation({
         query: ({ orderId, details }) => ({
            url: `${ORDERS_URL}/${orderId}/pay`,
            method: 'PUT',
            body: { ...details }
         }),
         invalidatesTags: (result, error, { orderId }) => [
            { type: 'Order', id: orderId },
            { type: 'Orders', id: 'MY_LIST' },
            { type: 'Orders', id: 'LIST' },
         ],
      }),
      getPayPalClientId: builder.query({
         query: () => ({
            url: PAYPAL_URL
         }),
         keepUnusedDataFor: 5
      }),
      getMyOrders: builder.query({
         query: () => ({
            url: ORDERS_URL + `/myorders`
         }),
         keepUnusedDataFor: 5,
         providesTags: (result) =>
            result
               ? [
                    { type: 'Orders', id: 'MY_LIST' },
                    ...result.map((order) => ({ type: 'Order', id: order._id })),
                 ]
               : [{ type: 'Orders', id: 'MY_LIST' }],
      }),
      getOrders: builder.query({
         query: ({ page = 1, limit = 20 } = {}) => ({
            url: `${ORDERS_URL}?page=${page}&limit=${limit}`
         }),
         keepUnusedDataFor: 5,
         providesTags: (result) =>
            result?.orders
               ? [
                    { type: 'Orders', id: 'LIST' },
                    ...result.orders.map((order) => ({ type: 'Order', id: order._id })),
                 ]
               : [{ type: 'Orders', id: 'LIST' }],
      }),
      deliverOrder: builder.mutation({
         query: (orderId) => ({
            url: `${ORDERS_URL}/${orderId}/deliver`,
            method: 'PUT'
         }),
         invalidatesTags: (result, error, orderId) => [
            { type: 'Order', id: orderId },
            { type: 'Orders', id: 'MY_LIST' },
            { type: 'Orders', id: 'LIST' },
         ],
      })
   })
});

export const { 
   useCreateOrderMutation, 
   useGetOrderDetailsQuery, 
   usePayOrderMutation, 
   useGetPayPalClientIdQuery,
   useGetMyOrdersQuery,
   useGetOrdersQuery,
   useDeliverOrderMutation
} = ordersApiSlice;