import config from './../config/config';

let urlBuilder = {
    flickrAPIBuilder: (params) => {
        let url = config.flickrAPIBase;

        params.tags? (url += config.flickrApiSearch): (url += config.flickrApiRecent);

        Object.assign(params, {
            api_key: config.flickrAPIKey,
            format: 'json',
            nojsoncallback: 1,
            extras: 'url_o,o_dims,url_s',
            per_page: 30,
            sort: 'relevance'
        });

        let parameters = Object.entries(params).map((entry)=> {
            return `&${entry[0]}=${entry[1]}`
        }).join('');

        return url + parameters;
    },
    usplashAPIBuilder: (params) =>{
        let url = config.unsplashAPIBase + config.unsplashAPISearch;

        Object.assign(params, {
            client_id: config.unsplashAPIKey,
            per_page: 30
        });

        let parameters = Object.entries(params).map((entry)=> {
            return `&${entry[0]}=${entry[1]}`
        }).join('');

        return url + parameters;
    }

};

export default urlBuilder;