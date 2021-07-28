# Vue dataLayer

This is a simple plugin to wrap Vue implementation of the Google Data Layer.

Steps:

* Add the GTM snippet on your _/public/index.html_:

```html
<!-- Google Tag Manager -->
<script>(function(w,d,s,l,i){w[l]=w[l]||[];w[l].push({'gtm.start':
  new Date().getTime(),event:'gtm.js'});var f=d.getElementsByTagName(s)[0],
  j=d.createElement(s),dl=l!='dataLayer'?'&l='+l:'';j.async=true;j.src=
  'https://www.googletagmanager.com/gtm.js?id='+i+dl;f.parentNode.insertBefore(j,f);
  })(window,document,'script','dataLayer','GTM-XXXXXX');</script>
<!-- End Google Tag Manager -->
```

* Import the plugin on your _main.js_:

```js
import analytics from './plugins/analytics'
Vue.use(analytics, { router, debug: true })
```

Obs: you can pass the router to implement a Virtual Pageview on url changes, and the debug to echo the dataLayer on the browser console.

* Send regular event with your data:

```js
Vue.$logEvent({
  category: 'event-category',
  action: 'event-action',
  label: 'event-label',
})
```

* Send ecommerce event:

```js
Vue.$addToCart({
  products: [{
    name: 'product-name',
    id: 'product-id',
    price: 10,0,
    brand: 'product-brand',
    quantity: 1,
  }]
})
```
