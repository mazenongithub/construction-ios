class EnvironmentalVariables {
    getvariables() {
        const variables = {
            development: {
                serverAPI:'http://3.85.62.151:8081',
                clientAPI:'http://construction.civilengineer.io'
            },
            production: {
                serverAPI: 'https://api.civilengineer.io',
                clientAPI:'http://construction.civilengineer.io'
            }
        };

        if (__DEV__) {

            return variables.development; // return this if in development mode
        }

        return variables.production; // otherwise, return this
    }



}
export default EnvironmentalVariables;