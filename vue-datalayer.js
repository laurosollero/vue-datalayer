const analytics = {
  install(Vue, options) {
    const { router = false, debug = false } = options

    Vue.$dataLayer = window.dataLayer || []

    Vue.$trackView = (pageView) => {
      if (debug) console.log('Track View:', pageView)
    }

    Vue.$logEvent = ({
      event = 'event',
      category = '',
      action = '',
      label = '',
    } = {}) => {
      if (debug) console.log({ event, category, action, label })
      Vue.$dataLayer.push({
        event,
        eventCategory: category,
        eventAction: action,
        eventLabel: label,
      })
    }

    Vue.$addToCart = ({
      event = 'addToCart',
      category = 'enhanced-ecommerce',
      action = 'add-to-cart',
      products = [
        {
          name: '',
          id: '',
          price: '',
          brand: '',
          quantity: '',
        },
      ],
    } = {}) => {
      // TODO: send multiple events to cart

      if (debug) console.log({ event, category, action, products })

      const { name, id, price, brand, quantity, dimension4 } = products[0]

      Vue.$dataLayer.push({
        event: event,
        eventCategory: category,
        eventAction: action,
        ecommerce: {
          add: {
            products: [
              {
                name: sanitize(name),
                id: sanitize(id),
                price: formatPrice(price),
                quantity: quantity,
                dimension4: sanitize(dimension4),
              },
            ],
          },
        },
      })
    }

    Vue.$productsImpression = ({
      event = 'productsImpression',
      category = 'enhanced-ecommerce',
      action = 'products-impression',
      products = [
        {
          name: '',
          id: '',
          price: '',
          brand: '',
          dimension4: '',
        },
      ],
    } = {}) => {
      if (debug) console.log({ event, category, action, products })

      products = products.slice(0, 199)

      const productsList = products.map((el) => {
        return {
          name: sanitize(el.name),
          id: sanitize(el.id),
          price: formatPrice(el.price),
          position: el.position,
        }
      })

      Vue.$dataLayer.push({
        event: event,
        eventCategory: category,
        eventAction: action,
        noInteraction: 1,
        ecommerce: {
          impressions: productsList,
        },
      })
    }

    const formatPrice = (price = '') => {
      return parseFloat(price.replace(',', '.'))
    }

    const sanitize = (text = '') => {
      text = '' + text
      text = text
        .trim()
        .toLowerCase()
        .replace(/^\s+/, '')
        .replace(/,\s+/g, ',')
        .replace(/:\s+/g, ':')
        .replace(/\.\s+/g, '.')
        .replace(/\s+/g, ' ')
        .replace(/\s+/g, '_')
        .replace(
          /[áàâãåäæª\u00e1\u00e0\u00e2\u00e3\u00e5\u00e4\u00e6\u00aa]/g,
          'a'
        )
        .replace(/[éèêëЄ€\u00e9\u00e8\u00ea\u00eb\u0404\u20ac]/g, 'e')
        .replace(/[íìîï\u00ed\u00ec\u00ee\u00ef]/g, 'i')
        .replace(/[\u00f3\u00f2\u00f4\u00f5\u00f6\u00f8]/g, 'o')
        .replace(/[º\u00ba]/g, 'o.')
        .replace(/[úùûü\u00fa\u00f9\u00fb\u00fc]/g, 'u')
        .replace(/[ç¢©\u00e7\u00a2\u00a9]/g, 'c')
        .replace(/_+/g, '_')
      return text
    }

    if (router) {
      router.beforeEach((to, from, next) => {
        Vue.$trackView(window.location.origin + to.fullPath)
        next()
      })
    }
  },
}

export default analytics
