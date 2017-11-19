import config from './../config/config';

let per_page = 40;
let urlBuilder = {
    flickrAPIBuilder: (params) => {
        let url = config.flickrAPIBase + config.flickrApiSearch;
        let tags = params.tags? params.tags: 'mountains';

        Object.assign(params, {
            tags: tags,
            api_key: config.flickrAPIKey,
            format: 'json',
            nojsoncallback: 1,
            extras: 'url_o,o_dims,url_s',
            per_page: per_page,
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
            per_page: per_page
        });

        let parameters = Object.entries(params).map((entry)=> {
            return `&${entry[0]}=${entry[1]}`
        }).join('');

        return url + parameters;
    }

};

export default urlBuilder;