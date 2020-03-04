var helloWorld =
  "query helloWorld {\n  world {\n    ...Worldly\n    __typename\n  }\n}\n\nfragment Worldly on HelloWorldType {\n  id\n  thing {\n    id\n    __typename\n  }\n}\n";
