export namespace IAddBanner {
    export interface Params {
        title: string;
        status: boolean;
        type: 'promotional' | 'informational' | 'sale';
        imageUrl: string;
        description?: string;
        imageFile?: Express.Multer.File;
    }

    export interface Result {
        _id: string;
        title: string;
        status: boolean;
        type: 'promotional' | 'informational' | 'sale';
        imageUrl: string;
        description?: string;
        createdAt?: Date;
        updatedAt?: Date;
    }
}
