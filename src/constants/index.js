import { Platform, Dimensions, StatusBar, Alert } from 'react-native';
//import Toast from 'react-native-root-toast';

export const SCREEN_WIDTH = Dimensions.get('window').width;
export const SCREEN_HEIGHT = Dimensions.get('window').height; //44 is the header height in ParentWrapper
export const PLATFORM_IOS = (Platform.OS === 'ios') ? true : false;
export const HEADER_HEIGHT = 36;

export const IMAGE_CACHE = 'force-cache';

/* export const PLACEHOLDER_IMAGE = require('../../assets/images/place_holder.png');
export const COMPANY_LOGO = require('../../assets/images/company_logo.png');
// Second bar icons
export const CATEGORY_ICON = require('../../assets/images/category_icon.png');
export const BEST_SELLERS_ICON = require('../../assets/images/best_sellers_icon.png');
export const NEW_PRODUCTS_ICON = require('../../assets/images/new_products_icon.png');
export const POPULAR_PRODUCTS_ICON = require('../../assets/images/popular_products_icon.png');
export const ONSALE_ICON = require('../../assets/images/onsale_icon.png');
export const SPLASH_SCREEN_IMAGE = require('../../assets/images/splash_image.jpg'); */

// PAYPAL CONFIG
//export const PAYPAL_CLIENT_ID = 'AdrTezNEVLyUTTdKPvHnWEiV9WQZqIsZ4pqhD3sgxDZOfKU5XuGuEEwLtDMegbqJ0kJR3JKc4kqpH8N4'; // SANDBOX
//export const PAYPAL_CLIENT_ID = 'AQxM9HP1CcUtGipHKhaQaASiYtOjZr8cKhHL2ZJOn22IZPNpw5ILcuBKhf4jBGCWLQk_Ke0zbcJFkd6H'; // LIVE

// PRESTASHOP API'S

/* export const AXIOS_CONFIG = {
    headers: { 
        'Authorization': 'Bearer 69880FM9338J5BH3AP4A9B59E79KGCAD',
        'Content-Type': 'application/x-www-form-urlencoded'
    }
}; */

/* export const SERVER_BASE = 'https://www.nonsololibri.biz/fmmapi?' // Live with custom module

export const GET_CATEGORIES = `${SERVER_BASE}resource=GetCategoryTree&id_language=`;
export const GET_PRODUCTS_BY_CATEGORY_ID = `${SERVER_BASE}order_way=DESC&resource=GetProductsPretty&type=all&id_category=`
export const GET_PRODUCTS_BY_TYPE = `${SERVER_BASE}order_way=DESC&resource=GetProductsPretty&type=`;
export const GET_POPULAR_PRODUCTS = `${SERVER_BASE}resource=GetProductsPopular`;
export const POST_CUSTOMER_LOGIN = `${SERVER_BASE}resource=FmmCustomerLogIn`;
export const POST_ADD_TO_CART = `${SERVER_BASE}resource=AddCartData`;
export const GET_CART_ITEMS = `${SERVER_BASE}resource=GetCartData&id_cart=`;
export const POST_CUSTOMER_LOGOUT = `${SERVER_BASE}resource=FmmCustomerLogOut`;
export const POST_CUSTOMER_FORGOT_PASSWORD = `${SERVER_BASE}resource=FmmCustomerForgotPassword`;
export const POST_CUSTOMER_REGISTRATION = `${SERVER_BASE}resource=FmmCustomerRegister`;
export const POST_PROFILE_UPDATE = `${SERVER_BASE}resource=FmmCustomerProfileUpdate`;

export const POST_CUSTOMER_NEW_ADDRESS = `${SERVER_BASE}resource=AddCustomerAddress`;
export const POST_CUSTOMER_DELETE_ADDRESS = `${SERVER_BASE}resource=DelCustomerAddress`;

export const POST_DELETE_CART_ITEM = `${SERVER_BASE}resource=DelCartData`;
export const POST_UPDATE_CART_ITEM = `${SERVER_BASE}resource=FmmCartDataUpdate`;

export const GET_CARRIERS_LIST = `${SERVER_BASE}resource=GetCarriersList`;
export const GET_PAYMENTS_OPTION_LIST = `${SERVER_BASE}resource=GetPaymentsOptionList`;

export const POST_SET_DEFAULT_ADDRESS = `${SERVER_BASE}resource=SetCartDataAddressDelivery`;
export const POST_SET_INVOICE_ADDRESS = `${SERVER_BASE}resource=SetCartDataAddressInvoice`;

export const POST_ADD_CART_RULE = `${SERVER_BASE}resource=AddCartRule`;
export const POST_DELETE_CART_RULE = `${SERVER_BASE}resource=DelCartRule`;
export const GET_CART_RULE = `${SERVER_BASE}resource=GetCartRuleByCustomerId&id_customer=`;

export const GET_CMS_PAGES = `${SERVER_BASE}resource=GetCmsPagesList&id_language=`;
export const GET_CMS_PAGE_CONTENT = `${SERVER_BASE}resource=GetCmsPagesContent&id_cms=`;

export const GET_PRODUCT_SEARCH = `${SERVER_BASE}resource=FmmPsSearch`;
export const POST_ORDER_PLACE = `${SERVER_BASE}resource=FmmPsOrderPlace`;
export const GET_ORDERS = `${SERVER_BASE}resource=GetCustomerOrders&id_customer=`;
export const GET_ORDER_DETAILS = `${SERVER_BASE}resource=FmmPsOrderDetail&id_order=`;

export const GET_COUNTRIES = `${SERVER_BASE}resource=GetCountryList&id_language=`;
export const GET_CURRENCIES = `${SERVER_BASE}resource=GetCurrencyList`;
export const GET_LANGUAGES = `${SERVER_BASE}resource=GetLanguageList`;

export const GET_SETTINGS = `${SERVER_BASE}resource=GetSettings`;
export const GET_PRODUCT_DESCRIPTION = `${SERVER_BASE}resource=GetProductsDescription&id_product=`; */

// Status Bar Height Calculation

const X_WIDTH = 375;
const X_HEIGHT = 812;

const XSMAX_WIDTH = 414;
const XSMAX_HEIGHT = 896;

const { height: W_HEIGHT, width: W_WIDTH } = Dimensions.get('window');

let isIPhoneX = false;

if (Platform.OS === 'ios' && !Platform.isPad && !Platform.isTVOS) {
    isIPhoneX = W_WIDTH === X_WIDTH && W_HEIGHT === X_HEIGHT || W_WIDTH === XSMAX_WIDTH && W_HEIGHT === XSMAX_HEIGHT;
}

export function getStatusBarHeight(skipAndroid) {
    return Platform.select({
        ios: isIPhoneX ? 44 : 20,
        android: skipAndroid ? 0 : StatusBar.currentHeight + 8,
        default: 0
    })
}

export function showAlertMessage(title, message) {
    Alert.alert(
        title,
        message,
        [
            { text: 'OK' },
        ],
        { cancelable: false },
    );
}

/* export function showToast(message) {
    // Add a Toast on screen.
    let toast = Toast.show(message, {
        duration: Toast.durations.LONG,
        position: Toast.positions.BOTTOM,
        shadow: true,
        animation: true,
        hideOnPress: true,
        delay: 0,
        onShow: () => {
            // calls on toast\`s appear animation start
        },
        onShown: () => {
            // calls on toast\`s appear animation end.
        },
        onHide: () => {
            // calls on toast\`s hide animation start.
        },
        onHidden: () => {
            // calls on toast\`s hide animation end.
        }
    });

} */


