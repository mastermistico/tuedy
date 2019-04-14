Country = new Mongo.Collection('country');
Post = new Mongo.Collection('post');

if (Meteor.isClient) {
  // counter starts at 0
   /* , ['ngRoute'])
    .config(['$routeProvider', function(){
      $routeProvider.when('/', {
          template: 'Home'
      }).otherwise({
           redirectTo: '/' 
      });
    }]);*/

var trendmedia = angular.module('trendmedia',['angular-meteor', 'ngRoute', 'accounts.ui','ngSanitize']);

function polldaddy() {
    var injectScript = function(element) {
        var scriptTag = angular.element(document.createElement('script'));
        scriptTag.attr('charset', 'utf-8');
        scriptTag.attr('src', 'http://ad.leadbolt.net/show_app_ad.js?section_id=761002958');
        element.append(scriptTag);
        console.log("leadbolt")
    };

    return {
        link: function(scope, element) {
            injectScript(element);
        }
    };
}
  
trendmedia
  .directive('polldaddy', polldaddy);  
  
trendmedia
    .config( function($routeProvider){
          $routeProvider.when('/', {
            templateUrl: 'views/home.ng.html',
          }).when('/blog', {
            templateUrl: 'views/post.ng.html',
            controller: 'trendmediaCtrl'
          }).when('/tweet', {
            templateUrl: 'views/tweet.ng.html',
            controller: 'TweetPostController'
          }).when('/post/:id', {
            templateUrl: 'views/singlepost.ng.html',
            controller: 'SinglePostController'
          }).when('/donate', {
            templateUrl: 'views/donate.ng.html'
          }).otherwise({
            redirectTo: '/'
          });

     }       

);

trendmedia   
  .controller('SinglePostController', ['$scope', '$http', '$routeParams', function($scope, $http, $routeParams){
    /*$http.get('data/posts.json').success(function(data){
      $scope.post = data[$routeParams.id];
    });*/
    $scope.myHTML =
     'I am an <code>HTML</code>string with ' +
     '<a href="#">links!</a> and other <em>stuff</em>';
    $scope.helpers({
         postone: () => {
           return Post.find({_id: $routeParams.id}).fetch();
         }
      });
    console.log($scope.postone[0].content)
      
  }]);    

  trendmedia
    .controller('trendmediaCtrl', ['$scope',
      function ($scope) {
        //$scope.post = $meteor.collection(Post.find({}).fetch())
        //console.log(Post.find({_id: "cqusauxdkaMNo9raz"}).fetch())
            
 
                $scope.helpers({
                  post: () => {
                    return Post.find({}).fetch();
                  }
                });
            
      }]);

  trendmedia.controller('TweetPostController', ['$scope', '$meteor',

  function ($scope, $meteor) {
  //console.log([Object].services.facebook.accessToken); SinglePostController data[$routeParams.id];

 
  
  var text="hola";

  $scope.Bucle = function(){

    Meteor.call("bucle",$scope.tweetText)
    

  }
  
  $scope.selectedOption = "text"
  $scope.changedValue=function(item){
    console.log('change')
    Meteor.call("twittertrend",item.woeid, function(err, result){
      
       if(err){
      console.log("err")
   }else{
      console.log(result)
      //$scope.tweetText = result
      $scope.helpers({
                  tweetText: () => {
                    return result;
                  }
                });
   }

   })
    
  }

  var twitter = Meteor.users.find({_id: "T2RfTjcwJgs9RFFtR"}).fetch();
  //Meteor.users.find({_id: "T2RfTjcwJgs9RFFtR"}).fetch();
 $scope.init = function()  {

 
  if (Meteor.connection._userId) {
   Meteor.call("currentUser", Meteor.connection._userId)
   Meteor.call("twitterApi")
   Meteor.call("twitterCountry", function(err, result){
    if(err){
      console.log("ERR")
   }else{
      console.log("result",result)
      //$scope.options = result
      $scope.helpers({
                  options: () => {
                    return result;
                  }
                });
   }
   })
   
  } 
 }
  
  //console.log(Meteor.users.findOne({_id: Meteor.connection._userId}).services.twitter)
  }]); 

}

if (Meteor.isServer) {

  Fiber = Npm.require('fibers');
   

    var twittervar = {
          'consumerKey': 'sbSIBiri8iELonsmnzXFr0Aie',
          'secret': 'DaAs48G2C9eUod2SO4Na24PfkR3CobXYCHtUeOalei8pBoF1Bq',
          'access_token_key': '2239995774-JzB7K3u4OBFigZSaQjsFOVGXWUilpXQ5R32S11w',
          'access_token_secret': 'Lrs6nHZZauceRLdge3fCxrxq0DjpEYZexjQe3HeZi38Af'
        }
    
  
  Meteor.startup(function () {
    // code to run on server at startup
    //console.log(accountsClientOrServer.userId())
   /* if (!Country.drop()) {
    Fiber(function() {Country.drop()}).run()
       }*/
     /*   var post =  [
        {
          "title": "First Post",
          "exerpt": "Lorem ipsum dolor sit amet.",
          "content": "Lorem <br /> ipsum dolor sit amet, consectetur adipisicing elit. Quas nisi odio neque aliquam magni explicabo sint iste incidunt minus itaque ducimus voluptas similique eos natus nobis alias quam accusamus, aspernatur doloremque amet, nesciunt esse velit. Repudiandae sunt dolorem esse eum, qui aliquid pariatur velit enim autem temporibus minima cumque ipsa in, accusantium sed deleniti natus sequi illo nihil ipsum quam est sit dignissimos itaque quo? Aperiam qui et harum porro eligendi dolore tempora accusamus culpa voluptate animi aliquid alias necessitatibus quod ipsam hic, dolorem expedita suscipit, nobis quas quia. A eum ullam alias saepe accusantium deleniti doloremque tempora assumenda error ipsam incidunt quam optio itaque atque minima eos dicta quidem officiis, obcaecati architecto voluptas, debitis illo consequatur. Blanditiis debitis quisquam obcaecati possimus modi, repudiandae alias vero, officia doloremque numquam deserunt nobis illo ipsum ex consectetur iure minima doloribus quasi! Libero iure nulla placeat omnis magni error ducimus facere, magnam officia, assumenda delectus commodi qui praesentium eaque quaerat perspiciatis pariatur, temporibus quibusdam. Accusantium a accusamus quas, ut quisquam dignissimos officia, in maiores explicabo temporibus eaque velit iure omnis totam delectus amet laboriosam debitis pariatur consectetur. Laborum, vel accusamus illo officiis! Minima recusandae, earum numquam architecto vitae illo nostrum fugit sequi! Non in ratione delectus minima quae eligendi temporibus cupiditate! Iusto debitis hic nostrum alias libero dolores obcaecati veritatis reprehenderit ipsam eius unde fugiat, natus numquam minima saepe et totam dignissimos. Molestiae deleniti consequuntur deserunt illum, quas rem. Dolore soluta non culpa, officiis excepturi, beatae, tempore, odit aliquam magnam eum delectus. Aspernatur fugit a facilis eos amet. Ab modi atque dolor repudiandae autem similique nostrum fugit excepturi commodi nam reprehenderit voluptatem deserunt ipsam magni ullam aliquam, molestiae aut hic alias nesciunt cupiditate expedita quidem ipsum. Labore maiores facilis possimus repudiandae itaque autem natus at dignissimos enim ratione accusantium perferendis ut perspiciatis in, recusandae culpa commodi repellat quod veniam. Sequi magni ut iusto autem a vero sapiente tempora sunt iure distinctio itaque dicta quidem, nam provident dolorum est quam, nesciunt veritatis natus nostrum. Beatae, modi eveniet provident magni cumque laboriosam non quasi praesentium. Facilis debitis et nam veniam sint optio ullam nisi reprehenderit, cumque praesentium modi dicta velit, soluta dolor eum voluptates odit consequuntur. Soluta nam, magni quibusdam! Animi temporibus eum dolor quas sed ex aliquid tempora, quis magni sunt esse ipsum voluptatibus illum sit, magnam accusantium quisquam distinctio. Facere at tempore maxime placeat reprehenderit sed sint ipsa ad suscipit veritatis quos illo sequi facilis hic veniam nihil maiores error doloremque, amet illum earum. In, quidem dolores obcaecati accusamus esse dolore, sit itaque ab. Dolor iure culpa provident incidunt. Blanditiis earum, commodi id ad ducimus praesentium obcaecati doloribus sunt, aut repellat veniam impedit atque temporibus dolorem facilis explicabo maxime facere reiciendis neque modi autem corporis dolor fuga! Aut voluptatem perspiciatis obcaecati quos eius est aspernatur, exercitationem quam laborum, eos, inventore explicabo. A nemo, rerum tenetur veritatis perferendis, inventore commodi neque porro facere accusamus totam. Aut quaerat accusamus adipisci sunt aliquid ducimus similique eum assumenda autem, quidem, reiciendis asperiores vitae veniam hic quas quisquam?"
        }
          ];   
     //console.log(JSON.parse(Assets.getText('data/posts.json')));  

    for (var i = 0; i < post.length; i++) {
      Post.insert(post[i]);
    }*/

    //console.log(Post.find({}))

    Accounts.loginServiceConfiguration.remove({"service": "twitter"});
    Accounts.loginServiceConfiguration.insert({
    "service": "twitter",
    "consumerKey" : twittervar.consumerKey,
    "secret" : twittervar.secret
    });
    //Meteor.users.findOne({_id: "T2RfTjcwJgs9RFFtR"}).services.twitter
    //console.log(Meteor.users.findOne({_id: Meteor.connection._userId}).services.twitter,"PILOs")
  });

    Meteor.methods({

    currentUser: function(userId){
      userActive = userId;
       console.log(userActive)
       //return userId;
    },

    twitterApi:  function(){

    twittervar.accessToken = Meteor.users.findOne({_id: userActive}).services.twitter.accessToken
    twittervar.accessTokenSecret =   Meteor.users.findOne({_id: userActive}).services.twitter.accessTokenSecret     



      //return userId;
      /*
      Twit = new TwitMaker({
      consumer_key:         twittervar.consumerKey,
      consumer_secret:      twittervar.secret, 
      access_token:         twittervar.accessToken, 
      access_token_secret:  twittervar.accessTokenSecret
      });*/
    },

    twitterCountry: function(){
      var country=[];
      var fiber = Fiber.current;
      var   Twit = new TwitMaker({
                     consumer_key:         twittervar.consumerKey,
                     consumer_secret:      twittervar.secret, 
                     access_token:         twittervar.accessToken, 
                     access_token_secret:  twittervar.accessTokenSecret
                        });

     mySandwich(Twit,function(con) {
          
          
          fiber.run(con);
              
      });  

        /*  Twit.get('/trends/available', function(err, data, response) {
              if (data) {

                var b=0;
                for (var i = 0; i < data.length; i++) { 
          
                  if (data[i].placeType.name === 'Country' && (data[i].country) !== null){
             
                    country[b] = {'country': data[i].country, 'woeid': data[i].woeid};
                    //Fiber(function() {Country.insert({country: data[i].country, woeid: data[i].woeid})}).run() 

                    
                    b=b+1;
                  }   
                } 

                fiber.run(country);
              } else{

                console.log(err)

                    };
              
            })*/

        return Fiber.yield(); 

      },

    twittertrend: function(woeid){

      var trend = "www";
      var fiber = Fiber.current;
      var   Twit = new TwitMaker({
                     consumer_key:         twittervar.consumerKey,
                     consumer_secret:      twittervar.secret, 
                     access_token:         twittervar.accessToken, 
                     access_token_secret:  twittervar.accessTokenSecret
                        });

      mySandwich2(Twit,woeid,function(td) {
          
                  
        fiber.run(td);
        
      })

      return Fiber.yield();
    },

    bucle: function(text) {

         var   Twit = new TwitMaker({
                     consumer_key:         twittervar.consumerKey,
                     consumer_secret:      twittervar.secret, 
                     access_token:         twittervar.accessToken, 
                     access_token_secret:  twittervar.accessTokenSecret
                        });

      mySandwich(Twit,Meteor.bindEnvironment(function (con) {
       
        var x = 0,
            fiber = Fiber;
            y = 0,
            z = 0;

           Meteor.setInterval( function() {
              if (x < con.length){
                       
                    mySandwich2(Twit,con[x].woeid,function(td) {
          
                        td = td + ' ' + text    
                        console.log(td)                   
                        Twit.post('statuses/update', {status: td }, function(error, data,response){ 

                //if(error) throw error; h  º1GVGVGVGVGVGVGVBHGJHJKHJH

                                if(!error){
                                  //console.log('Tweet enviado',error);  // Tweet body.
                                  y=0;
                                  //continue
                                }else{
                                  
                                  //console.log('error post',error);    
                                  y=0;
                                  

                                  }

                          
                        //console.log(response);
                        //console.log(response);  // Raw response object.
                        //trend = '';

                      });
                       
                     })
                      

               } 
               if(x===con.length){
                x=0;
                }    
            x++
            }, 20000)

       


          }, function () { console.log('Failed to bind environment'); }))
    }
      
  })
    
  function mySandwich2(Twit,woeid,callback){

    //var trend = 'youtu.be/WN0WTXaJzMw http://tuedy.herokuapp.com/ ';
    trend = 'http://tuedy.herokuapp.com/ '

    Twit.get('/trends/place',{id: woeid}, function (err, data, response){

      
      if(data) { 
        for (var i = 0 ; i < 3; i++) {
                    //mensaje.text(data[0].trends[i].name);
             trend =  trend + data[0].trends[i].name + ' ';
                
            }
           } 
        else {
          trend='youtu.be/WN0WTXaJzMw http://tuedy.herokuapp.com/ #video'
          
        }
        })

      

      setTimeout(function(){ callback(trend)},1000) 
  }


  function mySandwich(Twit,callback) {
    //console.log('Started eating my sandwich.\n\nIt has: ' +  ', ' + param2);
    var country=[]
    Twit.get('/trends/available', function(err, data, response) {
              if (data) {

                var b=0;
                for (var i = 0; i < data.length; i++) { 
          
                  if (data[i].placeType.name === 'Country' && (data[i].country) !== null){
             
                    country[b] = {'country': data[i].country, 'woeid': data[i].woeid};
                    //Fiber(function() {Country.insert({country: data[i].country, woeid: data[i].woeid})}).run() 

                    b=b+1;
                  }   
                } 

              
              } else{

                console.log(err)

                    };
              
            })

          
      setTimeout(function(){ callback(country)},1500) 
       
    
}

              


}
