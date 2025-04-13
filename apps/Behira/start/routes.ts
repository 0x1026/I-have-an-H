/*
|--------------------------------------------------------------------------
| Routes file
|--------------------------------------------------------------------------
|
| The routes file is used for defining the HTTP routes.
|
*/

import router from '@adonisjs/core/services/router'
import { middleware } from './kernel.js'

router.get('/', async () => {
  return {
    hello: 'world',
  }
})

router
  .get('auth', async ({ auth }) => {
    await auth.user?.load('application')
    await auth.user?.load('user')
    return {
      account: auth.user,
      authenticatedViaGuard: auth.authenticatedViaGuard,
      currentAccesToken: auth.user!.currentAccessToken,
    }
  })
  .use(middleware.auth())
