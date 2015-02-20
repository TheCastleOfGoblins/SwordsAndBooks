/*
 * Geddy JavaScript Web development framework
 * Copyright 2112 Matthew Eernisse (mde@fleegix.org)
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *         http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 *
*/


var router = new geddy.RegExpRouter();

router.get('/').to('Main.index');
router.get('/login').to('Main.login');
router.get('/logout').to('Main.logout');

router.get('/battleEnd/:end').to('Main.battleEnd');
// Basic routes
// router.match('/moving/pictures/:id', 'GET').to('Moving.pictures');
//
// router.match('/farewells/:farewelltype/kings/:kingid', 'GET').to('Farewells.kings');
//
// Can also match specific HTTP methods only
// router.get('/xandadu').to('Xanadu.specialHandler');
// router.del('/xandadu/:id').to('Xanadu.killItWithFire');
//
// Resource-based routes
// router.resource('hemispheres');
//
// Nested Resource-based routes
// router.resource('hemispheres').nest(function(){
//   this.resource('countries');
//   this.get('/print(.:format)').to('Hemispheres.print');
// });

router.resource('users');
router.get('/checkUserName(.:format)').to('Users.checkUserName');

router.resource('books');
router.resource('episodes');

// router.get('/heros/:userId').to('Heros.index');
router.resource('heros');
router.get('/selectHero/:heroId').to('Heros.selectHero');
router.get('/getOnlineHeros(.:format)').to('Heros.getOnlineHeros');

router.get('/navigation').to('Heros.navigation');
router.get('/startBattle/:opponentId').to('Main.startBattle');
router.get('/chess').to('Main.chess');
router.get('/target').to('Main.target');

router.resource('conditions');


router.get('/login').to('Main.login');
router.get('/logout').to('Main.logout');
router.post('/auth/local').to('Auth.local');
router.get('/auth/twitter').to('Auth.twitter');
router.get('/auth/twitter/callback').to('Auth.twitterCallback');
router.get('/auth/facebook').to('Auth.facebook');
router.get('/auth/facebook/callback').to('Auth.facebookCallback');
router.get('/auth/yammer').to('Auth.yammer');
router.get('/auth/yammer/callback').to('Auth.yammerCallback');
router.get('/auth/google').to('Auth.google');
router.get('/auth/google/callback').to('Auth.googleCallback');

router.resource('users');
router.resource('battles');
router.post('/challenge').to('Battles.challenge')
router.post('/declineChallenge').to('Battles.declineChallenge')


exports.router = router;
