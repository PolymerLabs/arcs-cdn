(function(scope) {

    let version = typeof Arcs === 'undefined' || !Arcs.version ? '/' : Arcs.version.replace(/\./g, '_');

    let firebaseConfig = {
      apiKey: "AIzaSyBme42moeI-2k8WgXh-6YK_wYyjEXo4Oz8",
      authDomain: "arcs-storage.firebaseapp.com",
      databaseURL: "https://arcs-storage.firebaseio.com",
      projectId: "arcs-storage",
      storageBucket: "arcs-storage.appspot.com",
      messagingSenderId: "779656349412"
    };

    let db = firebase.initializeApp(firebaseConfig, 'arcs-storage').database().ref(version);

    scope.db = db;

})(this);