import request from '@/Utils/AxiosUtils';
// {
//     products: [
//       {
//         id: 'e1bc6dcd-a560-4a08-9d05-ffabe7cd0ccf',
//         subtotal: 39814,
//         total: 39814,
//         quantity: 17,
//         cart_id: '16560bc5-3b60-4747-ab31-b22fb728bb1c',
//         created_at: '2024-03-02T03:03:13.540Z',
//         updated_at: '2024-03-02T03:03:13.540Z',
//         deleted_at: null,
//         product: {
//           id: '81e80d7d-3bcc-4e36-a366-c751e90b47b8',
//           name: 'Badul',
//           short_description: 'Baduk',
//           description: '<p>Baduk</p>',
//           price: 2342,
//           shipping_price: null,
//           stock_quantity: 1241,
//           sku: '12412',
//           meta_title: '',
//           meta_description: '',
//           meta_keywords: null,
//           status: 'ACTIVE',
//           unit: 'Baduk',
//           weight: 124,
//           created_at: '2024-02-29T04:40:07.103Z',
//           updated_at: '2024-02-29T04:40:07.103Z',
//           deleted_at: null,
//           thumbnail: {
//             id: 'a57598fb-30a1-47f8-9a45-1f15d05b75e2',
//             bucket: 'maepui-core',
//             key: '1709206508390.png',
//             type: 'PRODUCT',
//             url:
//               'http://localhost:9000/maepui-core/1709206508390.png?X-Amz-Algorithm=AWS4-HMAC-SHA256&X-Amz-Credential=minioadmin%2F20240229%2Fus-east-1%2Fs3%2Faws4_request&X-Amz-Date=20240229T115423Z&X-Amz-Expires=604800&X-Amz-SignedHeaders=host&X-Amz-Signature=384c5e06a81e83d60868b5be954dc0e4c4dede8836243f8ee2540d2b39d33aa5',
//             created_at: '2024-02-29T04:35:08.405Z',
//             updated_at: '2024-02-29T05:30:43.750Z',
//             deleted_at: null
//           }
//         }
//       },
//       {
//         id: 'ff71b165-a917-4292-b01f-1d3ffeea22d3',
//         subtotal: 4012,
//         total: 4012,
//         quantity: 17,
//         cart_id: '16560bc5-3b60-4747-ab31-b22fb728bb1c',
//         created_at: '2024-03-02T03:03:13.540Z',
//         updated_at: '2024-03-02T08:21:13.852Z',
//         deleted_at: null,
//         product: {
//           id: '395d1135-05e1-481d-8d7c-b7de6f744627',
//           name: 'Black Goku',
//           short_description: 'Black GokuBlack Goku',
//           description: '<p>Black GokuBlack Goku</p>',
//           price: 236,
//           shipping_price: null,
//           stock_quantity: 2342,
//           sku: '534252',
//           meta_title: '',
//           meta_description: '',
//           meta_keywords: null,
//           status: 'ACTIVE',
//           unit: 'BK',
//           weight: 151234,
//           created_at: '2024-02-29T04:59:06.773Z',
//           updated_at: '2024-02-29T04:59:06.773Z',
//           deleted_at: null,
//           thumbnail: {
//             id: '341f3fbb-6036-4d47-ab58-db3b809527df',
//             bucket: 'maepui-core',
//             key: '1709207916389.png',
//             type: 'PRODUCT',
//             url:
//               'http://localhost:9000/maepui-core/1709207916389.png?X-Amz-Algorithm=AWS4-HMAC-SHA256&X-Amz-Credential=minioadmin%2F20240229%2Fus-east-1%2Fs3%2Faws4_request&X-Amz-Date=20240229T115836Z&X-Amz-Expires=604800&X-Amz-SignedHeaders=host&X-Amz-Signature=ca44381c02944623837a0dedc2763c6bc251a3c145b5bd0a2f6fc3128206e099',
//             created_at: '2024-02-29T04:58:36.454Z',
//             updated_at: '2024-02-29T05:30:43.750Z',
//             deleted_at: null
//           }
//         }
//       },
//       {
//         id: '5ebe72a9-13d7-4452-94d8-f28f18104a8a',
//         subtotal: 28104,
//         total: 28104,
//         quantity: 12,
//         cart_id: '16560bc5-3b60-4747-ab31-b22fb728bb1c',
//         created_at: '2024-03-02T03:03:13.540Z',
//         updated_at: '2024-03-02T03:08:11.351Z',
//         deleted_at: null,
//         product: {
//           id: '324bc8c0-bf5e-49d7-863e-f78808ccbc39',
//           name: 'Readooo (Copy)',
//           short_description: 'Baduk',
//           description: '<p>Baduk</p>',
//           price: 2342,
//           shipping_price: null,
//           stock_quantity: 1241,
//           sku: '12412',
//           meta_title: 'MOWKEROW',
//           meta_description: '',
//           meta_keywords: null,
//           status: 'ACTIVE',
//           unit: 'Baduk',
//           weight: 124,
//           created_at: '2024-02-29T04:40:07.103Z',
//           updated_at: '2024-02-29T04:40:07.103Z',
//           deleted_at: null,
//           thumbnail: {
//             id: 'bc9fcbfc-23f5-4a21-92ce-0b148d7c6a06',
//             bucket: 'maepui-core',
//             key: '1709206508366.png',
//             type: 'PRODUCT',
//             url:
//               'http://localhost:9000/maepui-core/1709206508366.png?X-Amz-Algorithm=AWS4-HMAC-SHA256&X-Amz-Credential=minioadmin%2F20240229%2Fus-east-1%2Fs3%2Faws4_request&X-Amz-Date=20240229T115423Z&X-Amz-Expires=604800&X-Amz-SignedHeaders=host&X-Amz-Signature=121be2b594c665f2895a9d9e754eb8c31de901690ef9073cadf25e7b5971a52d',
//             created_at: '2024-02-29T04:35:08.379Z',
//             updated_at: '2024-02-29T05:30:43.750Z',
//             deleted_at: null
//           }
//         }
//       },
//       {
//         id: '4e9c0a96-d857-429d-879c-fe8702808767',
//         subtotal: 42174,
//         total: 42174,
//         quantity: 27,
//         cart_id: '16560bc5-3b60-4747-ab31-b22fb728bb1c',
//         created_at: '2024-03-02T03:03:13.540Z',
//         updated_at: '2024-03-02T08:22:17.799Z',
//         deleted_at: null,
//         product: {
//           id: '94e8860d-5fa3-462f-a75f-25563f9702a3',
//           name: 'POS',
//           short_description: 'qtqw',
//           description: '<p>asfagsd</p>',
//           price: 1562,
//           shipping_price: null,
//           stock_quantity: 412,
//           sku: '743',
//           meta_title: '',
//           meta_description: '',
//           meta_keywords: null,
//           status: 'ACTIVE',
//           unit: 'KF',
//           weight: 151,
//           created_at: '2024-02-29T04:55:25.149Z',
//           updated_at: '2024-02-29T04:55:25.149Z',
//           deleted_at: null,
//           thumbnail: {
//             id: '6268d0af-18c1-4625-af98-9f2eff2d51fc',
//             bucket: 'maepui-core',
//             key: '1709206508321.png',
//             type: 'PRODUCT',
//             url:
//               'http://localhost:9000/maepui-core/1709206508321.png?X-Amz-Algorithm=AWS4-HMAC-SHA256&X-Amz-Credential=minioadmin%2F20240229%2Fus-east-1%2Fs3%2Faws4_request&X-Amz-Date=20240229T113508Z&X-Amz-Expires=604800&X-Amz-SignedHeaders=host&X-Amz-Signature=562a698f152e9d7447b16a8516b5e02374cfbcaee4836d9bc4c0bfa7b2aacd4e',
//             created_at: '2024-02-29T04:35:08.362Z',
//             updated_at: '2024-02-29T05:30:43.750Z',
//             deleted_at: null
//           }
//         }
//       },
//       {
//         id: '2a0fb9ea-bf5c-4bb8-a906-81cc16918189',
//         subtotal: 675,
//         total: 675,
//         quantity: 9,
//         cart_id: '16560bc5-3b60-4747-ab31-b22fb728bb1c',
//         created_at: '2024-03-02T03:03:13.540Z',
//         updated_at: '2024-03-02T08:22:20.414Z',
//         deleted_at: null,
//         product: {
//           id: '45ce43db-f2ba-4476-a7d6-4152b87856f5',
//           name: 'Gugu',
//           short_description: 'GuguGuguGuguGugu',
//           description: '<p>gagagagagagag</p>',
//           price: 75,
//           shipping_price: null,
//           stock_quantity: 567,
//           sku: '345637',
//           meta_title: 'afaqfgt',
//           meta_description: 'asdfafasf',
//           meta_keywords: null,
//           status: 'ACTIVE',
//           unit: 'SS',
//           weight: 123,
//           created_at: '2024-02-29T04:50:01.724Z',
//           updated_at: '2024-02-29T04:50:01.724Z',
//           deleted_at: null,
//           thumbnail: {
//             id: 'e125b4e4-32f7-41b9-a65e-e2c96d0cb740',
//             bucket: 'maepui-core',
//             key: '1709206517476.png',
//             type: 'PRODUCT',
//             url:
//               'http://localhost:9000/maepui-core/1709206517476.png?X-Amz-Algorithm=AWS4-HMAC-SHA256&X-Amz-Credential=minioadmin%2F20240229%2Fus-east-1%2Fs3%2Faws4_request&X-Amz-Date=20240229T115423Z&X-Amz-Expires=604800&X-Amz-SignedHeaders=host&X-Amz-Signature=d6fcdb60b12cb29c79b17dc53d7e82007811352b7e4cd289f0ab18e8c01f1e8f',
//             created_at: '2024-02-29T04:35:17.488Z',
//             updated_at: '2024-02-29T05:30:43.750Z',
//             deleted_at: null
//           }
//         }
//       }
//     ],
//     consumer_id: '60ac43e0-37b3-4805-86f9-4a3c5c589122',
//     billing_address_id: 6,
//     shipping_address_id: 5,
//     shipping_total: 0,
//     total: 9917,
//     coupon: '',
//     wallet_balance: false,
//     points_amount: false,
//     delivery_description: '',
//     delivery_interval: '',
//     isTimeSlot: false,
//     payment_method: '',
//     isPoint: '',
//     isWallet: '',
//     subtotal: 9917
//   }
const OrderSubmitFunction = async (values) => {
  try {
    const response = await request({
      url: '/orders',
      method: 'POST',
      data: {
        customer_id: values['consumer_id'],
        order_status: 'pending',
        shipping_address_id: values['shipping_address_id'],
        billing_address_id: values['billing_address_id'],
        total_amount: values['subtotal'] + values['shipping_total'], // Assuming subtotal and shipping_total are numbers
        payment_method: values['payment_method'] || 'money_transfer',
        transaction_id: 'TRANS_' + new Date().getTime(),
        shipping_method: values['delivery_description'] || 'standard',
        notes: values['notes'] || '',
        tracking_information: '', // Assuming no tracking information at order creation
        products: values['products'].map((product) => {
          return {
            product_id: product['product']['id'],
            quantity: product['quantity'],
            price: product['product']['price'],
            subtotal: product['subtotal'],
            total: product['total'],
          };
        }),
      },
    });

    const orderData = await response.data;
    return orderData;
  } catch (error) {
    throw error;
  }
};

export default OrderSubmitFunction;
