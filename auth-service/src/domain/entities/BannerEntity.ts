export namespace IAddBanner {
    export interface Params {
        title: string;
        status: boolean;
        type: 'promotional' | 'informational' | 'sale';
        imageUrl: string;
        priority: 'high' | 'medium' | 'low';
        description?: string;
        imageFile?: Express.Multer.File;
    }

    export interface Result {
        _id: string;
        title: string;
        status: boolean;
        type: 'promotional' | 'informational' | 'sale';
        priority: 'high' | 'medium' | 'low';
        imageUrl: string;
        description?: string;
        createdAt?: Date;
        updatedAt?: Date;
    }
}
