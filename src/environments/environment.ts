// The file contents for the current environment will overwrite these during build.
// The build system defaults to the dev environment which uses `environment.ts`, but if you do
// `ng build --env=prod` then `environment.prod.ts` will be used instead.
// The list of which env maps to which file can be found in `.angular-cli.json`.

export const environment = {
  production: false,
  apiUrl: 'http://ec2-34-203-3-32.compute-1.amazonaws.com:7777',
  backWP: 'http://ec2-34-203-3-32.compute-1.amazonaws.com',
  wordpressURL: 'https://ec2-18-232-214-244.compute-1.amazonaws.com:8090/wp-json/wp/v2',
  LINKED_IN_SECRET: 'bxqoVJqUTdlrvQWm',
  LINKED_IN_API_KEY: '81hl7xcnwtxkpi',
  redirect_uri: 'http://localhost:4200/home/auth/linkedin'
};
