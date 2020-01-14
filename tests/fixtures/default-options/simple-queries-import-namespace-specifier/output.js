var queries = {
  default:
    "query hello {\n  world {\n    ...Worldly\n  }\n}\n\nfragment Worldly on world {\n  id\n}\n",
  hello:
    "query hello {\n  world {\n    ...Worldly\n  }\n}\n\nfragment Worldly on world {\n  id\n}\n",
  hey: "query hey {\n  world {\n    id\n  }\n}\n",
  Worldly: "fragment Worldly on world {\n  id\n}\n"
};
