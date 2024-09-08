import { descriptionSchema, discountSchema, dropDownScheme, ifTypeSimpleSchema, nameSchema, variationSchema } from "../../Utils/Validation/ValidationSchemas";

export const ProductValidationSchema = {
  name: nameSchema,
  short_description: nameSchema,
  description: descriptionSchema,
  stock_status: nameSchema,
  sku: ifTypeSimpleSchema,
  stock_quantity: ifTypeSimpleSchema,
  price: ifTypeSimpleSchema, // if (type == simple)
  discount: discountSchema, // if (type == simple)
  categories: dropDownScheme,
  // tax_id: nameSchema,
  // variations: variationSchema
};

export function ProductInitValues(oldData, updateId) {
  const attr_combination = () => {
    let attributes = oldData?.attributes?.map((value) => value?.id);
    let variants = attributes?.map((attr, i) => {
      let matchingVariations = oldData?.variations.filter((variation) => {
        return variation.attribute_values.some((attrVal) => attrVal?.attribute_id == attr);
      });

      let attributeValues = matchingVariations?.reduce((acc, variation) => {
        let values = variation.attribute_values.filter((attrVal) => attrVal?.attribute_id == attr).map((attrVal) => attrVal?.id);
        return values ? [...new Set([...acc, ...values])] : acc;
      }, []);
      return oldData?.attributes[i] && attributeValues.length > 0 ? { name: oldData?.attributes[i], values: attributeValues } : false;
    });
    return variants?.filter((elem) => elem !== false);
  };
  return {
    // General
    name: updateId ? oldData?.name || undefined : undefined,
    short_description: updateId ? oldData?.short_description || undefined : undefined,
    description: updateId ? oldData?.description || undefined : undefined,
    store_id: updateId ? Number(oldData?.store_id) || undefined : undefined,
    // Inverntory  =>Type: Simple
    type: "simple",
    unit: updateId ? oldData?.unit || undefined : undefined,
    weight: updateId ? oldData?.weight || null : null,
    stock_status: updateId ? oldData?.quantity > 0 || "in_stock" : undefined,
    show_stock_quantity: true,
    sku: updateId ? oldData?.sku || undefined : undefined,
    stock_quantity: updateId ? oldData?.stock_quantity || undefined : undefined,
    price: updateId ? oldData?.price || undefined : undefined,
    sale_price: updateId ? oldData?.sale_price || undefined : "0.00",
    discount: updateId ? oldData?.discount || undefined : undefined,
    is_sale_enable: updateId ? oldData?.is_sale_enable || false : false,
    sale_starts_at: updateId ? oldData?.sale_starts_at || new Date() : new Date(),
    sale_expired_at: updateId ? oldData?.sale_expired_at || new Date() : new Date(),
    // Inventory  =>Type: Classified
    variations: updateId ? oldData?.variations : [],
    combination: updateId ? attr_combination() : [{}],
    attributesName: updateId ? oldData?.attributes : [],
    attributes_ids: updateId ? oldData?.attributes?.map((elem) => elem.id) : [],
    variation_image_id: "",
    // Setup
    tags: updateId ? oldData?.tags?.map((item) => item.id) || [] : [],
    categories: updateId ? oldData?.categories.map((item) => item.id) || [] : [],
    is_random_related_products: updateId ? Boolean(Number(oldData?.is_random_related_products)) : true,
    related_products: updateId ? oldData?.related_products?.map((elem) => elem) || [] : [],
    cross_sell_products: updateId ? oldData?.cross_sell_products?.map((elem) => elem) || [] : [],
    // Images
    thumbnail: updateId ? oldData?.thumbnail || undefined : undefined,
    thumbnail_id: updateId ? oldData?.thumbnail?.id || undefined : undefined,
    size_chart_image: updateId ? oldData?.size_chart_image || undefined : undefined,
    size_chart_image_id: updateId ? oldData?.size_chart_image?.id || undefined : undefined,
    galleries: updateId ? oldData?.galleries || undefined : undefined,
    galleries_id: updateId ? oldData?.galleries?.map((elem) => elem.id) || undefined : undefined,
    // SEO
    meta_title: updateId ? oldData?.meta_title || undefined : undefined,
    meta_description: updateId ? oldData?.meta_description || undefined : undefined,
    product_meta_image_id: updateId ? oldData?.product_meta_image_id?.id || undefined : undefined,
    product_meta_image: updateId ? oldData?.product_meta_image || undefined : undefined,
    // Shipping Tax
    is_free_shipping: updateId ? Boolean(Number(oldData?.is_free_shipping)) : false,
    shipping_price: updateId ? oldData?.shipping_price : 0,
    tax_id: updateId ? oldData?.tax_id : undefined,
    estimated_delivery_text: updateId ? oldData?.estimated_delivery_text : undefined,
    return_policy_text: updateId ? oldData?.return_policy_text : undefined,

    // Status
    is_featured: updateId ? Boolean(oldData?.is_featured) : false,
    safe_checkout: updateId ? Boolean(oldData?.safe_checkout) : true,
    secure_checkout: updateId ? Boolean(oldData?.secure_checkout) : true,
    social_share: updateId ? Boolean(oldData?.social_share) : true,
    encourage_order: updateId ? Boolean(oldData?.encourage_order) : true,
    encourage_view: updateId ? Boolean(oldData?.encourage_view) : true,
    is_trending: updateId ? Boolean(oldData?.is_trending) : false,
    is_return: updateId ? Boolean(oldData?.is_return) : true,
    status: updateId ? Boolean(oldData?.status === 'ACTIVE') : true,
  };
}
