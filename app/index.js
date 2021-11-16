// Authentication Controller
export { default as register } from "./http/controllers/auth/register";
export { default as login } from "./http/controllers/auth/login";
export { default as profile } from "./http/controllers/auth/profileEdit";
export { default as logout } from "./http/controllers/auth/logout";
export { default as user } from "./http/controllers/auth/user";
export { default as role } from "./http/controllers/auth/role";
export { default as phonenumber } from "./http/controllers/auth/phoneNumber";
export { default as refreshToken } from "./http/controllers/auth/refreshToken";
export { default as changePassword } from "./http/controllers/auth/changePassword";
export { default as forgetPassword } from "./http/controllers/auth/forgetPassword";

// Stores Controller
export { default as store } from "./http/controllers/store/store";
export { default as editStore } from "./http/controllers/store/editStore";
export { default as cbs } from "./http/controllers/store/categoryByStores";
export { default as sbp } from "./http/controllers/store/storeByProducts";
export { default as allStores } from "./http/controllers/store/allStores";

// Sub Stores Controller
export { default as subStore } from "./http/controllers/subStore/store";
export { default as cbss } from "./http/controllers/subStore/categoryByStores";
export { default as ssbp } from "./http/controllers/subStore/storeByProducts";
export { default as approve } from "./http/controllers/subStore/approve";
export { default as decline } from "./http/controllers/subStore/decline";

// Products Controller
export { default as product } from "./http/controllers/products/product";
export { default as update_product } from "./http/controllers/products/update.product";
export { default as destroy_product } from "./http/controllers/products/destroy.product";
export { default as detail_product } from "./http/controllers/products/detail.product";

// Categories Controller
export { default as category } from "./http/controllers/categories/category";
export { default as update_category } from "./http/controllers/categories/update.category";
export { default as destroy_category } from "./http/controllers/categories/destroy.category";
export { default as filters } from "./http/controllers/categories/filters";

// Discount Controller
export { default as discount } from "./http/controllers/discount/discount";
export { default as storeByDiscounts } from "./http/controllers/discount/storeByDiscounts";
export { default as promo } from "./http/controllers/discount/promoCode";
// export { default as update_category } from "./http/controllers/categories/update.category";
// export { default as destroy_category } from './http/controllers/categories/destroy.category';
// export { default as filters } from './http/controllers/categories/filters';

// Chat Controller
export { default as conversation } from "./http/controllers/chat/conversation";
export { default as messages } from "./http/controllers/chat/messages";

// Cart
export { default as cart } from "./http/controllers/cart/cart";
export { default as order } from "./http/controllers/cart/order";

// Admin Controller
export { default as registersCounts } from "./http/controllers/admin/registersCounts";
export { default as editSubscription } from "./http/controllers/admin/editSubscription";
export { default as views } from "./http/controllers/admin/views";
export { default as contactUs } from "./http/controllers/admin/contactUs";

// Favorite Controller
export { default as favorite } from "./http/controllers/favorite/favorites";
export { default as removeFavorite } from "./http/controllers/favorite/removeFavorite";

// customers Controller
export { default as customer } from "./http/controllers/customers/customer";
export { default as reports } from "./http/controllers/customers/reports";
export { default as graph } from "./http/controllers/customers/graph";
export { default as recommended } from "./http/controllers/customers/recommended";

// Notification Controller
export { default as notification } from "./http/controllers/notification/notifications";

// Ads Controller
export { default as ads } from "./http/controllers/admin/ads";

// All Models
export { default as User } from "./models/user";
export { default as Store } from "./models/store";
export { default as SubStore } from "./models/subStore";
export { default as Product } from "./models/product";
export { default as Category } from "./models/category";
export { default as SocialUser } from "./models/socialUser";
export { default as RefreshToken } from "./models/refreshToken";
export { default as Discount } from "./models/discount";
export { default as Message } from "./models/messages";
export { default as Conversation } from "./models/conversation";
export { default as Cart } from "./models/cart";
export { default as Order } from "./models/order";
export { default as Views } from "./models/views";
export { default as Favorite } from "./models/favorite";
export { default as Notification } from "./models/notification";
export { default as Contact } from "./models/contact";
export { default as Promo } from "./models/promoCode";
export { default as Ad } from "./models/Ads";
export { default as BannerAd } from "./models/BannerAd";

// All Middlewares
export { default as errorHandler } from "./http/middlewares/errorHandler";
export { default as auth } from "./http/middlewares/auth";
export { default as partner } from "./http/middlewares/partner";
export { default as admin } from "./http/middlewares/admin";
export { default as uploads } from "./http/middlewares/Storages";
export { default as exceptPartner } from "./http/middlewares/exceptPartner";

// All servies
export { default as CustomErrorHandler } from "./services/CustomErrorHandler";
export { default as JwtService } from "./services/JwtService";
export { default as FindStores } from "./services/FindStores";
export { default as Notifications } from "./services/Notifications";
