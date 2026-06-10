import  { PRODUCTS_URL, UPLOAD_URL } from '../constants.js';
import { apiSlice } from './apiSlice.js';


export const productsApiSlice = apiSlice.injectEndpoints({
   endpoints: (builder) => ({
      getProducts: builder.query({
         query: ({ keyword, pageNumber } = {}) => {
            const params = {};

            if (typeof keyword === 'string' && keyword.trim()) {
               params.keyword = keyword.trim();
            }

            if (pageNumber && Number(pageNumber) > 1) {
               params.pageNumber = Number(pageNumber);
            }

            return {
               url: PRODUCTS_URL,
               params,
            };
         },
         keepUnusedDataFor: 5,
         providesTags: (result) =>
            result?.products
               ? [
                    { type: 'Products', id: 'LIST' },
                    ...result.products.map((product) => ({ type: 'Product', id: product._id })),
                 ]
               : [{ type: 'Products', id: 'LIST' }],
      }),
      getProductDetails: builder.query({
         query: (productId) => ({
            url: PRODUCTS_URL + `/${productId}`
         }),
         keepUnusedDataFor: 5,
         providesTags: (result, error, productId) => [{ type: 'Product', id: productId }],
      }),
      createProduct: builder.mutation({
         query: () => ({
            url: PRODUCTS_URL,
            method: 'POST'
         }),
         invalidatesTags: [{ type: 'Products', id: 'LIST' }],
      }),
      updateProduct: builder.mutation({
         query: (data) => ({
            url: PRODUCTS_URL + `/${data.productId}`,
            method: 'PUT',
            body: data
         }),
         invalidatesTags: (result, error, data) => [
            { type: 'Product', id: data.productId },
            { type: 'Products', id: 'LIST' },
            { type: 'Products', id: 'TOP' },
         ],
      }),
      uploadProductImage: builder.mutation({
         query: (data) => ({
            url: `${UPLOAD_URL}`,
            method: 'POST',
            body: data
         }),
      }),
      deleteProduct: builder.mutation({
         query: (productId) => ({
            url: PRODUCTS_URL + `/${productId}`,
            method: 'DELETE',
         }),
         invalidatesTags: (result, error, productId) => [
            { type: 'Product', id: productId },
            { type: 'Products', id: 'LIST' },
            { type: 'Products', id: 'TOP' },
         ],
      }),
      createReview: builder.mutation({
         query: (data) => ({
            url: PRODUCTS_URL + `/${data.productId}/reviews`,
            method: 'POST',
            body: data
         }),
         invalidatesTags: (result, error, data) => [
            { type: 'Product', id: data.productId },
            { type: 'Products', id: 'LIST' },
            { type: 'Products', id: 'TOP' },
         ],
      }),
      getTopProducts: builder.query({
         query: () => ({
            url: PRODUCTS_URL + `/top`,
         }),
         keepUnusedDataFor: 5,
         providesTags: [{ type: 'Products', id: 'TOP' }],
      })
   }),
});

export const { 
   useGetProductsQuery, 
   useGetProductDetailsQuery, 
   useCreateProductMutation,
   useUpdateProductMutation,
   useUploadProductImageMutation,
   useDeleteProductMutation,
   useCreateReviewMutation,
   useGetTopProductsQuery
} = productsApiSlice;