const Hapi = require('hapi')
const moment = require('moment')

const server = Hapi.server({
  port: process.env.PORT || 3000
})

server.route([
  {
    method: 'GET',
    path: '/',
    handler: async (request, h) => {
    
      const random = moment().format('SSS')
      if (random < 500) {
        return h.file('./public/success.html')
      } else {
        return h.redirect('/error')
      }
    }
  },
  {
    method: 'GET',
    path: '/error',
    handler: async (request, h) => {
      return h.file('./public/error.html')
    }
  }
])

const init = async () => {
  await server.register(require('inert'))
  await server.start()
  console.log(`Server running at: ${server.info.uri}`)
  console.log('process.env', process.env.NODE_ENV)
}

process.on('unhandledRejection', (err) => {
  console.log(err)
  process.exit(1)
})

init()
