const toResponseProduct = (data) => {
  return {
    id: data?.id,
    name: data.name,
    short_description: data.short_description,
    description: data.description,
    price: data.price,
    stock_quantity: data.stock_quantity,
    shipping_price: data.shipping_price,
    sku: data.sku,
    meta_title: data.meta_title,
    meta_description: data.meta_description,
    meta_keywords: data.meta_keywords,
    orders_count: data.orders_count,
    order_amount: data.order_amount,
    thumbnail: data.thumbnail,
    created_at: data.created_at,
    galleries_id: data?.productImages?.map((elem) => elem.id),
    gallerie: data?.productImages?.map((elem) => elem.imagePath),
    category_id: data?.category?.map((elem) => elem.id),
    category: data?.category,
  };
};

export const toResponseProductHelper = (data) => {
  if (!data) return;
  if (Array.isArray(data)) {
    return data?.map((elem) => toResponseProduct(elem));
  }
  return toResponseProduct(data);
};
