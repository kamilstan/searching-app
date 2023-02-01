export interface PhotoRecord {
    id:                string;
    title:             string;
    description:       null;
    published_at:      Date;
    last_collected_at: Date;
    updated_at:        Date;
    curated:           boolean;
    featured:          boolean;
    total_photos:      number;
    private:           boolean;
    share_key:         string;
    tags:              Tag[];
    links:             PhotoRecordLinks;
    user:              User;
    cover_photo:       PhotoRecordCoverPhoto;
    preview_photos:    PreviewPhoto[];
}

export interface PhotoRecordCoverPhoto {
    id:                       string;
    created_at:               Date;
    updated_at:               Date;
    promoted_at:              null;
    width:                    number;
    height:                   number;
    color:                    string;
    blur_hash:                string;
    description:              null;
    alt_description:          null;
    urls:                     Urls;
    links:                    CoverPhotoLinks;
    likes:                    number;
    liked_by_user:            boolean;
    current_user_collections: any[];
    sponsorship:              null;
    topic_submissions:        TopicSubmissions;
    user:                     User;
}

export interface CoverPhotoLinks {
    self:              string;
    html:              string;
    download:          string;
    download_location: string;
}

export interface TopicSubmissions {
}

export interface Urls {
    raw:      string;
    full:     string;
    regular:  string;
    small:    string;
    thumb:    string;
    small_s3: string;
}

export interface User {
    id:                 string;
    updated_at:         Date;
    username:           string;
    name:               string;
    first_name:         string;
    last_name:          null | string;
    twitter_username:   null | string;
    portfolio_url:      null | string;
    bio:                null | string;
    location:           null | string;
    links:              UserLinks;
    profile_image:      ProfileImage;
    instagram_username: null | string;
    total_collections:  number;
    total_likes:        number;
    total_photos:       number;
    accepted_tos:       boolean;
    for_hire:           boolean;
    social:             Social;
}

export interface UserLinks {
    self:      string;
    html:      string;
    photos:    string;
    likes:     string;
    portfolio: string;
    following: string;
    followers: string;
}

export interface ProfileImage {
    small:  string;
    medium: string;
    large:  string;
}

export interface Social {
    instagram_username: null | string;
    portfolio_url:      null | string;
    twitter_username:   null | string;
    paypal_email:       null;
}

export interface PhotoRecordLinks {
    self:    string;
    html:    string;
    photos:  string;
    related: string;
}

export interface PreviewPhoto {
    id:         string;
    created_at: Date;
    updated_at: Date;
    blur_hash:  string;
    urls:       Urls;
}

export interface Tag {
    type:    string;
    title:   string;
    source?: Source;
}

export interface Source {
    ancestry:         Ancestry;
    title:            string;
    subtitle:         string;
    description:      string;
    meta_title:       string;
    meta_description: string;
    cover_photo:      SourceCoverPhoto;
}

export interface Ancestry {
    type:        Category;
    category:    Category;
    subcategory: Category;
}

export interface Category {
    slug:        string;
    pretty_slug: string;
}

export interface SourceCoverPhoto {
    id:                       string;
    created_at:               Date;
    updated_at:               Date;
    promoted_at:              Date;
    width:                    number;
    height:                   number;
    color:                    string;
    blur_hash:                string;
    description:              null | string;
    alt_description:          string;
    urls:                     Urls;
    links:                    CoverPhotoLinks;
    likes:                    number;
    liked_by_user:            boolean;
    current_user_collections: any[];
    sponsorship:              null;
    topic_submissions:        TopicSubmissions;
    premium?:                 boolean;
    user:                     User;
}