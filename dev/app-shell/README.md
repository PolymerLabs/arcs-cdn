# arcs-cdn/app

Version notes (dev):

- manifest=path in the URL is now *additive* to the default set
- solo=path will use that manifest and no others
- if you use either of those options Local Config section shows the path and has a button to publish that path to the Firebase
- if you have a user, the user can select `friends` from all users, this information is stored in Firebase, but not used yet
- System Manifests can be turned off by unchecking the boxes, this *exclusion* information is stored only in *localstorage*
- Clicking the Search icon will now insert '*' for you
