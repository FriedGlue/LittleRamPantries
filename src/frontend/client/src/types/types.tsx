export type PantryJson = {
    name: string;
    facility: string;
    pantry_exterior_url: string;
    latest_contents_url: string;
    campus: string;
    floor: string;
    hours: string;
    directions: string;
    date_last_opened: string;
    time_last_opened: string;
    public_key: string;
};
  
export type RouteError = Error & {
    statusText?: string;
    status?: string;
};

export type SchoolConfig = {

    long_name: string,
    short_name: string,
    path: string,
    
    contact: {
        address: string,
        email: string,
        phone: string
    },

    banners: {
        landing_banner: string,
        dashboard_banner: string
    },

    body_color: string,
    footer_color: string,

    blurb_1: string,
    blurb_2: string
};
  