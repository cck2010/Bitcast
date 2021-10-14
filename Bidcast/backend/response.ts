interface Achievement {
    as1: boolean;
    as2: boolean;
    as3: boolean;
    ah1: boolean;
    ah2: boolean;
    ah3: boolean;
}

interface Data {
    msg: string;
    user?: {
        id?: number;
        alias?: string;
        email?: string;
        role?: number;
        created_at?: Date;
        updated_at?: Date;
        profile_pic?: string;
        number_tag?: number;
        profilePic?: string;
    };
    queryrows?: {}[];
    queryrows2?: {}[];
    queryrows3?: {}[];
    html?: string[];
    isLoggedIn?: boolean;
    isSameUser?: boolean;
    achievement?: Achievement;
}

export interface ResponseJson {
    success: boolean;
    data: Data;
    error?: Error;
}
