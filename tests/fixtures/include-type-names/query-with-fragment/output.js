var helloWorld =
  "query helloWorld {\n  world {\n    ...MostWorldly\n    __typename\n  }\n}\n\nfragment MostWorldly on HelloWorldType {\n  id\n  thing {\n    id\n    __typename\n  }\n}\n";
