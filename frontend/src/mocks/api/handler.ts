import { rest } from 'msw'

let store = [{ _id: 1, text: 'Post 1' }]

export const handlers = [
  rest.get('https://drp.fakeapi.com/posts/', (req, res, ctx) => {
    // successful response
    return res(ctx.status(200), ctx.json(store), ctx.delay(30))
  }),

  rest.post('https://drp.fakeapi.com/posts/add/', async (req, res, ctx) => {
    // successful response
    let data = await req.json()
    store.push({_id: 2, text: data.text})
    return res(ctx.status(200), ctx.delay(30))
  }),

  rest.put('https://drp.fakeapi.com/posts/update/', async (req, res, ctx) => {
    // successful response
    let data = await req.json()

    store.map(post => {
      if(post._id === data._id) {
        post.text = data.text
      }
    })

    return res(ctx.status(200), ctx.delay(30))
  }),

  rest.delete('https://drp.fakeapi.com/posts/delete/', async (req, res, ctx) => {
    // successful response
    console.log('test')

    let data = await req.json()

    store = store.filter(post => post._id !== data.id)

    return res(ctx.status(200), ctx.delay(30))
  })
]